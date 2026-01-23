"use client";

import { useState, useRef } from "react";

export default function QueryRace() {
  const [racing, setRacing] = useState(false);
  const [highCardProgress, setHighCardProgress] = useState(0);
  const [lowCardDone, setLowCardDone] = useState(false);
  
  // Animation loop
  const requestRef = useRef<number>(0);

  const start = () => {
    if (racing) return;
    setRacing(true);
    setHighCardProgress(0);
    setLowCardDone(false);

    // Low card finishes "instantly" after a tiny delay to show the jump
    setTimeout(() => setLowCardDone(true), 150);

    // High card is slow linear scan
    const startTime = Date.now();
    const duration = 4000; // 4 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setHighCardProgress(progress * 100);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setRacing(false);
      }
    };
    
    requestRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-12">
      <div className="flex flex-col gap-12">
        {/* Scenario 1: Index Lookup */}
        <div className="relative">
          <div className="flex justify-between items-end mb-2">
            <h4 className="text-zinc-100 font-semibold">
              Low Cardinality Query
              <span className="text-zinc-400 font-normal ml-2 text-sm">(Indexed Lookup)</span>
            </h4>
            <span className={`text-sm font-bold transition-all ${lowCardDone ? "text-green-500 scale-110" : "text-zinc-500"}`}>
              {lowCardDone ? "0.05ms" : "Waiting..."}
            </span>
          </div>
          
          <div className="h-12 bg-zinc-800 rounded-lg relative overflow-hidden flex items-center px-4">
             {/* Index Visual: Just a few sorted blocks */}
             <div className="flex gap-1 opacity-50 w-full">
                {Array.from({length: 20}).map((_, i) => (
                  <div key={i} className="flex-1 h-6 bg-zinc-600 rounded-sm" />
                ))}
             </div>
             
             {/* The "JUMP" cursor */}
             <div className={`absolute top-0 bottom-0 w-8 bg-green-900/40 border-l-2 border-r-2 border-green-500 transition-all duration-200 flex items-center justify-center
                 ${lowCardDone ? "left-[40%]" : "left-0"}`}
             >
                {lowCardDone && <span className="text-xs font-bold text-green-400">FOUND</span>}
             </div>
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            The database jumps directly to the bucket. It doesn't scan everything.
          </p>
        </div>

        {/* Scenario 2: Full Scan */}
        <div className="relative">
          <div className="flex justify-between items-end mb-2">
            <h4 className="text-zinc-100 font-semibold">
              High Cardinality Query
              <span className="text-zinc-400 font-normal ml-2 text-sm">(Full Scan)</span>
            </h4>
             <span className={`text-sm font-bold transition-all ${highCardProgress === 100 ? "text-red-500" : "text-zinc-500"}`}>
              {racing ? `${(highCardProgress * 15).toFixed(0)}ms` : highCardProgress === 100 ? "1500ms" : "Waiting..."}
            </span>
          </div>
          
          <div className="h-12 bg-zinc-800 rounded-lg relative overflow-hidden flex items-center">
             {/* Scan Visual: Millions of tiny lines */}
             <div className="w-full h-full flex" style={{backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, #3f3f46 2px, #3f3f46 4px)"}}>
             </div>

             {/* The "SCAN" cursor */}
             <div 
               className="absolute top-0 bottom-0 bg-red-900/30 border-r-2 border-red-500"
               style={{ width: `${highCardProgress}%` }}
             >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white">
                  🔍
                </div>
             </div>
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            The database must check every single index entry because there are too many unique values to group effectively.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={start}
          disabled={racing}
          className={`px-8 py-3 rounded-full font-bold text-sm transition-all shadow-sm ${
            racing 
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
              : "bg-zinc-100 text-zinc-900 hover:scale-105 active:scale-95"
          }`}
        >
          {racing ? "Scanning..." : "Start Race"}
        </button>
      </div>
    </div>
  );
}
