"use client"
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface SlotMachineProps {
  options: string[];
}

const SlotMachine: React.FC<SlotMachineProps> = ({ options }) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const speed = useRef({ value: 0 });
  const y = useRef(0);
  const picHeight = 400;
  const len = options.length;
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      if (!wheelRef.current) return;
  
      y.current += speed.current.value;
      const totalHeight = picHeight * len;
      const resetPoint = totalHeight * 2;
      const translateY = -1 * (y.current % resetPoint);
      wheelRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
  
      if (isSpinning) {
        animationFrameId.current = requestAnimationFrame(update);
      }
    };
  
    if (isSpinning) {
        update();
      } else if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      };
    }, [isSpinning, picHeight, len]);

  const start = () => {
    setIsSpinning(true);
    gsap.to(speed.current, {
      value: 30, 
      duration: 5,
      ease: 'expo.out',
    });
  };

  const stop = () => {
    gsap.to(speed.current, {
      value: 0,
      duration: 5,
      ease: 'expo.out',
      onComplete: () => {
        setIsSpinning(false); 
        const offsetY = y.current % picHeight;
        const adjustY = offsetY > (picHeight / 2) ? picHeight - offsetY : -offsetY;
        y.current += adjustY;
        if (wheelRef.current) {
          const translateY = -1 * (y.current % (picHeight * len * 3));
          wheelRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
        }
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center my-10 p-5 w-[1400px] border-gray-600 rounded-2xl border-4">
    <div className="slot-machine h-[500px] w-[1300px] flex justify-center overflow-hidden relative border-2 rounded-2xl border-blue-800">
        <div className="js-slot_wheel_inner flex flex-col" ref={wheelRef}>
        {[...Array(len * 3)].map((_, index) => (
            <div key={index} className="text-6xl text-white font-bold h-[400px] flex items-center justify-center border-y-8 bg-black border-gray-200">
            {options[index % len]}
            </div>
        ))}
        </div>
    </div>
    <div className="flex justify-center mt-10">
        <button onClick={start} className="mr-10 bg-blue-500 hover:bg-blue-700 text-white text-2xl font-bold py-2 px-4 rounded">Start</button>
        <button onClick={stop} className="bg-red-500 hover:bg-red-700 text-white text-2xl  font-bold py-2 px-4 rounded">Stop</button>
    </div>
    </div>
  );
};

export default SlotMachine;