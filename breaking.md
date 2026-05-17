Stoplight bump — done ✅                                                                                                              
                                                        
  @stoplight/elements: ^8.5.0 → ^9.0.11 (resolves to 9.0.19). Audit unchanged at 14. node_modules/@stoplight/elements-core/package.json 
  now reports 9.0.19. Not yet committed.                                                                                                
                                                                                                                                        
  ---                                                                                                                                   
  Breaking changes — codebase-mapped checklist                                                                                          
                                                                                                                                        
  Next 14 → 15                                                                                                                          
                                                                                                                                        
  ┌────────────────────────┬─────────────────────────────────────────┬─────────────────────────────────────────────────────────────┐    
  │         Change         │              This codebase              │                           Action                            │    
  ├────────────────────────┼─────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤    
  │ params / searchParams  │ 18 page/route files use sync params: {  │ Run npx @next/codemod@canary next-async-request-api —       │    
  │ are now Promise<...>   │ ... }                                   │ automatic                                                   │    
  ├────────────────────────┼─────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤    
  │ cookies() / headers()  │ utils/growthbookServer.ts:24,33 — sync  │ Make resolveGrowthBookAnonymousId async, await both.        │    
  │ / draftMode() are      │ headers().get(...) and                  │ Codemod handles this.                                       │    
  │ async                  │ cookies().get(...)                      │                                                             │    
  ├────────────────────────┼─────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤    
  │ req.ip removed from    │ middleware.ts:72 uses req.ip            │ Replace with @vercel/functions ipAddress(req) or just rely  │    
  │ middleware             │                                         │ on x-forwarded-for header (already there as fallback).      │    
  ├────────────────────────┼─────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤    
  │ fetch() no longer      │                                         │ Audit each: was it relying on the implicit cache? Add {     │    
  │ cached by default for  │ 4 fetch calls in app code               │ cache: 'force-cache' } if yes. Or set export const          │    
  │ GET                    │                                         │ fetchCache = 'default-cache' at segment level (the previous │    
  │                        │                                         │  branch did this in app/layout.tsx).                        │    
  ├────────────────────────┼─────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤    
  │ Route handler GET no   │                                         │                                                             │    
  │ longer cached by       │ API routes in app/api/**                │ Same — explicit cache: 'force-cache' if cache was wanted.   │    
  │ default                │                                         │                                                             │    
  ├────────────────────────┼─────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤    
  │ next/dynamic removed   │ 3 usages: Enterprise.tsx,               │ Visual smoke test each. Wrap in <Suspense fallback={...}>   │
  │ default Suspense wrap  │ MDXComponents.tsx, VideoModalPlayer.tsx │ if loading flickers.                                        │
  ├────────────────────────┼─────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤    
  │ swcMinify deprecated   │ Not set in next.config.js               │ No action                                                   │
  │ (already default)      │                                         │                                                             │    
  ├────────────────────────┼─────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤  
  │ geo removed from       │ Not used                                │ No action                                                   │    
  │ NextRequest            │                                         │                                                             │
  ├────────────────────────┼─────────────────────────────────────────┼─────────────────────────────────────────────────────────────┤    
  │ New error overlay      │ Pre-existing console errors             │                                                             │  
  │ surfacing              │ (RegionContext env, Speed Insights      │ Fix the underlying issues first (RegionContext guard, gate  │    
  │ previously-quiet       │ ad-block)                               │ SpeedInsights on prod)                                      │
  │ errors                 │                                         │                                                             │    
  └────────────────────────┴─────────────────────────────────────────┴─────────────────────────────────────────────────────────────┘  
                                              
  React 18 → 19                           

  ┌───────────────────────────────┬─────────────────────────────────────────────┬──────────────────────────────────────────────────┐    
  │            Change             │                This codebase                │                      Action                      │
  ├───────────────────────────────┼─────────────────────────────────────────────┼──────────────────────────────────────────────────┤    
  │ ReactDOM.render / hydrate /   │ Only createPortal used (still works)        │ None                                             │  
  │ findDOMNode removed           │                                             │                                                  │
  ├───────────────────────────────┼─────────────────────────────────────────────┼──────────────────────────────────────────────────┤
  │ React.FC no longer has        │                                             │ Codemod: npx types-react-codemod preset-19. Or   │
  │ implicit children             │ 33 usages of React.FC<Props>                │ manual: if a component is used with children,    │
  │                               │                                             │ add children?: React.ReactNode to props.         │    
  ├───────────────────────────────┼─────────────────────────────────────────────┼──────────────────────────────────────────────────┤    
  │ forwardRef not needed (refs   │ 4 usages: ClientZoom, SearchButton,         │ Optional cleanup. forwardRef still works in 19 — │    
  │ are props on function         │ ui/Card, ui/Button                          │  no urgency.                                     │    
  │ components)                   │                                             │                                                  │  
  ├───────────────────────────────┼─────────────────────────────────────────────┼──────────────────────────────────────────────────┤
  │ JSX.Element global namespace  │ 1 usage: components/FAQPricing/Card.tsx     │ Either React.JSX.Element or import type { JSX }  │    
  │ moved                         │                                             │ from 'react'. Trivial.                           │
  ├───────────────────────────────┼─────────────────────────────────────────────┼──────────────────────────────────────────────────┤    
  │ useRef() with no arg now      │ 0 zero-arg useRef() calls found             │ None                                             │  
  │ requires explicit type        │                                             │                                                  │    
  ├───────────────────────────────┼─────────────────────────────────────────────┼──────────────────────────────────────────────────┤
  │ Legacy context                │ None in your code;                          │                                                  │    
  │ (childContextTypes,           │ @stoplight/elements@8.5.0 had it (gone in   │ Done by stoplight bump                           │    
  │ contextTypes) removed         │ 9.x — already bumped)                       │                                                  │
  ├───────────────────────────────┼─────────────────────────────────────────────┼──────────────────────────────────────────────────┤    
  │ propTypes / defaultProps on   │ None                                        │ None                                             │    
  │ function components removed   │                                             │                                                  │
  ├───────────────────────────────┼─────────────────────────────────────────────┼──────────────────────────────────────────────────┤    
  │ string refs removed           │ None                                        │ None                                             │  
  ├───────────────────────────────┼─────────────────────────────────────────────┼──────────────────────────────────────────────────┤
  │ useFormState renamed to       │ Not used                                    │ None                                             │
  │ useActionState                │                                             │                                                  │
  ├───────────────────────────────┼─────────────────────────────────────────────┼──────────────────────────────────────────────────┤    
  │ New JSX transform             │ Already in use (Next does this)             │ None                                             │
  └───────────────────────────────┴─────────────────────────────────────────────┴──────────────────────────────────────────────────┘    
                                                                                                                                      
  @types/react 18 → 19
                                                                                                                                        
  Currently @types/react@^18.2.73 is in package.json and @types/react-dom@17.0.25 is installed transitively (no explicit pin). Both
  need:                                                                                                                                 
                                                                                                                                      
  - @types/react@^19 (add to devDependencies)                                                                                           
  - @types/react-dom@^19 (add to devDependencies — not currently listed)
  - Run npx types-react-codemod preset-19 to apply known type-level adjustments                                                         
                                                                                                                                      
  Transitive packages: React 19 compatibility
                                                                                                                                        
  I checked peer-dep ranges of every React-consumer in package.json:                                                                    
                                                                                                                                        
  ┌───────────────────────────────────────────────────────────┬─────────────┬───────────────────────────────────────────────────────┐   
  │                          Package                          │ React peer  │                        Status                         │   
  ├───────────────────────────────────────────────────────────┼─────────────┼───────────────────────────────────────────────────────┤
  │ @headlessui/react, @radix-ui/*, framer-motion,            │ Includes    │                                                       │   
  │ lucide-react, react-markdown, react-medium-image-zoom,    │ ^19         │ ✅                                                    │ 
  │ recharts, vaul                                            │             │                                                       │   
  ├───────────────────────────────────────────────────────────┼─────────────┼───────────────────────────────────────────────────────┤ 
  │ react-instantsearch                                       │ >= 16.8.0 < │ ✅ (allows 19)                                        │
  │                                                           │  20         │                                                       │   
  ├───────────────────────────────────────────────────────────┼─────────────┼───────────────────────────────────────────────────────┤
  │ react-icons                                               │ *           │ ✅ (any version)                                      │   
  ├───────────────────────────────────────────────────────────┼─────────────┼───────────────────────────────────────────────────────┤ 
  │ react-lite-yt-embed, next-mdx-remote                      │ >=16        │ ⚠️  Loose but should work — needs runtime test         │
  ├───────────────────────────────────────────────────────────┼─────────────┼───────────────────────────────────────────────────────┤   
  │                                                           │ ^16 || ^17  │ ❌ Excludes 19. BUT — not actually imported anywhere  │
  │ next-image-zoom@1.1.7                                     │ || ^18      │ in the codebase (verified via grep). Can be removed   │   
  │                                                           │             │ entirely.                                             │   
  ├───────────────────────────────────────────────────────────┼─────────────┼───────────────────────────────────────────────────────┤
  │ react-query@3.x (transitive via stoplight)                │ Pre-19      │ ⚠️  Bundled inside @stoplight/elements, not our direct │   
  │                                                           │             │  concern                                              │ 
  └───────────────────────────────────────────────────────────┴─────────────┴───────────────────────────────────────────────────────┘   
                                                                                                                                        
  Things you'd want to fix anyway (independent of upgrade)                                                                              
                                                                                                                                        
  These bit us on the previous Next 15 attempt — fix them in the upgrade PR so the dev overlay is clean:                                
                                                                                                                                      
  1. components/Region/RegionContext.tsx:78-97 — guard process.env.NEXT_PUBLIC_CONTROL_PLANE_URL so missing env doesn't blast 404s.     
  2. app/layout.tsx:95 — gate <SpeedInsights /> on NODE_ENV === 'production'.                                                         
           