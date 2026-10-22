// SciChamp Confetti Particle System
// High performance, lightweight canvas celebration effects

class ConfettiSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.isActive = false;
    }

    init() {
        if (this.canvas) return;
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'scichamp-confetti-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '99999';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    fire(options = {}) {
        this.init();
        const count = options.count || 75;
        const colors = options.colors || ['#FF6B6B', '#4ECDC4', '#FFE66D', '#1A535C', '#FF9F1C', '#A06CD5', '#2EC4B6'];

        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: window.innerWidth * (0.2 + Math.random() * 0.6),
                y: window.innerHeight * 0.4 + (Math.random() * 80 - 40),
                vx: (Math.random() - 0.5) * 14,
                vy: (Math.random() - 0.8) * 16,
                size: Math.random() * 8 + 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 12,
                shape: Math.random() > 0.4 ? 'rect' : 'circle',
                gravity: 0.35,
                opacity: 1,
                decay: 0.008 + Math.random() * 0.008
            });
        }

        if (!this.isActive) {
            this.isActive = true;
            this.loop();
        }
    }

    loop() {
        if (!this.particles.length) {
            this.isActive = false;
            if (this.ctx) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.98;
            p.rotation += p.rotationSpeed;
            p.opacity -= p.decay;

            if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.globalAlpha = Math.max(0, p.opacity);
            this.ctx.fillStyle = p.color;

            if (p.shape === 'rect') {
                this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
            }

            this.ctx.restore();
        }

        this.animationId = requestAnimationFrame(() => this.loop());
    }
}

window.confetti = new ConfettiSystem();
