class AnimatedBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.animationFrameId = null;

    this.init();
  }

  init() {
    this.resizeCanvas();
    this.createParticles();

    // Initial fill
    this.ctx.fillStyle = "#0a0a14";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.animate();

    window.addEventListener("resize", () => {
      this.resizeCanvas();
      this.createParticles();
    });
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 2,
      });
    }
  }

  drawParticle(particle) {
    const scale = 1000 / (1000 + particle.z);

    const x = particle.x * scale + this.canvas.width / 2 * (1 - scale);
    const y = particle.y * scale + this.canvas.height / 2 * (1 - scale);
    const radius = Math.max(1, 3 * scale);

    const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius * 2);

    gradient.addColorStop(0, `rgba(99, 102, 241, ${0.8 * scale})`);
    gradient.addColorStop(0.5, `rgba(168, 85, 247, ${0.4 * scale})`);
    gradient.addColorStop(1, "rgba(168, 85, 247, 0)");

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * scale})`;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dz = this.particles[i].z - this.particles[j].z;

        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < 150) {
          const scale1 = 1000 / (1000 + this.particles[i].z);
          const scale2 = 1000 / (1000 + this.particles[j].z);

          const x1 = this.particles[i].x * scale1 + this.canvas.width / 2 * (1 - scale1);
          const y1 = this.particles[i].y * scale1 + this.canvas.height / 2 * (1 - scale1);

          const x2 = this.particles[j].x * scale2 + this.canvas.width / 2 * (1 - scale2);
          const y2 = this.particles[j].y * scale2 + this.canvas.height / 2 * (1 - scale2);

          const opacity = (1 - distance / 150) * 0.2;

          this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          this.ctx.lineWidth = 0.5;

          this.ctx.beginPath();
          this.ctx.moveTo(x1, y1);
          this.ctx.lineTo(x2, y2);
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.fillStyle = "rgba(10, 10, 20, 0.1)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;

      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      if (particle.z < -500 || particle.z > 500) particle.vz *= -1;

      this.drawParticle(particle);
    });

    this.drawConnections();

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    cancelAnimationFrame(this.animationFrameId);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AnimatedBackground("animated-canvas");
});
