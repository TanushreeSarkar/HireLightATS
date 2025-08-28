'use client';

import { useEffect, useState, useRef } from 'react';

export function AnimatedCounter({ targetValue }: { targetValue: number }) {
  const [currentValue, setCurrentValue] = useState(0);
  const duration = 1500;
  const frameRate = 60;
  const totalFrames = duration / (1000 / frameRate);
  const valueRef = useRef(0);
  
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = easeOutCubic(frame / totalFrames);
      const newValue = Math.round(targetValue * progress);
      
      if(valueRef.current !== newValue) {
        valueRef.current = newValue;
        setCurrentValue(newValue);
      }

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, 1000 / frameRate);

    return () => {
      clearInterval(counter);
    };
  }, [targetValue]);

  return <span className="inline-block">{currentValue}</span>;
}
