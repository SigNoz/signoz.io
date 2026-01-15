"use client";

import { useState, useEffect } from "react";

interface Label {
  name: string;
  values: string[];
  cardinality: number;
}

const LABELS: Label[] = [
  { name: "method", values: ["GET", "POST", "PUT", "DELETE"], cardinality: 4 },
  { name: "status", values: ["200", "400", "500", "201", "404"], cardinality: 50 },
  { name: "host", values: ["server-1", "server-2", "server-3", "..."], cardinality: 100 },
  { name: "user_id", values: ["u_123", "u_456", "..."], cardinality: 1000000 },
];

function formatNumber(num: number): string {
  if (num >= 1e12) return (num / 1e12).toFixed(1) + " Trillion";
  if (num >= 1e9) return (num / 1e9).toFixed(1) + " Billion";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + " Million";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + " Thousand";
  return num.toString();
}

export default function CardinalityExplosion() {
  const [activeLabels, setActiveLabels] = useState<Set<number>>(new Set([0])); // Default to just first label

  const toggleLabel = (index: number) => {
    setActiveLabels(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const activeLabelsArray = LABELS.filter((_, index) => activeLabels.has(index));
  const totalCardinality = activeLabelsArray.reduce(
    (acc, label) => acc * label.cardinality,
    1
  );

  const isOOM = totalCardinality > 1e9;
  const hasUserIdActive = activeLabels.has(3); // user_id is at index 3

  return (
    <div className="w-full max-w-3xl mx-auto my-16">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left: Interactive Controls */}
        <div className="flex-1 w-full relative">
           <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-zinc-800 via-blue-900 to-red-900" />
           
           <div className="space-y-6 pl-3 md:pl-6">
             {LABELS.map((label, index) => {
               const isActive = activeLabels.has(index);
               return (
                 <div 
                   key={label.name}
                   onClick={() => toggleLabel(index)}
                   className={`cursor-pointer group transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-60 translate-x-[-4px]"}`}
                 >
                   <div className="flex items-center gap-3">
                     <div className={`w-3 h-3 rounded-full border-2 transition-all ${
                        isActive 
                          ? index === 3 ? "bg-red-500 border-red-500" : "bg-blue-600 border-blue-600" 
                          : "bg-black border-zinc-600 group-hover:border-zinc-400"
                     }`} />
                     <div>
                       <div className={`font-mono text-sm ${isActive ? "text-zinc-100 font-bold" : "text-zinc-300"}`}>
                         {label.name}
                       </div>
                       <div className="text-xs text-zinc-400">
                         {formatNumber(label.cardinality)} values
                       </div>
                     </div>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

        {/* Right: The Explosion Reveal */}
        <div className="flex-1 w-full text-center md:text-left">
           <div className="relative inline-block">
              {/* Animated Number */}
              <div className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight transition-all duration-500 ${
                 isOOM ? "text-red-500" : activeLabels.size > 1 ? "text-blue-500" : "text-zinc-100"
              }`}>
                {activeLabels.size === 0 ? "0" : formatNumber(totalCardinality)}
              </div>
              
              <div className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mt-2">
                Total Time Series
              </div>

              {/* Multiplier Visual */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start text-xs font-mono text-zinc-500">
                 {activeLabelsArray.map((l, i) => (
                    <span key={l.name} className="flex items-center">
                       {i > 0 && <span className="mx-2 text-zinc-600">×</span>}
                       <span className={l.name === "user_id" ? "text-red-400 font-bold" : ""}>
                         {formatNumber(l.cardinality)}
                       </span>
                    </span>
                 ))}
                 {activeLabels.size > 0 && (
                   <>
                     <span className="mx-2 text-zinc-600">=</span>
                     <span className="font-bold text-zinc-100">?</span>
                   </>
                 )}
              </div>
              
              {isOOM && (
                <div className="mt-6 text-left text-sm text-zinc-400">
                   <strong className="text-red-400 block mb-1">⚠️ Cardinality Explosion Detected</strong>
                   Adding a high-cardinality label like <code className="text-zinc-300">user_id</code> multiplied your series count by 1 Million. This creates billions of unique combinations.
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
