'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ScrollAnimationProps {
 images: string[];
}

export default function ScrollAnimation({
 images,
}: ScrollAnimationProps) {
 const [frameIndex, setFrameIndex] = useState(0);
 const sectionRef = useRef<HTMLDivElement>(null);
 const frameCount = images.length;

 // Sync scroll with frame index
 useEffect(() => {
  const handleScroll = () => {
   if (!sectionRef.current || frameCount === 0) return;

   const section = sectionRef.current;
   const rect = section.getBoundingClientRect();

   const scrollPosition = -rect.top;
   const totalScrollable = rect.height - window.innerHeight;

   const progress = Math.max(0, Math.min(1, scrollPosition / totalScrollable));

   // Map progress to frame index (0-based)
   const newFrameIndex = Math.max(0, Math.min(frameCount - 1, Math.floor(progress * (frameCount - 1))));

   if (newFrameIndex !== frameIndex) {
    setFrameIndex(newFrameIndex);
   }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  return () => window.removeEventListener('scroll', handleScroll);
 }, [frameCount, frameIndex]);

 if (frameCount === 0) {
  return <div className="h-screen flex items-center justify-center text-white">No images found in the specified folder.</div>;
 }

 return (
  <div
   ref={sectionRef}
   className="relative w-full h-[300vh] md:h-[500vh] bg-white"
  >
   <div className="sticky top-0 w-full h-screen overflow-hidden bg-white flex items-center justify-center p-2 md:p-4 lg:p-5">
    <div className="relative w-full h-full mx-auto overflow-hidden">
     {images.map((src, index) => {
      const isVisible = index === frameIndex;

      return (
       <div
        key={src}
        className="absolute inset-0"
        style={{
         opacity: isVisible ? 1 : 0,
         zIndex: isVisible ? 10 : 0,
         pointerEvents: isVisible ? 'auto' : 'none'
        }}
       >
        <div className="relative w-full h-full scale-150 md:scale-100 transition-transform duration-700">
         <Image
          src={src}
          alt={`Frame ${index}`}
          fill
          priority
          unoptimized
          className="object-contain"
         />
        </div>
       </div>
      );
     })}
    </div>


   </div>
  </div>
 );
}
