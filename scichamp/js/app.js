// SciChamp Main Application Controller
// Handles Game catalog, Filtering, Modal Arena, Badges, and Star points

const App = {
    stars: 0,
    currentFilter: 'all',
    currentActiveGameId: null,

    // Catalog of all games
    games: [
        {
            id: 'molecule-maker',
            title: 'Molecule Maker',
            category: 'chemistry',
            subjectLabel: 'Chemistry',
            icon: '🧪',
            color: '#EC4899',
            badge: 'Molecules',
            difficulty: '⭐ Medium',
            description: 'Synthesize Water (H₂O), Salt (NaCl), Carbon Dioxide, and Methane by mixing atoms in the beaker!',
            imageSvg: `
                <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-svg-thumb">
                    <defs>
                        <linearGradient id="flaskGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#F472B6"/>
                            <stop offset="100%" stop-color="#DB2777"/>
                        </linearGradient>
                    </defs>
                    <path d="M85 30H115V55L145 110C148 116 143 125 135 125H65C57 125 52 116 55 110L85 55V30Z" fill="#FCE7F3" stroke="#BE185D" stroke-width="5" stroke-linejoin="round"/>
                    <path d="M68 95L80 75H120L132 95C135 101 131 115 125 118H75C69 115 65 101 68 95Z" fill="url(#flaskGrad)"/>
                    <circle cx="90" cy="100" r="5" fill="#FFF" opacity="0.8"/>
                    <circle cx="110" cy="90" r="7" fill="#FFF" opacity="0.8"/>
                    <circle cx="100" cy="105" r="4" fill="#FFF" opacity="0.8"/>
                    <!-- Molecule Atom nodes -->
                    <circle cx="150" cy="40" r="14" fill="#EF4444" stroke="#FFF" stroke-width="2"/>
                    <text x="150" y="45" font-size="12" font-weight="bold" fill="#FFF" text-anchor="middle">O</text>
                    <circle cx="132" cy="65" r="10" fill="#3B82F6" stroke="#FFF" stroke-width="2"/>
                    <text x="132" y="69" font-size="10" font-weight="bold" fill="#FFF" text-anchor="middle">H</text>
                    <circle cx="168" cy="65" r="10" fill="#3B82F6" stroke="#FFF" stroke-width="2"/>
                    <text x="168" y="69" font-size="10" font-weight="bold" fill="#FFF" text-anchor="middle">H</text>
                    <line x1="145" y1="48" x2="135" y2="58" stroke="#1E293B" stroke-width="3"/>
                    <line x1="155" y1="48" x2="165" y2="58" stroke="#1E293B" stroke-width="3"/>
                </svg>
            `,
            runner: (container) => GameEngine.startMoleculeMaker(container)
        },
        {
            id: 'acid-base-lab',
            title: 'Acid or Base? pH Color Lab',
            category: 'chemistry',
            subjectLabel: 'Chemistry',
            icon: '🍋',
            color: '#F59E0B',
            badge: 'pH Scale',
            difficulty: '⭐ Easy',
            description: 'Test lemons, soap, vinegar, and milk with Universal Indicator to observe spectacular color shifts!',
            imageSvg: `
                <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-svg-thumb">
                    <!-- 3 test tubes: Red (Acid), Green (Neutral), Purple (Base) -->
                    <!-- Tube 1 -->
                    <rect x="35" y="30" width="30" height="75" rx="15" fill="#FEE2E2" stroke="#DC2626" stroke-width="4"/>
                    <rect x="35" y="60" width="30" height="45" rx="15" fill="#EF4444"/>
                    <!-- Tube 2 -->
                    <rect x="85" y="20" width="30" height="85" rx="15" fill="#D1FAE5" stroke="#059669" stroke-width="4"/>
                    <rect x="85" y="55" width="30" height="50" rx="15" fill="#10B981"/>
                    <!-- Tube 3 -->
                    <rect x="135" y="30" width="30" height="75" rx="15" fill="#EDE9FE" stroke="#7C3AED" stroke-width="4"/>
                    <rect x="135" y="60" width="30" height="45" rx="15" fill="#8B5CF6"/>
                    <!-- Rack stand -->
                    <rect x="20" y="105" width="160" height="15" rx="5" fill="#94A3B8"/>
                    <!-- Lemon -->
                    <text x="50" y="24" font-size="20" text-anchor="middle">🍋</text>
                    <text x="100" y="16" font-size="20" text-anchor="middle">💧</text>
                    <text x="150" y="24" font-size="20" text-anchor="middle">🧼</text>
                </svg>
            `,
            runner: (container) => GameEngine.startAcidBaseLab(container)
        },
        {
            id: 'circuit-master',
            title: 'Circuit Master & Conductors',
            category: 'physics',
            subjectLabel: 'Physics',
            icon: '⚡',
            color: '#3B82F6',
            badge: 'Electricity',
            difficulty: '⭐ Easy',
            description: 'Connect batteries, wires, and knife switches. Test which materials conduct electric current to light the bulb!',
            imageSvg: `
                <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-svg-thumb">
                    <!-- Glowing Bulb -->
                    <circle cx="100" cy="55" r="32" fill="#FEF08A" opacity="0.4"/>
                    <circle cx="100" cy="55" r="22" fill="#FDE047" stroke="#CA8A04" stroke-width="3"/>
                    <path d="M92 74H108V86C108 89 104 92 100 92C96 92 92 89 92 86V74Z" fill="#94A3B8"/>
                    <!-- Rays -->
                    <line x1="100" y1="15" x2="100" y2="25" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
                    <line x1="65" y1="30" x2="72" y2="38" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
                    <line x1="135" y1="30" x2="128" y2="38" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/>
                    <!-- Circuit Wires -->
                    <path d="M30 90H80" stroke="#0284C7" stroke-width="5" stroke-linecap="round"/>
                    <path d="M120 90H170" stroke="#0284C7" stroke-width="5" stroke-linecap="round"/>
                    <path d="M30 90V120H170V90" stroke="#0284C7" stroke-width="5" stroke-linecap="round" fill="none"/>
                    <!-- Battery on bottom -->
                    <rect x="75" y="112" width="50" height="16" rx="3" fill="#1E293B"/>
                    <rect x="125" y="116" width="6" height="8" rx="2" fill="#DC2626"/>
                    <text x="100" y="124" font-size="9" font-weight="bold" fill="#FFF" text-anchor="middle">9V DC</text>
                </svg>
            `,
            runner: (container) => GameEngine.startCircuitMaster(container)
        },
        {
            id: 'gravity-rocket',
            title: 'Gravity Rocket Launch',
            category: 'physics',
            subjectLabel: 'Physics',
            icon: '🚀',
            color: '#8B5CF6',
            badge: 'Kinematics',
            difficulty: '⭐⭐ Fun Challenge',
            description: 'Experiment with gravity on Earth, the Moon, and Jupiter! Adjust launch angles and thrust to score a bullseye.',
            imageSvg: `
                <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-svg-thumb">
                    <!-- Space Background -->
                    <rect x="10" y="10" width="180" height="120" rx="12" fill="#0F172A"/>
                    <!-- Stars -->
                    <circle cx="40" cy="30" r="1.5" fill="#FFF"/>
                    <circle cx="90" cy="20" r="2" fill="#FDE047"/>
                    <circle cx="160" cy="40" r="1.5" fill="#FFF"/>
                    <circle cx="130" cy="80" r="2" fill="#FFF"/>
                    <!-- Planet Moon in background -->
                    <circle cx="165" cy="28" r="16" fill="#CBD5E1"/>
                    <circle cx="158" cy="24" r="3" fill="#94A3B8"/>
                    <circle cx="170" cy="34" r="4" fill="#94A3B8"/>
                    <!-- Parabolic Trajectory -->
                    <path d="M35 110 Q90 10 160 110" stroke="#F59E0B" stroke-width="3" stroke-dasharray="5 5" fill="none"/>
                    <!-- Rocket flying -->
                    <g transform="translate(90, 42) rotate(35)">
                        <path d="M0 -15 L10 15 L-10 15 Z" fill="#EF4444"/>
                        <circle cx="0" cy="0" r="4" fill="#67E8F9"/>
                        <path d="M-6 15 L0 25 L6 15 Z" fill="#F59E0B"/>
                    </g>
                    <!-- Launchpad & Target Base -->
                    <rect x="25" y="110" width="25" height="8" rx="2" fill="#64748B"/>
                    <circle cx="160" cy="112" r="10" fill="#EF4444"/>
                    <circle cx="160" cy="112" r="5" fill="#FFF"/>
                </svg>
            `,
            runner: (container) => GameEngine.startGravityRocket(container)
        },
        {
            id: 'build-a-cell',
            title: 'Build a Plant Cell',
            category: 'biology',
            subjectLabel: 'Biology',
            icon: '🌱',
            color: '#10B981',
            badge: 'Cell Anatomy',
            difficulty: '⭐ Easy',
            description: 'Explore the building block of plants! Place the nucleus, mitochondria, chloroplasts, and cell wall into place.',
            imageSvg: `
                <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-svg-thumb">
                    <!-- Plant Cell Wall (Hexagonal/Rounded Box) -->
                    <rect x="25" y="15" width="150" height="110" rx="30" fill="#D1FAE5" stroke="#059669" stroke-width="8"/>
                    <!-- Inner Membrane -->
                    <rect x="35" y="25" width="130" height="90" rx="22" fill="#A7F3D0" stroke="#34D399" stroke-width="3"/>
                    <!-- Nucleus -->
                    <circle cx="75" cy="70" r="22" fill="#8B5CF6"/>
                    <circle cx="75" cy="70" r="9" fill="#C4B5FD"/>
                    <!-- Vacuole -->
                    <ellipse cx="125" cy="60" rx="24" ry="16" fill="#38BDF8" opacity="0.8"/>
                    <!-- Chloroplasts -->
                    <ellipse cx="65" cy="38" rx="10" ry="6" fill="#15803D"/>
                    <ellipse cx="130" cy="95" rx="11" ry="6" fill="#15803D"/>
                    <!-- Mitochondria -->
                    <ellipse cx="105" cy="90" rx="12" ry="7" fill="#EF4444"/>
                </svg>
            `,
            runner: (container) => GameEngine.startBuildACell(container)
        },
        {
            id: 'food-chain',
            title: 'Ecosystem Food Chain',
            category: 'biology',
            subjectLabel: 'Biology',
            icon: '🦅',
            color: '#059669',
            badge: 'Ecosystems',
            difficulty: '⭐ Medium',
            description: 'Assemble trophic energy chains from the Sun through producers, herbivores, and top apex predators across 3 biomes!',
            imageSvg: `
                <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-svg-thumb">
                    <!-- Sun -->
                    <circle cx="40" cy="40" r="18" fill="#FBBF24"/>
                    <!-- Arrow 1 -->
                    <path d="M65 40 H80" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
                    <path d="M76 34 L82 40 L76 46" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
                    <!-- Plant / Leaf -->
                    <circle cx="105" cy="40" r="18" fill="#DCFCE7" stroke="#16A34A" stroke-width="3"/>
                    <text x="105" y="47" font-size="18" text-anchor="middle">🍃</text>
                    <!-- Arrow 2 -->
                    <path d="M105 65 V80" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
                    <!-- Frog / Creature -->
                    <circle cx="105" cy="105" r="18" fill="#FEF3C7" stroke="#D97706" stroke-width="3"/>
                    <text x="105" y="112" font-size="18" text-anchor="middle">🐛</text>
                    <!-- Arrow 3 -->
                    <path d="M130 105 H145" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
                    <!-- Eagle / Apex -->
                    <circle cx="165" cy="105" r="18" fill="#FEE2E2" stroke="#DC2626" stroke-width="3"/>
                    <text x="165" y="112" font-size="18" text-anchor="middle">🦅</text>
                </svg>
            `,
            runner: (container) => GameEngine.startFoodChain(container)
        },
        {
            id: 'human-organs',
            title: 'Human Body Organs Quest',
            category: 'biology',
            subjectLabel: 'Biology',
            icon: '🫀',
            color: '#E11D48',
            badge: 'Anatomy',
            difficulty: '⭐ Easy',
            description: 'Put vital organs like the brain, heart, lungs, and stomach into their proper locations inside the human body!',
            imageSvg: `
                <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-svg-thumb">
                    <!-- Silhouette Outline -->
                    <ellipse cx="100" cy="30" rx="16" ry="18" fill="#E2E8F0" stroke="#94A3B8" stroke-width="3"/>
                    <path d="M75 52 C75 48 85 46 100 46 C115 46 125 48 125 52 L130 115 C130 120 120 125 100 125 C80 125 70 120 70 115 Z" fill="#F1F5F9" stroke="#94A3B8" stroke-width="3"/>
                    <!-- Brain in head -->
                    <text x="100" y="36" font-size="18" text-anchor="middle">🧠</text>
                    <!-- Heart & Lungs in chest -->
                    <text x="92" y="70" font-size="16" text-anchor="middle">❤️</text>
                    <text x="110" y="70" font-size="16" text-anchor="middle">🫁</text>
                    <!-- Stomach -->
                    <text x="100" y="100" font-size="16" text-anchor="middle">🫄</text>
                </svg>
            `,
            runner: (container) => GameEngine.startHumanOrgans(container)
        },
        {
            id: 'master-quiz',
            title: 'SciChamp Master Trivia',
            category: 'all',
            subjectLabel: 'All Sciences',
            icon: '🏆',
            color: '#7C3AED',
            badge: 'Grand Trivia',
            difficulty: '⭐⭐⭐ Challenge',
            description: 'Test your knowledge across Chemistry, Physics, and Biology! Use the 50:50 lifeline and build up score streaks.',
            imageSvg: `
                <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" class="game-svg-thumb">
                    <circle cx="100" cy="70" r="50" fill="#EDE9FE"/>
                    <!-- Trophy -->
                    <text x="100" y="80" font-size="52" text-anchor="middle">🏆</text>
                    <!-- Floating mini-badges -->
                    <text x="45" y="45" font-size="20">🧪</text>
                    <text x="150" y="45" font-size="20">⚡</text>
                    <text x="50" y="105" font-size="20">🌱</text>
                    <text x="145" y="105" font-size="20">🚀</text>
                </svg>
            `,
            runner: (container) => GameEngine.startMasterQuiz(container)
        }
    ],

    init() {
        this.loadUserData();
        this.renderCatalog();
        this.bindEvents();
        this.displayRandomFact();
        this.updateStarDisplay();
    },

    loadUserData() {
        const savedStars = localStorage.getItem('scichamp_stars');
        if (savedStars !== null) {
            this.stars = parseInt(savedStars) || 0;
        }
    },

    addStars(count) {
        this.stars += count;
        localStorage.setItem('scichamp_stars', this.stars);
        this.updateStarDisplay();
    },

    updateStarDisplay() {
        const starEl = document.getElementById('user-stars-count');
        if (starEl) {
            starEl.textContent = this.stars;
        }
        const badgeTier = document.getElementById('badge-rank');
        if (badgeTier) {
            if (this.stars >= 50) badgeTier.textContent = '🌟 Science Grand Champion';
            else if (this.stars >= 30) badgeTier.textContent = '🚀 Senior Lab Specialist';
            else if (this.stars >= 15) badgeTier.textContent = '🔬 Junior Scientist';
            else badgeTier.textContent = '🌱 Curious Explorer';
        }
    },

    displayRandomFact() {
        const factText = document.getElementById('ticker-fact-text');
        if (factText && SCI_DATA.facts.length > 0) {
            const randomFact = SCI_DATA.facts[Math.floor(Math.random() * SCI_DATA.facts.length)];
            factText.textContent = randomFact;
        }
    },

    renderCatalog() {
        const grid = document.getElementById('games-grid');
        if (!grid) return;

        let filtered = this.games;
        if (this.currentFilter !== 'all') {
            filtered = this.games.filter(g => g.category === this.currentFilter || g.category === 'all');
        }

        const searchQuery = (document.getElementById('search-games')?.value || '').toLowerCase().trim();
        if (searchQuery) {
            filtered = filtered.filter(g =>
                g.title.toLowerCase().includes(searchQuery) ||
                g.description.toLowerCase().includes(searchQuery) ||
                g.subjectLabel.toLowerCase().includes(searchQuery)
            );
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="empty-search-state">
                    <div class="empty-icon">🔍</div>
                    <h3>No games match your search</h3>
                    <p>Try searching for Chemistry, Physics, Biology, or clear your filter!</p>
                    <button class="btn btn-secondary mt-2" id="btn-clear-search">Show All Games</button>
                </div>
            `;
            document.getElementById('btn-clear-search')?.addEventListener('click', () => {
                document.getElementById('search-games').value = '';
                this.currentFilter = 'all';
                this.updateFilterButtons();
                this.renderCatalog();
            });
            return;
        }

        grid.innerHTML = filtered.map(game => `
            <div class="game-card" data-category="${game.category}">
                <div class="card-thumb-area">
                    <span class="card-subject-tag tag-${game.category}">${game.subjectLabel}</span>
                    <span class="card-diff-tag">${game.difficulty}</span>
                    ${game.imageSvg}
                </div>
                <div class="card-body">
                    <h3 class="card-title">${game.title}</h3>
                    <p class="card-desc">${game.description}</p>
                    <div class="card-footer">
                        <button class="btn btn-primary btn-play-now" data-game-id="${game.id}">
                            <span>▶ Play Now</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Bind Play Now buttons
        grid.querySelectorAll('.btn-play-now').forEach(btn => {
            btn.addEventListener('click', () => {
                const gameId = btn.getAttribute('data-game-id');
                window.sounds.click();
                this.launchGame(gameId);
            });
        });
    },

    updateFilterButtons() {
        document.querySelectorAll('.filter-pill').forEach(pill => {
            if (pill.getAttribute('data-filter') === this.currentFilter) {
                pill.classList.add('pill-active');
            } else {
                pill.classList.remove('pill-active');
            }
        });
    },

    bindEvents() {
        // Filter pills
        document.querySelectorAll('.filter-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                window.sounds.click();
                this.currentFilter = pill.getAttribute('data-filter');
                this.updateFilterButtons();
                this.renderCatalog();
            });
        });

        // Search input
        const searchInput = document.getElementById('search-games');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                this.renderCatalog();
            });
        }

        // Close game modal button
        document.getElementById('btn-close-modal')?.addEventListener('click', () => {
            window.sounds.click();
            this.closeGameModal();
        });

        // Sound Mute Toggle
        const soundBtn = document.getElementById('btn-toggle-sound');
        if (soundBtn) {
            const updateSoundBtnIcon = () => {
                soundBtn.innerHTML = window.sounds.muted ? '<span>🔇 Sound: OFF</span>' : '<span>🔊 Sound: ON</span>';
            };
            updateSoundBtnIcon();

            soundBtn.addEventListener('click', () => {
                window.sounds.toggleMute();
                updateSoundBtnIcon();
            });
        }

        // Random Fact Shuffle Button
        document.getElementById('btn-shuffle-fact')?.addEventListener('click', () => {
            window.sounds.click();
            this.displayRandomFact();
        });

        // ESC key closes modal
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeGameModal();
            }
        });
    },

    launchGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (!game) return;

        this.currentActiveGameId = gameId;
        const modal = document.getElementById('game-modal');
        const modalContainer = document.getElementById('game-mount-point');

        modalContainer.innerHTML = '';
        modal.classList.add('modal-visible');
        document.body.style.overflow = 'hidden';

        // Run game runner
        game.runner(modalContainer);
    },

    closeGameModal() {
        const modal = document.getElementById('game-modal');
        modal.classList.remove('modal-visible');
        document.body.style.overflow = '';
        const modalContainer = document.getElementById('game-mount-point');
        modalContainer.innerHTML = '';
        this.currentActiveGameId = null;
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
