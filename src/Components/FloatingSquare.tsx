import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

const FloatingSquare = () => {
  const squareSize = 50; // Set the size of the square

  // Create state for the square's position
  const [position, setPosition] = useState({
    x: Math.random() * (window.innerWidth - squareSize),
    y: Math.random() * (window.innerHeight - squareSize),
  });

  // Create state for the square's direction
  const [direction, setDirection] = useState({
    x: Math.random() > 0.5 ? 1 : -1,
    y: Math.random() > 0.5 ? 1 : -1,
  });

  // Initialize a ref for the interval
  const intervalRef = useRef<number | null>(null);

  // Use react-spring to animate the square's position and rotation
  const { x, y, rotate } = useSpring({
    from: { x: position.x, y: position.y, rotate: 0 },
    to: { x: position.x, y: position.y, rotate: 360 },
    config: { duration: 5000 },
    reset: true,
  });

  // Set up an effect to update the square's position and direction
  useEffect(() => {
    const updatePosition = () => {
      setPosition((prevPosition) => {
        let newPosition = { ...prevPosition };

        // Update position based on direction
        newPosition.x += direction.x;
        newPosition.y += direction.y;

        // Check for collision with window edges and update direction if necessary
        if (newPosition.x <= 0 || newPosition.x + squareSize >= window.innerWidth) {
          setDirection((prevDirection) => ({ ...prevDirection, x: -prevDirection.x }));
        }

        if (newPosition.y <= 0 || newPosition.y + squareSize >= window.innerHeight) {
          setDirection((prevDirection) => ({ ...prevDirection, y: -prevDirection.y }));
        }

        return newPosition;
      });
    };

    // Start the interval
    intervalRef.current = window.setInterval(updatePosition, 50);

    // Clean up the interval on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [direction, squareSize]);

  return (
    <animated.div
      style={{
        position: 'absolute',
        width: squareSize,
        height: squareSize,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Set the color of the square
        left: x.to((xVal) => `${xVal}px`),
        top: y.to((yVal) => `${yVal}px`),
        transform: rotate.to((rotateVal) => `rotate(${rotateVal}deg)`),
      }}
    />
  );
};

export default FloatingSquare;
