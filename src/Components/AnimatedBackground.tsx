import React, { PropsWithChildren, useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

interface AnimatedSquareProps {
  key: number;
  initialX: number;
  initialY: number;
  onEnd: () => void;
}

const AnimatedSquare: React.FC<AnimatedSquareProps> = ({ key, initialX, initialY, onEnd }) => {
  const randomSize = getRandomInt(20, 100);
  const randomRotation = getRandomInt(0, 360);
  // create a random to coordinate to animate to that is within the window
  let toCoordinateX = getRandomInt(0, window.innerWidth - 100);
  let toCoordinateY = getRandomInt(0, window.innerHeight - 100);

  // get midpoint between initial and to coordinates
  let midpointX = (initialX + toCoordinateX) / 2;
  let midpointY = (initialY + toCoordinateY) / 2;
  // divide rotation by 2 to make it smooth between the two points
  let midpointRotation = randomRotation / 2;
  
  const props = useSpring({
    from: { x: initialX, y: initialY, opacity: 0, rotateZ: '0deg', width: `${randomSize}px`, height: `${randomSize}px` },
    to: [
      { x: midpointX, y: midpointY, opacity: 1, rotateZ: `${180}deg` },
      { x: toCoordinateX, y: toCoordinateY, opacity: 0, rotateZ: `${180}deg` }
    ],
    config: { duration: 5000 },
    onRest: onEnd
  });

  return (
    <animated.div
      style={{
        ...props,
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
      }}
    />
  );
};

const AnimatedBackground: React.FC = ({ children }: PropsWithChildren) => {
  const [queue, setQueue] = useState<{ id: number, initialX: number, initialY: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueue(prev => [...prev, {
        id: Date.now(),
        initialX: getRandomInt(0, window.innerWidth - 100),
        initialY: getRandomInt(0, window.innerHeight - 100)
      }]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleAnimationEnd = (id: number) => {
    setQueue(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div style={{ position: 'relative' }}>
      {queue.map(({ id, initialX, initialY }) => (
        <AnimatedSquare 
          key={id} 
          initialX={initialX} 
          initialY={initialY} 
          onEnd={() => handleAnimationEnd(id)}
        />
      ))}
      {children}
    </div>
  );
};

export default AnimatedBackground;

