
import React, { useEffect, useState } from 'react';

interface ConfettiAnimationProps {
  active: boolean;
}

const ConfettiAnimation = ({ active }: ConfettiAnimationProps) => {
  const [particles, setParticles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    // Create confetti particles
    const colors = ['#FFC700', '#FF0055', '#6157FF', '#00DDFF', '#00FF7F'];
    const newParticles = [];

    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 8 + 4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = Math.random() * 2 + 1;
      const delay = Math.random() * 0.5;

      newParticles.push(
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            animation: `confetti ${duration}s ease-out ${delay}s forwards`,
          }}
        />
      );
    }

    setParticles(newParticles);

    // Add keyframes for confetti animation
    if (!document.querySelector('#confetti-keyframes')) {
      const style = document.createElement('style');
      style.id = 'confetti-keyframes';
      style.innerHTML = `
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }, [active]);

  if (!active && particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles}
    </div>
  );
};

export default ConfettiAnimation;
