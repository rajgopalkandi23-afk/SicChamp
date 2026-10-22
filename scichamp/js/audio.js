// SciChamp Web Audio API Sound Effects Synthesizer
// Completely self-contained, no external mp3 files required!

class SoundController {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.initOnFirstInteraction = this.initOnFirstInteraction.bind(this);
        
        // Listen for first user interaction to resume/create AudioContext (browser policy)
        ['click', 'touchstart', 'keydown'].forEach(evt => {
            window.addEventListener(evt, this.initOnFirstInteraction, { once: true });
        });

        // Load mute state from localStorage
        const savedMute = localStorage.getItem('scichamp_muted');
        if (savedMute !== null) {
            this.muted = savedMute === 'true';
        }
    }

    initOnFirstInteraction() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('scichamp_muted', this.muted);
        return this.muted;
    }

    playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.15, pitchDrop = 0) {
        if (this.muted) return;
        this.initOnFirstInteraction();
        if (!this.ctx) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;

            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            if (pitchDrop !== 0) {
                osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq + pitchDrop), now + duration);
            }

            gain.gain.setValueAtTime(gainVal, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + duration);
        } catch (e) {
            // Audio context might be restricted
        }
    }

    // Sound effect: Button Click / Pop
    click() {
        this.playTone(480, 'sine', 0.08, 0.12, 100);
    }

    // Sound effect: Drag item picked up
    pickup() {
        this.playTone(320, 'triangle', 0.1, 0.15, 120);
    }

    // Sound effect: Correct answer / item dropped successfully
    correct() {
        if (this.muted) return;
        this.initOnFirstInteraction();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const start = now + idx * 0.06;

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, start);

                gain.gain.setValueAtTime(0.12, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(start);
                osc.stop(start + 0.18);
            });
        } catch (e) {}
    }

    // Sound effect: Wrong answer / gentle boop
    wrong() {
        if (this.muted) return;
        this.initOnFirstInteraction();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            [220, 185].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const start = now + idx * 0.12;

                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, start);

                gain.gain.setValueAtTime(0.1, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 0.15);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(start);
                osc.stop(start + 0.15);
            });
        } catch (e) {}
    }

    // Sound effect: Chemical reaction bubble / fizz
    fizz() {
        if (this.muted) return;
        this.initOnFirstInteraction();
        if (!this.ctx) return;

        try {
            // Rapid small bubbling blips
            const now = this.ctx.currentTime;
            for (let i = 0; i < 6; i++) {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const start = now + i * 0.04 + (Math.random() * 0.02);
                const freq = 400 + Math.random() * 600;

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, start);
                osc.frequency.exponentialRampToValueAtTime(freq + 200, start + 0.06);

                gain.gain.setValueAtTime(0.08, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + 0.06);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(start);
                osc.stop(start + 0.06);
            }
        } catch (e) {}
    }

    // Sound effect: Electric spark / circuit buzz
    spark() {
        if (this.muted) return;
        this.initOnFirstInteraction();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.linearRampToValueAtTime(1200, now + 0.1);

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.15);
        } catch (e) {}
    }

    // Sound effect: Rocket Launch whoosh
    launch() {
        if (this.muted) return;
        this.initOnFirstInteraction();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.35);

            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.4);
        } catch (e) {}
    }

    // Sound effect: Game victory celebration fanfare!
    victory() {
        if (this.muted) return;
        this.initOnFirstInteraction();
        if (!this.ctx) return;

        try {
            const now = this.ctx.currentTime;
            // Fanfare notes: G4, C5, E5, G5
            const fanfare = [
                { f: 392.00, d: 0.12, offset: 0 },
                { f: 523.25, d: 0.12, offset: 0.12 },
                { f: 659.25, d: 0.12, offset: 0.24 },
                { f: 783.99, d: 0.35, offset: 0.36 }
            ];

            fanfare.forEach(note => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                const start = now + note.offset;

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(note.f, start);

                gain.gain.setValueAtTime(0.18, start);
                gain.gain.exponentialRampToValueAtTime(0.001, start + note.d);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(start);
                osc.stop(start + note.d);
            });
        } catch (e) {}
    }
}

// Global Sound Instance
window.sounds = new SoundController();
