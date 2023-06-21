import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

// Square component with continuous rotation
const AnimatedSquare: React.FC<{ size: number, rotation: number, position: any }> = 
    ({ size, rotation, position }) => {
  const { x, y } = useSpring({
    from: { x: 0, y: 0 },
    to: { x: 1, y: position.top },
    config: { duration: rotation },
    loop: true
  });

  return (
    <animated.div
      style={{
        width: size,
        height: size,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        position: 'absolute',
        top: y.to((y : any) => `${y}px`),
        left: position.left,
        transform: x.to({
          range: [0, 100],
          output: ["0deg", "360deg"]
        }).to(value => `rotate(${value})`),
        willChange: 'transform, top'
      }}
    />
  );
};

const BackgroundSquares: React.FC = ({ children }: PropsWithChildren) => {
  const [scrollY, setScrollY] = useState(0);

  // Listen to scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const position = {
    top: window.innerHeight * 0.65 + scrollY,
    left: window.innerWidth * 0.65
  };

  return (
    <div style={{ position: 'absolute', height: '100vh' }}>
      <AnimatedSquare size={50} rotation={20000} position={position} />
      <AnimatedSquare size={50} rotation={25000} position={position} />
      <AnimatedSquare size={50} rotation={30000} position={position} />
      {children}
    </div>
  );
};

export default BackgroundSquares;
