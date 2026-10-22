// SciChamp Interactive Games Engine
// Contains all playable games across Chemistry, Physics, and Biology

const GameEngine = {
    activeGame: null,

    // Helper: shuffle array
    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    // ==========================================
    // GAME 1: MOLECULE MAKER (Chemistry)
    // ==========================================
    startMoleculeMaker(container) {
        let currentIdx = 0;
        let inBeaker = {}; // { H: 2, O: 1 }

        function renderLevel() {
            const mol = SCI_DATA.molecules[currentIdx];
            inBeaker = {};

            container.innerHTML = `
                <div class="game-arena-wrapper">
                    <div class="game-header-bar">
                        <div class="level-indicator">Level ${currentIdx + 1} of ${SCI_DATA.molecules.length}</div>
                        <h2 class="game-title">🧪 Molecule Maker</h2>
                        <div class="game-score-badge">Target: <strong class="badge-accent">${mol.name} (${mol.formula})</strong></div>
                    </div>

                    <div class="mission-banner">
                        <span class="mission-icon">🎯</span>
                        <span><strong>Mission:</strong> Add the right atoms into the reaction flask to synthesize <strong>${mol.name}</strong>!</span>
                    </div>

                    <div class="molecule-workspace">
                        <!-- Left: Available Atoms Palette -->
                        <div class="atoms-palette">
                            <h4 class="palette-title">Atom Dispenser</h4>
                            <p class="palette-sub">Click or drag an atom to add it to the beaker:</p>
                            <div class="atom-buttons-grid">
                                ${SCI_DATA.atoms.map(a => `
                                    <button class="atom-bubble-btn" data-symbol="${a.symbol}" style="--atom-color: ${a.color}; --text-color: ${a.textColor};" title="${a.name}">
                                        <div class="atom-core">
                                            <span class="atom-sym">${a.symbol}</span>
                                            <span class="atom-num">${a.number}</span>
                                        </div>
                                        <span class="atom-label">${a.name}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Center: Chemical Reaction Beaker -->
                        <div class="beaker-zone">
                            <div class="beaker-container" id="beaker-dropzone">
                                <div class="beaker-liquid" id="beaker-liquid"></div>
                                <div class="beaker-bubbles">
                                    <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
                                </div>
                                <div class="beaker-contents" id="beaker-contents">
                                    <div class="empty-beaker-text">Flask is empty.<br>Drop or tap atoms to mix!</div>
                                </div>
                            </div>

                            <div class="beaker-actions">
                                <button class="btn btn-secondary btn-sm" id="btn-clear-flask">
                                    <span>🔄</span> Empty Flask
                                </button>
                                <button class="btn btn-primary btn-sm" id="btn-synthesize">
                                    <span>⚗️</span> React & Synthesize!
                                </button>
                            </div>
                        </div>

                        <!-- Right: Target Formula Recipe & Progress -->
                        <div class="recipe-card">
                            <h4 class="recipe-title">Formula Recipe</h4>
                            <div class="target-formula-big">${mol.formula}</div>
                            <p class="recipe-desc">${mol.description}</p>
                            
                            <div class="recipe-requirements" id="recipe-checklist">
                                ${Object.keys(mol.required).map(sym => {
                                    const atom = SCI_DATA.atoms.find(a => a.symbol === sym);
                                    return `
                                        <div class="req-row" id="req-row-${sym}">
                                            <span class="req-atom-tag" style="background:${atom.color}; color:${atom.textColor};">${sym}</span>
                                            <span class="req-atom-name">${atom.name}</span>
                                            <span class="req-counter" id="req-count-${sym}">0 / ${mol.required[sym]}</span>
                                        </div>
                                    `;
                                }).join('')}
                            </div>

                            <div class="feedback-box" id="molecule-feedback"></div>
                        </div>
                    </div>
                </div>
            `;

            // Update beaker display
            function updateFlaskDisplay() {
                const contentsEl = container.querySelector('#beaker-contents');
                const checklistEl = container.querySelector('#recipe-checklist');
                
                // Update requirements checklist
                Object.keys(mol.required).forEach(sym => {
                    const currentCount = inBeaker[sym] || 0;
                    const needed = mol.required[sym];
                    const countEl = container.querySelector(`#req-count-${sym}`);
                    const rowEl = container.querySelector(`#req-row-${sym}`);
                    if (countEl) countEl.textContent = `${currentCount} / ${needed}`;
                    if (rowEl) {
                        if (currentCount === needed) {
                            rowEl.classList.add('req-satisfied');
                            rowEl.classList.remove('req-excess');
                        } else if (currentCount > needed) {
                            rowEl.classList.add('req-excess');
                            rowEl.classList.remove('req-satisfied');
                        } else {
                            rowEl.classList.remove('req-satisfied', 'req-excess');
                        }
                    }
                });

                // Display atoms in flask
                const atomsInFlask = [];
                Object.keys(inBeaker).forEach(sym => {
                    const count = inBeaker[sym];
                    const atomDef = SCI_DATA.atoms.find(a => a.symbol === sym);
                    for (let i = 0; i < count; i++) {
                        atomsInFlask.push(atomDef);
                    }
                });

                if (atomsInFlask.length === 0) {
                    contentsEl.innerHTML = `<div class="empty-beaker-text">Flask is empty.<br>Drop or tap atoms to mix!</div>`;
                } else {
                    contentsEl.innerHTML = atomsInFlask.map(a => `
                        <div class="floating-atom" style="background:${a.color}; color:${a.textColor};">
                            ${a.symbol}
                        </div>
                    `).join('');
                }
            }

            // Add Atom handler
            function addAtom(sym) {
                inBeaker[sym] = (inBeaker[sym] || 0) + 1;
                window.sounds.pickup();
                updateFlaskDisplay();
            }

            // Bind atom click buttons
            container.querySelectorAll('.atom-bubble-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const sym = btn.getAttribute('data-symbol');
                    addAtom(sym);
                });
            });

            // Empty flask button
            container.querySelector('#btn-clear-flask').addEventListener('click', () => {
                inBeaker = {};
                window.sounds.click();
                updateFlaskDisplay();
                const feedback = container.querySelector('#molecule-feedback');
                feedback.className = 'feedback-box';
                feedback.innerHTML = '';
            });

            // Synthesize Check
            container.querySelector('#btn-synthesize').addEventListener('click', () => {
                const feedback = container.querySelector('#molecule-feedback');
                let isMatch = true;

                // Check required atoms
                for (let sym of Object.keys(mol.required)) {
                    if ((inBeaker[sym] || 0) !== mol.required[sym]) {
                        isMatch = false;
                        break;
                    }
                }
                // Check if extra atoms exist
                for (let sym of Object.keys(inBeaker)) {
                    if (!mol.required[sym] && inBeaker[sym] > 0) {
                        isMatch = false;
                        break;
                    }
                }

                if (isMatch) {
                    window.sounds.fizz();
                    setTimeout(() => window.sounds.victory(), 300);
                    window.confetti.fire({ count: 80 });
                    App.addStars(2);

                    feedback.className = 'feedback-box feedback-success';
                    feedback.innerHTML = `
                        <div class="feedback-title">✨ Success! Created ${mol.name}!</div>
                        <p class="feedback-fact">${mol.fact}</p>
                        <button class="btn btn-primary btn-sm btn-full mt-2" id="btn-next-molecule">
                            ${currentIdx < SCI_DATA.molecules.length - 1 ? 'Next Molecule 🚀' : 'Finish Chemistry Lab 🌟'}
                        </button>
                    `;

                    container.querySelector('#btn-next-molecule').addEventListener('click', () => {
                        window.sounds.click();
                        if (currentIdx < SCI_DATA.molecules.length - 1) {
                            currentIdx++;
                            renderLevel();
                        } else {
                            GameEngine.renderCelebration(container, {
                                title: 'Molecule Master Champion!',
                                subtitle: 'You successfully synthesized all essential chemical compounds!',
                                badge: '🧪 Chemist Star',
                                stars: 10
                            });
                        }
                    });
                } else {
                    window.sounds.wrong();
                    feedback.className = 'feedback-box feedback-error';
                    feedback.innerHTML = `
                        <div class="feedback-title">❌ Not quite right!</div>
                        <p>Check the formula recipe. You need exactly: ${Object.keys(mol.required).map(s => `${mol.required[s]} ${s}`).join(', ')}.</p>
                    `;
                }
            });
        }

        renderLevel();
    },

    // ==========================================
    // GAME 2: ACID OR BASE PH LAB (Chemistry)
    // ==========================================
    startAcidBaseLab(container) {
        let items = GameEngine.shuffle(SCI_DATA.phItems);
        let currentIndex = 0;
        let score = 0;

        function renderItem() {
            if (currentIndex >= items.length) {
                GameEngine.renderCelebration(container, {
                    title: 'pH Lab Grand Master!',
                    subtitle: `Awesome scientific sorting! You scored ${score} points!`,
                    badge: '🍋 Acid-Base Specialist',
                    stars: 8
                });
                return;
            }

            const item = items[currentIndex];

            container.innerHTML = `
                <div class="game-arena-wrapper">
                    <div class="game-header-bar">
                        <div class="level-indicator">Item ${currentIndex + 1} of ${items.length}</div>
                        <h2 class="game-title">🧪 Acid or Base? pH Color Lab</h2>
                        <div class="game-score-badge">Score: <strong>${score} pts</strong></div>
                    </div>

                    <div class="mission-banner">
                        <span class="mission-icon">🔬</span>
                        <span>Test everyday substances with Universal Indicator and classify them as Acid, Neutral, or Base!</span>
                    </div>

                    <div class="ph-lab-grid">
                        <!-- Current Substance to Test -->
                        <div class="ph-subject-card">
                            <div class="item-icon-huge">${item.icon}</div>
                            <h3 class="ph-item-name">${item.name}</h3>
                            <p class="ph-instruction">Is this substance an Acid, Neutral, or Base?</p>

                            <!-- Test Tube Visual -->
                            <div class="ph-testtube-wrapper">
                                <div class="testtube-rim"></div>
                                <div class="testtube-glass">
                                    <div class="testtube-liquid" id="ph-liquid"></div>
                                    <div class="testtube-bubbles">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            </div>
                            <div class="ph-color-indicator-text" id="ph-indicator-status">Drop into testing liquid or choose a category below:</div>
                        </div>

                        <!-- Sorting Bins / Options -->
                        <div class="ph-sorting-zone">
                            <button class="ph-bin-btn ph-acid" data-choice="acid">
                                <div class="bin-icon">🍋</div>
                                <div class="bin-title">ACID</div>
                                <div class="bin-desc">Sour taste • pH 0 to 6.9<br>Turns indicator RED/ORANGE</div>
                            </button>

                            <button class="ph-bin-btn ph-neutral" data-choice="neutral">
                                <div class="bin-icon">💧</div>
                                <div class="bin-title">NEUTRAL</div>
                                <div class="bin-desc">Pure balance • pH 7.0<br>Turns indicator GREEN</div>
                            </button>

                            <button class="ph-bin-btn ph-base" data-choice="base">
                                <div class="bin-icon">🧼</div>
                                <div class="bin-title">BASE (Alkali)</div>
                                <div class="bin-desc">Slippery / bitter • pH 7.1 to 14<br>Turns indicator BLUE/PURPLE</div>
                            </button>
                        </div>
                    </div>

                    <div class="feedback-modal-area" id="ph-feedback-area"></div>
                </div>
            `;

            // Setup buttons
            container.querySelectorAll('.ph-bin-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const choice = btn.getAttribute('data-choice');
                    evaluateAnswer(choice);
                });
            });

            function evaluateAnswer(choice) {
                const isCorrect = choice === item.type;
                const liquid = container.querySelector('#ph-liquid');
                const statusText = container.querySelector('#ph-indicator-status');
                const feedbackArea = container.querySelector('#ph-feedback-area');

                // Animate test tube liquid color
                liquid.style.background = item.color;
                liquid.style.height = '85%';
                window.sounds.fizz();

                statusText.innerHTML = `Indicator color changed! pH level is <strong>${item.ph}</strong>`;

                if (isCorrect) {
                    score += 100;
                    App.addStars(1);
                    setTimeout(() => window.sounds.correct(), 250);
                    window.confetti.fire({ count: 50 });

                    feedbackArea.innerHTML = `
                        <div class="feedback-card feedback-correct-card">
                            <div class="feedback-badge">🎉 CORRECT! +100 pts</div>
                            <h4>${item.name} is a ${item.type.toUpperCase()}! (pH ${item.ph})</h4>
                            <p>${item.fact}</p>
                            <button class="btn btn-primary mt-2" id="btn-next-ph">Next Substance ▶</button>
                        </div>
                    `;
                } else {
                    window.sounds.wrong();
                    feedbackArea.innerHTML = `
                        <div class="feedback-card feedback-wrong-card">
                            <div class="feedback-badge">💡 SCIENTIFIC FACT</div>
                            <h4>${item.name} is actually a ${item.type.toUpperCase()}! (pH ${item.ph})</h4>
                            <p>${item.fact}</p>
                            <button class="btn btn-secondary mt-2" id="btn-next-ph">Continue Learning ▶</button>
                        </div>
                    `;
                }

                container.querySelector('#btn-next-ph').addEventListener('click', () => {
                    window.sounds.click();
                    currentIndex++;
                    renderItem();
                });
            }
        }

        renderItem();
    },

    // ==========================================
    // GAME 3: CIRCUIT MASTER & CONDUCTORS (Physics)
    // ==========================================
    startCircuitMaster(container) {
        let testedItems = {};
        let currentItem = SCI_DATA.circuitMaterials[0];
        let switchClosed = false;

        function renderBoard() {
            const isConductor = currentItem.conductor;
            const isCircuitActive = switchClosed && isConductor;

            container.innerHTML = `
                <div class="game-arena-wrapper">
                    <div class="game-header-bar">
                        <div class="level-indicator">Conductor & Insulator Lab</div>
                        <h2 class="game-title">⚡ Circuit Master</h2>
                        <div class="game-score-badge">Tested: <strong>${Object.keys(testedItems).length} / ${SCI_DATA.circuitMaterials.length}</strong></div>
                    </div>

                    <div class="mission-banner">
                        <span class="mission-icon">💡</span>
                        <span>Complete the circuit by choosing materials. Will current flow and illuminate the lightbulb?</span>
                    </div>

                    <div class="circuit-workspace">
                        <!-- Main Circuit Board Visualization -->
                        <div class="circuit-board ${isCircuitActive ? 'circuit-flowing' : ''}">
                            <div class="circuit-top-wire ${isCircuitActive ? 'wire-active' : ''}"></div>
                            <div class="circuit-bottom-wire ${isCircuitActive ? 'wire-active' : ''}"></div>

                            <!-- Battery -->
                            <div class="circuit-component battery-component">
                                <div class="battery-body">
                                    <span class="battery-terminal plus">+</span>
                                    <span class="battery-label">BATTERY 9V</span>
                                    <span class="battery-terminal minus">-</span>
                                </div>
                            </div>

                            <!-- Test Slot Gap with current item -->
                            <div class="circuit-component test-slot">
                                <div class="slot-clip clip-left">⚡</div>
                                <div class="slot-item-holder ${currentItem.conductor ? 'is-conductor' : 'is-insulator'}">
                                    <span class="slot-item-icon">${currentItem.icon}</span>
                                    <span class="slot-item-name">${currentItem.name}</span>
                                </div>
                                <div class="slot-clip clip-right">⚡</div>
                            </div>

                            <!-- Knife Switch -->
                            <div class="circuit-component switch-component">
                                <button class="switch-toggle-btn ${switchClosed ? 'switch-on' : 'switch-off'}" id="btn-toggle-switch">
                                    <span class="switch-handle"></span>
                                    <span class="switch-status">${switchClosed ? 'SWITCH CLOSED (ON)' : 'SWITCH OPEN (OFF)'}</span>
                                </button>
                            </div>

                            <!-- Lightbulb -->
                            <div class="circuit-component bulb-component ${isCircuitActive ? 'bulb-glowing' : ''}">
                                <div class="bulb-glow"></div>
                                <div class="bulb-glass">💡</div>
                                <div class="bulb-base"></div>
                                <div class="bulb-state-label">${isCircuitActive ? '🔥 LIGHT IS ON!' : '💤 LIGHT IS OFF'}</div>
                            </div>
                        </div>

                        <!-- Circuit Controls & Material Picker -->
                        <div class="circuit-materials-panel">
                            <h4>Select Material to Test:</h4>
                            <div class="material-chips-grid">
                                ${SCI_DATA.circuitMaterials.map(mat => `
                                    <button class="material-chip-btn ${mat.id === currentItem.id ? 'chip-active' : ''} ${testedItems[mat.id] ? 'chip-tested' : ''}" data-id="${mat.id}">
                                        <span>${mat.icon}</span>
                                        <span>${mat.name}</span>
                                        ${testedItems[mat.id] ? '<span class="check-mark">✓</span>' : ''}
                                    </button>
                                `).join('')}
                            </div>

                            <!-- Live Feedback & Scientific Explanation -->
                            <div class="circuit-analysis-card">
                                <h4>🔬 Circuit Analysis:</h4>
                                <p><strong>Material:</strong> ${currentItem.name} ${currentItem.icon}</p>
                                <p><strong>Switch Position:</strong> ${switchClosed ? 'Closed (Circuit Connected)' : 'Open (Gap in Circuit)'}</p>
                                <div class="circuit-result-badge ${switchClosed ? (currentItem.conductor ? 'badge-success' : 'badge-danger') : 'badge-idle'}">
                                    ${!switchClosed ? '👉 Close the switch to test current!' : (currentItem.conductor ? '⚡ CONDUCTOR: Electricity flows freely!' : '🛡️ INSULATOR: Blocks electric current!')}
                                </div>
                                <p class="explanation-text mt-2">${switchClosed ? currentItem.explanation : 'Click the Switch button to complete the circuit!'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Event Listeners
            container.querySelector('#btn-toggle-switch').addEventListener('click', () => {
                switchClosed = !switchClosed;
                if (switchClosed) {
                    if (currentItem.conductor) {
                        window.sounds.spark();
                        window.sounds.correct();
                        window.confetti.fire({ count: 40 });
                        App.addStars(1);
                    } else {
                        window.sounds.wrong();
                    }
                    testedItems[currentItem.id] = true;
                } else {
                    window.sounds.click();
                }
                renderBoard();

                // If all tested, celebrate!
                if (Object.keys(testedItems).length === SCI_DATA.circuitMaterials.length) {
                    setTimeout(() => {
                        GameEngine.renderCelebration(container, {
                            title: 'Master Electrician!',
                            subtitle: 'You mastered Conductors and Insulators in electric circuits!',
                            badge: '⚡ Circuit Prodigy',
                            stars: 8
                        });
                    }, 2000);
                }
            });

            container.querySelectorAll('.material-chip-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    const found = SCI_DATA.circuitMaterials.find(m => m.id === id);
                    if (found) {
                        currentItem = found;
                        window.sounds.click();
                        renderBoard();
                    }
                });
            });
        }

        renderBoard();
    },

    // ==========================================
    // GAME 4: GRAVITY ROCKET LAUNCH (Physics)
    // ==========================================
    startGravityRocket(container) {
        let angle = 45;
        let power = 65;
        let planet = 'earth';
        let gravityVal = 9.8;
        let targetX = 420;
        let score = 0;
        let hits = 0;

        const gravities = {
            moon: { name: '🌙 Moon', g: 2.2, desc: 'Low gravity — floats far and high!' },
            earth: { name: '🌍 Earth', g: 9.8, desc: 'Balanced home gravity!' },
            jupiter: { name: '🪐 Jupiter', g: 24.8, desc: 'Heavy gravity pulls down fast!' }
        };

        container.innerHTML = `
            <div class="game-arena-wrapper">
                <div class="game-header-bar">
                    <div class="level-indicator">Projectile Kinematics Lab</div>
                    <h2 class="game-title">🚀 Gravity Rocket Launch</h2>
                    <div class="game-score-badge">Targets Hit: <strong>${hits}</strong></div>
                </div>

                <div class="mission-banner">
                    <span class="mission-icon">🎯</span>
                    <span>Adjust launch angle, thruster power, and choose planetary gravity to land the rocket right into the space base!</span>
                </div>

                <div class="rocket-lab-layout">
                    <!-- Canvas Flight Arena -->
                    <div class="canvas-container">
                        <canvas id="rocket-canvas" width="600" height="340"></canvas>
                        <div class="canvas-overlay-status" id="flight-status">Ready for countdown!</div>
                    </div>

                    <!-- Physics Launch Controls -->
                    <div class="rocket-controls-panel">
                        <div class="control-row">
                            <label><strong>Planet Gravity:</strong></label>
                            <div class="planet-btn-group">
                                ${Object.keys(gravities).map(key => `
                                    <button class="btn btn-planet ${key === planet ? 'planet-active' : ''}" data-planet="${key}">
                                        ${gravities[key].name}
                                    </button>
                                `).join('')}
                            </div>
                            <small class="text-muted" id="gravity-note">${gravities[planet].desc} (g = ${gravityVal} m/s²)</small>
                        </div>

                        <div class="control-row">
                            <div class="slider-header">
                                <label>Launch Angle:</label>
                                <span class="slider-val" id="angle-val">${angle}°</span>
                            </div>
                            <input type="range" min="15" max="85" value="${angle}" class="range-slider" id="angle-slider">
                        </div>

                        <div class="control-row">
                            <div class="slider-header">
                                <label>Thruster Power:</label>
                                <span class="slider-val" id="power-val">${power}%</span>
                            </div>
                            <input type="range" min="30" max="100" value="${power}" class="range-slider" id="power-slider">
                        </div>

                        <button class="btn btn-primary btn-launch btn-full" id="btn-launch-rocket">
                            <span>🚀</span> BLAST OFF!
                        </button>
                    </div>
                </div>
            </div>
        `;

        const canvas = container.querySelector('#rocket-canvas');
        const ctx = canvas.getContext('2d');
        const statusEl = container.querySelector('#flight-status');
        let isLaunching = false;

        // Set responsive canvas sizing internally
        function drawScene(trail = [], currentRocketPos = null) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Sky gradient
            const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
            if (planet === 'moon') {
                skyGrad.addColorStop(0, '#0f172a');
                skyGrad.addColorStop(1, '#1e293b');
            } else if (planet === 'jupiter') {
                skyGrad.addColorStop(0, '#451a03');
                skyGrad.addColorStop(1, '#78350f');
            } else {
                skyGrad.addColorStop(0, '#0284c7');
                skyGrad.addColorStop(1, '#bae6fd');
            }
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Ground
            ctx.fillStyle = planet === 'moon' ? '#64748b' : (planet === 'jupiter' ? '#b45309' : '#15803d');
            ctx.fillRect(0, canvas.height - 30, canvas.width, 30);

            // Launchpad
            ctx.fillStyle = '#475569';
            ctx.fillRect(20, canvas.height - 40, 40, 10);

            // Angle indicator line
            const rad = (angle * Math.PI) / 180;
            const lineLen = 45;
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(40, canvas.height - 40);
            ctx.lineTo(40 + Math.cos(rad) * lineLen, canvas.height - 40 - Math.sin(rad) * lineLen);
            ctx.stroke();

            // Target Space Base
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(targetX, canvas.height - 30, 22, Math.PI, 0, false);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(targetX, canvas.height - 30, 14, Math.PI, 0, false);
            ctx.fill();
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(targetX, canvas.height - 30, 6, Math.PI, 0, false);
            ctx.fill();
            ctx.font = 'bold 12px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('TARGET BASE', targetX - 40, canvas.height - 42);

            // Draw Trajectory Trail
            if (trail.length > 1) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.moveTo(trail[0].x, trail[0].y);
                for (let i = 1; i < trail.length; i++) {
                    ctx.lineTo(trail[i].x, trail[i].y);
                }
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Draw Rocket
            const rx = currentRocketPos ? currentRocketPos.x : 40;
            const ry = currentRocketPos ? currentRocketPos.y : canvas.height - 45;

            ctx.save();
            ctx.translate(rx, ry);
            ctx.font = '22px sans-serif';
            ctx.fillText('🚀', -12, 10);
            ctx.restore();
        }

        drawScene();

        // Bind Sliders
        const angleSlider = container.querySelector('#angle-slider');
        const powerSlider = container.querySelector('#power-slider');

        angleSlider.addEventListener('input', (e) => {
            angle = parseInt(e.target.value);
            container.querySelector('#angle-val').textContent = `${angle}°`;
            if (!isLaunching) drawScene();
        });

        powerSlider.addEventListener('input', (e) => {
            power = parseInt(e.target.value);
            container.querySelector('#power-val').textContent = `${power}%`;
            if (!isLaunching) drawScene();
        });

        // Planet Buttons
        container.querySelectorAll('.btn-planet').forEach(btn => {
            btn.addEventListener('click', () => {
                if (isLaunching) return;
                planet = btn.getAttribute('data-planet');
                gravityVal = gravities[planet].g;
                container.querySelectorAll('.btn-planet').forEach(b => b.classList.remove('planet-active'));
                btn.classList.add('planet-active');
                container.querySelector('#gravity-note').textContent = `${gravities[planet].desc} (g = ${gravityVal} m/s²)`;
                window.sounds.click();
                drawScene();
            });
        });

        // Launch Simulation Loop
        container.querySelector('#btn-launch-rocket').addEventListener('click', () => {
            if (isLaunching) return;
            isLaunching = true;
            window.sounds.launch();
            statusEl.textContent = 'In flight... calculating trajectory!';
            statusEl.className = 'canvas-overlay-status status-active';

            const startX = 40;
            const startY = canvas.height - 40;
            const rad = (angle * Math.PI) / 180;
            const velocity = power * 0.95;
            const vx = velocity * Math.cos(rad);
            const vy = -velocity * Math.sin(rad);

            let t = 0;
            const dt = 0.08;
            const trail = [];

            function step() {
                t += dt;
                // Physics equations of motion with scaled gravity
                const x = startX + vx * t * 4;
                const y = startY + vy * t * 4 + 0.5 * (gravityVal * 0.4) * Math.pow(t * 4, 2);

                trail.push({ x, y });
                drawScene(trail, { x, y });

                // Check landing/impact
                if (y >= canvas.height - 35 || x >= canvas.width) {
                    isLaunching = false;
                    const distToTarget = Math.abs(x - targetX);

                    if (distToTarget <= 30) {
                        // Bullseye!
                        hits++;
                        score += 150;
                        App.addStars(2);
                        window.sounds.victory();
                        window.confetti.fire({ count: 70 });
                        statusEl.textContent = '🎉 DIRECT HIT! Bullseye landing on the base!';
                        statusEl.className = 'canvas-overlay-status status-win';

                        // Move target slightly for next challenge
                        setTimeout(() => {
                            targetX = 300 + Math.floor(Math.random() * 220);
                            drawScene();
                        }, 2000);
                    } else if (x < targetX) {
                        window.sounds.wrong();
                        statusEl.textContent = `Fell short by ${Math.round(distToTarget)}m! Increase angle or power!`;
                        statusEl.className = 'canvas-overlay-status status-miss';
                    } else {
                        window.sounds.wrong();
                        statusEl.textContent = `Overshot by ${Math.round(distToTarget)}m! Try lowering power or angle!`;
                        statusEl.className = 'canvas-overlay-status status-miss';
                    }
                    return;
                }

                requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        });
    },

    // ==========================================
    // GAME 5: BUILD A CELL (Biology)
    // ==========================================
    startBuildACell(container) {
        let placedOrganelles = {};
        const totalOrganelles = SCI_DATA.cellParts.length;

        function renderCell() {
            const placedCount = Object.keys(placedOrganelles).length;

            container.innerHTML = `
                <div class="game-arena-wrapper">
                    <div class="game-header-bar">
                        <div class="level-indicator">Cellular Biology Lab</div>
                        <h2 class="game-title">🌱 Build a Plant Cell</h2>
                        <div class="game-score-badge">Assembled: <strong>${placedCount} / ${totalOrganelles}</strong></div>
                    </div>

                    <div class="mission-banner">
                        <span class="mission-icon">🔬</span>
                        <span>Drag or click each organelle from the biology tray into its proper place inside the cell!</span>
                    </div>

                    <div class="cell-workspace">
                        <!-- Cell Graphic Container with Drop Targets -->
                        <div class="cell-canvas-box">
                            <div class="cell-wall-outer">
                                <span class="cell-wall-tag">Rigid Cell Wall</span>
                                <div class="cell-membrane-inner">
                                    <div class="cell-cytoplasm-bg"></div>

                                    <!-- Organelle Drop Targets -->
                                    ${SCI_DATA.cellParts.map(part => `
                                        <div class="organelle-slot slot-${part.id} ${placedOrganelles[part.id] ? 'slot-filled' : ''}" data-id="${part.id}">
                                            ${placedOrganelles[part.id] ? `
                                                <div class="placed-organelle-badge" style="background:${part.color};">
                                                    <span class="organelle-icon">${part.icon}</span>
                                                    <span class="organelle-name-tag">${part.name}</span>
                                                </div>
                                            ` : `
                                                <div class="empty-slot-outline">
                                                    <span>${part.icon}</span>
                                                    <small>${part.name}</small>
                                                </div>
                                            `}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <!-- Organelle Selection Tray & Info -->
                        <div class="cell-parts-tray">
                            <h4>Organelles to Place:</h4>
                            <div class="organelles-list">
                                ${SCI_DATA.cellParts.map(part => `
                                    <div class="organelle-card ${placedOrganelles[part.id] ? 'organelle-placed' : ''}" data-id="${part.id}">
                                        <div class="organelle-card-head">
                                            <span class="organelle-card-icon">${part.icon}</span>
                                            <div>
                                                <strong>${part.name}</strong>
                                                <div class="organelle-sub">${part.title}</div>
                                            </div>
                                        </div>
                                        <p class="organelle-role">${part.role}</p>
                                        <button class="btn btn-sm btn-place-organelle ${placedOrganelles[part.id] ? 'btn-disabled' : 'btn-primary'}" data-id="${part.id}">
                                            ${placedOrganelles[part.id] ? 'Placed In Cell ✓' : 'Add to Cell ➔'}
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Event handler for placing organelle
            container.querySelectorAll('.btn-place-organelle').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    if (placedOrganelles[id]) return;

                    placedOrganelles[id] = true;
                    window.sounds.correct();
                    App.addStars(1);
                    renderCell();

                    // Check if all placed
                    if (Object.keys(placedOrganelles).length === totalOrganelles) {
                        window.sounds.victory();
                        window.confetti.fire({ count: 90 });
                        setTimeout(() => {
                            GameEngine.renderCelebration(container, {
                                title: 'Master Cell Biologist!',
                                subtitle: 'You successfully assembled all organelles into a living plant cell!',
                                badge: '🌱 Cell Master',
                                stars: 10
                            });
                        }, 1200);
                    }
                });
            });

            // Also clicking the empty slots directly
            container.querySelectorAll('.organelle-slot:not(.slot-filled)').forEach(slot => {
                slot.addEventListener('click', () => {
                    const id = slot.getAttribute('data-id');
                    if (placedOrganelles[id]) return;
                    placedOrganelles[id] = true;
                    window.sounds.correct();
                    App.addStars(1);
                    renderCell();
                });
            });
        }

        renderCell();
    },

    // ==========================================
    // GAME 6: ECOSYSTEM FOOD CHAIN (Biology)
    // ==========================================
    startFoodChain(container) {
        let levelIdx = 0;

        function renderLevel() {
            const eco = SCI_DATA.foodChains[levelIdx];
            const correctChain = eco.chain;
            let currentSlots = [null, null, null, null, null];
            let availableCards = GameEngine.shuffle(correctChain);

            function updateView() {
                container.innerHTML = `
                    <div class="game-arena-wrapper">
                        <div class="game-header-bar">
                            <div class="level-indicator">Ecosystem ${levelIdx + 1} of ${SCI_DATA.foodChains.length}</div>
                            <h2 class="game-title">🌱 Ecosystem Food Chain</h2>
                            <div class="game-score-badge">Habitats: <strong>${eco.name}</strong></div>
                        </div>

                        <div class="mission-banner">
                            <span class="mission-icon">☀️</span>
                            <span>Order the organisms from the Primary Energy Source to the Top Apex Predator!</span>
                        </div>

                        <div class="food-chain-workspace">
                            <!-- Drop Slots Sequence -->
                            <div class="food-chain-slots-bar">
                                ${currentSlots.map((item, idx) => `
                                    <div class="chain-slot-container">
                                        <div class="slot-step-num">Step ${idx + 1}</div>
                                        <div class="chain-drop-box ${item ? 'box-occupied' : 'box-empty'}" data-slot="${idx}">
                                            ${item ? `
                                                <div class="placed-card">
                                                    <span class="placed-icon">${item.icon}</span>
                                                    <strong class="placed-title">${item.name}</strong>
                                                    <small class="placed-role">${item.role}</small>
                                                    <button class="btn-remove-slot" data-slot="${idx}" title="Remove">✕</button>
                                                </div>
                                            ` : `
                                                <div class="empty-prompt">Drop / Tap Card Here</div>
                                            `}
                                        </div>
                                    </div>
                                    ${idx < 4 ? '<div class="chain-arrow">➔</div>' : ''}
                                `).join('')}
                            </div>

                            <!-- Cards to Place -->
                            <div class="chain-available-pool">
                                <h4>Available Organisms:</h4>
                                <div class="chain-cards-row">
                                    ${availableCards.map(item => `
                                        <button class="organism-pick-card" data-name="${item.name}">
                                            <span class="organism-icon">${item.icon}</span>
                                            <span class="organism-name">${item.name}</span>
                                            <small class="organism-role-badge">${item.role}</small>
                                        </button>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="chain-controls-bar">
                                <button class="btn btn-secondary" id="btn-reset-chain">🔄 Reset Chain</button>
                                <button class="btn btn-primary" id="btn-check-chain">✓ Verify Energy Flow</button>
                            </div>

                            <div class="feedback-box mt-3" id="chain-feedback"></div>
                        </div>
                    </div>
                `;

                // Add Card Listener
                container.querySelectorAll('.organism-pick-card').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const name = btn.getAttribute('data-name');
                        const itemObj = correctChain.find(c => c.name === name);
                        const firstEmpty = currentSlots.indexOf(null);

                        if (firstEmpty !== -1) {
                            currentSlots[firstEmpty] = itemObj;
                            availableCards = availableCards.filter(c => c.name !== name);
                            window.sounds.pickup();
                            updateView();
                        }
                    });
                });

                // Remove from slot
                container.querySelectorAll('.btn-remove-slot').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const slot = parseInt(btn.getAttribute('data-slot'));
                        const removed = currentSlots[slot];
                        currentSlots[slot] = null;
                        availableCards.push(removed);
                        window.sounds.click();
                        updateView();
                    });
                });

                // Reset button
                container.querySelector('#btn-reset-chain').addEventListener('click', () => {
                    currentSlots = [null, null, null, null, null];
                    availableCards = GameEngine.shuffle(correctChain);
                    window.sounds.click();
                    updateView();
                });

                // Verify Button
                container.querySelector('#btn-check-chain').addEventListener('click', () => {
                    const feedback = container.querySelector('#chain-feedback');
                    if (currentSlots.includes(null)) {
                        feedback.className = 'feedback-box feedback-error';
                        feedback.innerHTML = '⚠️ Please fill all 5 steps of the food chain before checking!';
                        window.sounds.wrong();
                        return;
                    }

                    // Check exact sequence
                    let isCorrect = true;
                    for (let i = 0; i < correctChain.length; i++) {
                        if (currentSlots[i].name !== correctChain[i].name) {
                            isCorrect = false;
                            break;
                        }
                    }

                    if (isCorrect) {
                        window.sounds.correct();
                        window.confetti.fire({ count: 70 });
                        App.addStars(2);

                        feedback.className = 'feedback-box feedback-success';
                        feedback.innerHTML = `
                            <div class="feedback-title">🎉 Perfect Ecosystem Balance!</div>
                            <p>${eco.funFact}</p>
                            <button class="btn btn-primary mt-2" id="btn-next-ecosystem">
                                ${levelIdx < SCI_DATA.foodChains.length - 1 ? 'Next Ecosystem ➔' : 'Complete Biology Lab 🌟'}
                            </button>
                        `;

                        container.querySelector('#btn-next-ecosystem').addEventListener('click', () => {
                            window.sounds.click();
                            if (levelIdx < SCI_DATA.foodChains.length - 1) {
                                levelIdx++;
                                renderLevel();
                            } else {
                                GameEngine.renderCelebration(container, {
                                    title: 'Master Ecologist!',
                                    subtitle: 'You mastered food chains and trophic energy flow across all biomes!',
                                    badge: '🦅 Ecology Champion',
                                    stars: 10
                                });
                            }
                        });
                    } else {
                        window.sounds.wrong();
                        feedback.className = 'feedback-box feedback-error';
                        feedback.innerHTML = `
                            <div class="feedback-title">❌ Chain Broken!</div>
                            <p>Energy must always flow from the Sun to Plants (Producers), then to Herbivores, and finally to Predators!</p>
                        `;
                    }
                });
            }

            updateView();
        }

        renderLevel();
    },

    // ==========================================
    // GAME 7: HUMAN BODY ORGANS QUEST (Biology)
    // ==========================================
    startHumanOrgans(container) {
        let placed = {};
        const organs = SCI_DATA.humanOrgans;

        function renderAnatomy() {
            const placedCount = Object.keys(placed).length;

            container.innerHTML = `
                <div class="game-arena-wrapper">
                    <div class="game-header-bar">
                        <div class="level-indicator">Human Biology Lab</div>
                        <h2 class="game-title">🫀 Human Body Organs Quest</h2>
                        <div class="game-score-badge">Organs: <strong>${placedCount} / ${organs.length}</strong></div>
                    </div>

                    <div class="mission-banner">
                        <span class="mission-icon">🩺</span>
                        <span>Match each vital organ to its proper spot inside the human body!</span>
                    </div>

                    <div class="anatomy-workspace">
                        <!-- Silhouette Figure -->
                        <div class="body-silhouette-card">
                            <div class="human-body-outline">
                                <!-- Target Slots inside silhouette -->
                                <div class="organ-target-slot target-head ${placed.brain ? 'target-filled' : ''}" data-id="brain">
                                    ${placed.brain ? '<span class="placed-organ-icon pulse-brain">🧠</span>' : '<span class="slot-ghost">Head</span>'}
                                </div>

                                <div class="organ-target-slot target-chest-left ${placed.heart ? 'target-filled' : ''}" data-id="heart">
                                    ${placed.heart ? '<span class="placed-organ-icon pulse-heart">❤️</span>' : '<span class="slot-ghost">Heart</span>'}
                                </div>

                                <div class="organ-target-slot target-chest-center ${placed.lungs ? 'target-filled' : ''}" data-id="lungs">
                                    ${placed.lungs ? '<span class="placed-organ-icon pulse-lungs">🫁</span>' : '<span class="slot-ghost">Lungs</span>'}
                                </div>

                                <div class="organ-target-slot target-belly ${placed.stomach ? 'target-filled' : ''}" data-id="stomach">
                                    ${placed.stomach ? '<span class="placed-organ-icon">🫄</span>' : '<span class="slot-ghost">Stomach</span>'}
                                </div>

                                <div class="organ-target-slot target-limbs ${placed.bones ? 'target-filled' : ''}" data-id="bones">
                                    ${placed.bones ? '<span class="placed-organ-icon">🦴</span>' : '<span class="slot-ghost">Skeleton</span>'}
                                </div>
                            </div>
                        </div>

                        <!-- Organ Cards -->
                        <div class="organ-cards-panel">
                            <h4>Organs to Place:</h4>
                            <div class="organs-flex-list">
                                ${organs.map(org => `
                                    <div class="anatomy-organ-card ${placed[org.id] ? 'organ-card-done' : ''}" data-id="${org.id}">
                                        <div class="card-left">
                                            <span class="anatomy-icon">${org.icon}</span>
                                            <div>
                                                <strong>${org.name}</strong>
                                                <div class="organ-hint">${org.hint}</div>
                                            </div>
                                        </div>
                                        <button class="btn btn-sm ${placed[org.id] ? 'btn-disabled' : 'btn-primary'} btn-place-organ" data-id="${org.id}">
                                            ${placed[org.id] ? 'Placed ✓' : 'Place Organ ➔'}
                                        </button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Place Organ Handler
            container.querySelectorAll('.btn-place-organ').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.getAttribute('data-id');
                    if (placed[id]) return;

                    placed[id] = true;
                    window.sounds.correct();
                    App.addStars(1);
                    renderAnatomy();

                    if (Object.keys(placed).length === organs.length) {
                        window.sounds.victory();
                        window.confetti.fire({ count: 80 });
                        setTimeout(() => {
                            GameEngine.renderCelebration(container, {
                                title: 'Future Surgeon & Doctor!',
                                subtitle: 'You correctly mapped all vital organs of the human body!',
                                badge: '🩺 Anatomy Expert',
                                stars: 10
                            });
                        }, 1200);
                    }
                });
            });
        }

        renderAnatomy();
    },

    // ==========================================
    // GAME 8: MASTER SCIENCE QUIZ (All Sciences)
    // ==========================================
    startMasterQuiz(container) {
        let qIdx = 0;
        let score = 0;
        let streak = 0;
        let fiftyUsed = false;
        const questions = GameEngine.shuffle(SCI_DATA.quizQuestions);

        function renderQuestion() {
            if (qIdx >= questions.length) {
                GameEngine.renderCelebration(container, {
                    title: 'SciChamp Grand Trivia Master!',
                    subtitle: `Outstanding performance! You answered science questions with a total score of ${score} pts!`,
                    badge: '🎓 SciChamp Grand Laureate',
                    stars: 12
                });
                return;
            }

            const q = questions[qIdx];

            container.innerHTML = `
                <div class="game-arena-wrapper">
                    <div class="game-header-bar">
                        <div class="level-indicator">Question ${qIdx + 1} of ${questions.length}</div>
                        <h2 class="game-title">🏆 SciChamp Trivia Challenge</h2>
                        <div class="game-score-badge">Score: <strong>${score} pts</strong> ${streak > 1 ? `<span class="streak-pill">🔥 ${streak}x Streak</span>` : ''}</div>
                    </div>

                    <div class="quiz-progress-bar-container">
                        <div class="quiz-progress-fill" style="width: ${(qIdx / questions.length) * 100}%;"></div>
                    </div>

                    <div class="quiz-workspace">
                        <div class="quiz-question-box">
                            <span class="quiz-cat-tag">${q.icon} ${q.category}</span>
                            <h3 class="quiz-question-text">${q.question}</h3>
                        </div>

                        <!-- Lifeline Buttons -->
                        <div class="lifeline-bar">
                            <button class="btn btn-sm btn-lifeline ${fiftyUsed ? 'btn-disabled' : ''}" id="btn-5050" ${fiftyUsed ? 'disabled' : ''}>
                                <span>⚖️</span> 50:50 Lifeline
                            </button>
                        </div>

                        <!-- Options Grid -->
                        <div class="quiz-options-grid">
                            ${q.options.map((opt, idx) => `
                                <button class="quiz-opt-btn" data-index="${idx}">
                                    <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
                                    <span class="opt-text">${opt}</span>
                                </button>
                            `).join('')}
                        </div>

                        <div class="feedback-box mt-3" id="quiz-feedback"></div>
                    </div>
                </div>
            `;

            // 50:50 Lifeline
            container.querySelector('#btn-5050').addEventListener('click', () => {
                if (fiftyUsed) return;
                fiftyUsed = true;
                window.sounds.click();
                container.querySelector('#btn-5050').classList.add('btn-disabled');

                // Pick two wrong options to disable
                const wrongIndices = [];
                q.options.forEach((_, idx) => {
                    if (idx !== q.answer) wrongIndices.push(idx);
                });
                const toRemove = GameEngine.shuffle(wrongIndices).slice(0, 2);

                container.querySelectorAll('.quiz-opt-btn').forEach(btn => {
                    const idx = parseInt(btn.getAttribute('data-index'));
                    if (toRemove.includes(idx)) {
                        btn.style.opacity = '0.25';
                        btn.style.pointerEvents = 'none';
                    }
                });
            });

            // Option Selection
            container.querySelectorAll('.quiz-opt-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const chosen = parseInt(btn.getAttribute('data-index'));
                    const isCorrect = chosen === q.answer;
                    const feedback = container.querySelector('#quiz-feedback');

                    // Disable all options
                    container.querySelectorAll('.quiz-opt-btn').forEach(b => {
                        b.style.pointerEvents = 'none';
                        const bIdx = parseInt(b.getAttribute('data-index'));
                        if (bIdx === q.answer) b.classList.add('opt-correct');
                        if (bIdx === chosen && !isCorrect) b.classList.add('opt-wrong');
                    });

                    if (isCorrect) {
                        streak++;
                        const pointsAwarded = 100 * (streak > 1 ? streak : 1);
                        score += pointsAwarded;
                        App.addStars(1);
                        window.sounds.correct();
                        window.confetti.fire({ count: 50 });

                        feedback.className = 'feedback-box feedback-success';
                        feedback.innerHTML = `
                            <div class="feedback-title">🎉 Correct! +${pointsAwarded} pts!</div>
                            <p>${q.explanation}</p>
                            <button class="btn btn-primary mt-2" id="btn-next-question">Next Question ➔</button>
                        `;
                    } else {
                        streak = 0;
                        window.sounds.wrong();

                        feedback.className = 'feedback-box feedback-error';
                        feedback.innerHTML = `
                            <div class="feedback-title">❌ Not quite!</div>
                            <p><strong>Correct Answer:</strong> ${q.options[q.answer]}</p>
                            <p>${q.explanation}</p>
                            <button class="btn btn-secondary mt-2" id="btn-next-question">Next Question ➔</button>
                        `;
                    }

                    container.querySelector('#btn-next-question').addEventListener('click', () => {
                        window.sounds.click();
                        qIdx++;
                        renderQuestion();
                    });
                });
            });
        }

        renderQuestion();
    },

    // ==========================================
    // SHARED: VICTORY & CELEBRATION MODAL
    // ==========================================
    renderCelebration(container, info) {
        window.confetti.fire({ count: 120 });
        window.sounds.victory();
        App.addStars(info.stars || 5);

        container.innerHTML = `
            <div class="celebration-wrapper">
                <div class="celebration-badge-hero">🏆</div>
                <h2 class="celebration-title">${info.title}</h2>
                <p class="celebration-sub">${info.subtitle}</p>

                <div class="celebration-reward-card">
                    <div class="reward-row">
                        <span>Unlocked Badge:</span>
                        <strong class="badge-pill">${info.badge}</strong>
                    </div>
                    <div class="reward-row">
                        <span>Bonus Science Stars:</span>
                        <strong class="stars-pill">⭐ +${info.stars || 5} Stars</strong>
                    </div>
                </div>

                <div class="celebration-actions">
                    <button class="btn btn-secondary" id="btn-replay-game">
                        <span>🔄</span> Play Again
                    </button>
                    <button class="btn btn-primary" id="btn-back-hub">
                        <span>🏠</span> Back to All Games
                    </button>
                </div>
            </div>
        `;

        container.querySelector('#btn-replay-game').addEventListener('click', () => {
            window.sounds.click();
            App.launchGame(App.currentActiveGameId);
        });

        container.querySelector('#btn-back-hub').addEventListener('click', () => {
            window.sounds.click();
            App.closeGameModal();
        });
    }
};

window.GameEngine = GameEngine;
