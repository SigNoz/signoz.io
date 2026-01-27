"use client";

import { useState } from "react";

export default function MemoryGauge() {
  // Slider value: 0 to 100
  // Maps to Users: 0 to 1,000,000 (Exponentialish)
  const [sliderVal, setSliderVal] = useState(1);

  // Current Users Calculation
  // Linear Scale: 1,000 to 100,000 for cleaner 1:1 visualization
  const getUsers = (val: number) => {
    // val is 0-100
    // min = 1,000
    // max = 800,000 (roughly enough to cause ~16GB memory with 5 series/user * 4KB)
    // 800,000 * 5 * 4KB = 16,000,000 KB = 16 GB
    
    const minUsers = 1000;
    const maxUsers = 900000;
    
    return Math.floor(minUsers + (val / 100) * (maxUsers - minUsers));
  };

  const users = getUsers(sliderVal);
  
  // Series = Users * 5 (representing other labels like method, status)
  const seriesPerUser = 5; 
  const totalSeries = users * seriesPerUser;
  
  // Memory = Series * 4KB
  const memoryBytes = totalSeries * 4096;
  const memoryMB = memoryBytes / (1024 * 1024);
  const memoryGB = memoryMB / 1024;
  
  // Max Memory for visually filling the container (e.g., 16GB limit)
  const maxMemoryGB = 16;
  const fillPercentage = Math.min((memoryGB / maxMemoryGB) * 100, 100);
  
  const isOOM = memoryGB > 16; // Crash threshold exactly at limit

  return (
    <div className="w-full max-w-4xl mx-auto my-16 font-sans">
      
      {/* Main Container - Integrated look, less boxy */}
      <div className="flex flex-col md:flex-row items-end gap-8 md:gap-12 mb-12 px-2 md:px-12">
        
        {/* Left: Stats */}
        <div className="flex-1 space-y-6 md:space-y-8 pb-4">
           <div>
             <div className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-1">Total Users</div>
             <div className="text-3xl md:text-4xl font-bold text-zinc-100 tabular-nums">
               {users.toLocaleString()}
             </div>
           </div>
           
           <div>
             <div className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-1">Active Series</div>
             <div className={`text-3xl md:text-4xl font-bold tabular-nums transition-colors duration-300 ${isOOM ? "text-red-500" : "text-zinc-100"}`}>
               {totalSeries.toLocaleString()}
             </div>
             <div className="text-xs text-zinc-400 mt-2">
               Users × Labels = Series
             </div>
           </div>

           {isOOM && (
              <div className="bg-red-900/20 text-red-300 px-4 py-3 rounded-lg border border-red-900 text-sm font-medium animate-pulse">
                💥 <strong>OOM Killed!</strong><br/>
                Server ran out of memory and crashed.
              </div>
           )}
        </div>

        {/* Right: The RAM Tank */}
        <div className="relative w-full md:w-auto flex flex-col items-center md:block">
           {/* Tank Container */}
           <div className="w-24 md:w-32 h-64 border-2 border-zinc-800 rounded-lg relative overflow-hidden bg-zinc-900">
             {/* Fluid */}
             <div 
               className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ease-out ${isOOM ? "bg-red-600" : "bg-blue-600"}`}
               style={{ height: `${fillPercentage}%` }}
             >
                {/* Surface line */}
                <div className="w-full h-1 bg-white/10 absolute top-0" />
             </div>
             
             {/* Markers */}
             <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col justify-between py-2 text-[10px] text-zinc-400 font-mono text-right pr-1 border-l border-zinc-700/50">
                <span>16GB</span>
                <span>12GB</span>
                <span>8GB</span>
                <span>4GB</span>
                <span>0GB</span>
             </div>
           </div>
           
           <div className="text-center mt-3 font-mono font-bold text-zinc-300">
             {memoryGB >= 1 ? memoryGB.toFixed(1) + " GB" : memoryMB.toFixed(0) + " MB"}
           </div>
           <div className="text-center text-xs text-zinc-400 uppercase tracking-wider mt-1">RAM Usage</div>
        </div>
      </div>

      {/* Full Width Slider Control */}
      <div className="bg-zinc-900 rounded-xl p-4 md:p-8 border border-zinc-800">
         <div className="flex justify-between items-end mb-4">
            <label className="text-sm font-bold text-zinc-300 uppercase tracking-wider">
               Scale Users (Cardinality)
            </label>
            <span className="text-xs text-zinc-400 font-mono">
               1k → 900k Users
            </span>
         </div>
         
         <div className="relative h-6 flex items-center">
            {/* Track */}
            <div className="absolute left-0 right-0 h-2 bg-gradient-to-r from-blue-900 via-purple-900 to-red-900 rounded-full" />
            
            {/* Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="w-full absolute z-10 opacity-0 cursor-pointer h-full"
            />
            
            {/* Thumb Visual */}
            <div 
               className="absolute w-6 h-6 bg-zinc-200 border-2 border-zinc-600 rounded-full shadow-md pointer-events-none transition-all duration-75"
               style={{ left: `${sliderVal}%`, transform: 'translateX(-50%)' }}
            >
               <div className={`w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isOOM ? "bg-red-500" : "bg-blue-500"}`} />
            </div>
         </div>
         
         <p className="text-center text-zinc-300 text-sm mt-6 italic">
           Drag to increase users. Watch how RAM fills up linearly with the exploding series count.
         </p>
      </div>
    </div>
  );
}
