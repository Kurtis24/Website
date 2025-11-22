"use client";

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const prevPos = useRef({ x: 0, y: 0 });
  const points = useRef([]);

  useEffect(() => {
    const cursor = cursorRef.current;

    // Create canvas for lightning effect
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9997;
    `;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let animationFrame;

    const drawLightning = (x1, y1, x2, y2, displace, ctx) => {
      if (displace < 2) {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      } else {
        let midX = (x1 + x2) / 2;
        let midY = (y1 + y2) / 2;

        midX += (Math.random() - 0.5) * displace;
        midY += (Math.random() - 0.5) * displace;

        drawLightning(x1, y1, midX, midY, displace / 2, ctx);
        drawLightning(midX, midY, x2, y2, displace / 2, ctx);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add current position to points
      const dx = mousePos.current.x - prevPos.current.x;
      const dy = mousePos.current.y - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 2) {
        points.current.push({
          x: mousePos.current.x,
          y: mousePos.current.y,
          life: 1,
          speed: speed
        });
      }

      // Limit points
      if (points.current.length > 20) {
        points.current.shift();
      }

      // Draw lightning trails
      if (points.current.length > 1) {
        for (let i = 1; i < points.current.length; i++) {
          const p1 = points.current[i - 1];
          const p2 = points.current[i];

          const alpha = p2.life * 0.8;
          const intensity = Math.min(p2.speed / 10, 1);

          // Main lightning bolt
          ctx.beginPath();
          ctx.strokeStyle = `rgba(200, 230, 201, ${alpha})`;
          ctx.lineWidth = 2 + intensity * 2;
          ctx.shadowColor = 'rgba(200, 230, 201, 0.8)';
          ctx.shadowBlur = 15 + intensity * 10;

          drawLightning(p1.x, p1.y, p2.x, p2.y, 15 + intensity * 10, ctx);
          ctx.stroke();

          // Inner glow
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
          ctx.lineWidth = 1;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.shadowBlur = 5;

          drawLightning(p1.x, p1.y, p2.x, p2.y, 8, ctx);
          ctx.stroke();
        }
      }

      // Decay points
      points.current.forEach(p => {
        p.life -= 0.05;
      });

      // Remove dead points
      points.current = points.current.filter(p => p.life > 0);

      prevPos.current = { ...mousePos.current };
      animationFrame = requestAnimationFrame(animate);
    };

    const moveCursor = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (cursor) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
      }
    };

    const handleMouseEnter = () => {
      if (cursor) cursor.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.style.opacity = '0';
      points.current = [];
    };

    const handleMouseOver = (e) => {
      if (cursor && (e.target.tagName === 'BUTTON' || e.target.tagName === 'A')) {
        cursor.style.transform = 'scale(1.5)';
      }
    };

    const handleMouseOut = () => {
      if (cursor) cursor.style.transform = 'scale(1)';
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    animationFrame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);

      if (canvasRef.current && canvasRef.current.parentNode) {
        canvasRef.current.parentNode.removeChild(canvasRef.current);
      }
    };
  }, []);

  return <div ref={cursorRef} className="cursor-trail" />;
}
