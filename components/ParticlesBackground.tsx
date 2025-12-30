
import React, { useEffect, useRef } from 'react';

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 150;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const colors = [
      '#FF61D2', // 霓虹粉
      '#FEFFAC', // 嫩黄
      '#61E5FF', // 亮蓝
      '#97FFB8', // 薄荷绿
      '#FFB861'  // 暖橙
    ];

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      angle: number;
      velocity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.velocity = Math.random() * 0.02;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // 银河发光感
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
      }

      update() {
        // 模拟缓慢的星河漂流
        this.angle += this.velocity;
        this.x += Math.cos(this.angle) * 0.3 + this.speedX;
        this.y += Math.sin(this.angle) * 0.3 + this.speedY;

        // 边界处理
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // 鼠标排斥互动
        let dx = mouse.current.x - this.x;
        let dy = mouse.current.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const force = (100 - distance) / 100;
          const dirX = dx / distance;
          const dirY = dy / distance;
          this.x -= dirX * force * 5;
          this.y -= dirY * force * 5;
        }
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // 拖尾效果营造流动感
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.current.x = e.touches[0].clientX;
        mouse.current.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default ParticlesBackground;
