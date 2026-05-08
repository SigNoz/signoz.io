import { Atom } from "lucide-react";

export const ANALYZE_REQUEST_FLOW_CARDS = [
  {
    icon: (
      <Atom />
    ),
    title: "Step Transition Analysis",
    description: "Compare performance between different step transitions. See if Step 1→2 takes 100ms while Step 2→3 takes 1ms across all matching traces."
  },
  {
    icon: (
      <Atom />
    ),
    title: "Error Clustering",
    description: "View which step transitions generate how many errors and see the trace IDs causing failures at each transition point.."
  },
  {
    icon: (
      <Atom />
    ),
    title: "Conversion Tracking",
    description: "See what percentage of traces complete each step. A 32% drop between steps reveals systematic problems, not isolated incidents."
  }
];
