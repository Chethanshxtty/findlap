import { useState } from 'react';
import { fetchLaptopsFromAI } from './api';
import type { AIResponse, Specs } from './types';

const apiKey = (import.meta.env.VITE_ANTHROPIC_API_KEY as string) || '';

const getStableLaptopImage = (name: string, useTags: string[] = []): string => {
  const nameLower = name.toLowerCase();
  
  // MacBook special case
  if (nameLower.includes('macbook') || nameLower.includes('apple')) {
    return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=320&h=200&fit=crop&q=80';
  }
  
  // Gaming laptops
  if (useTags.includes('gaming') || nameLower.includes('rtx') || nameLower.includes('gaming') || nameLower.includes('tuf') || nameLower.includes('rog') || nameLower.includes('loq') || nameLower.includes('victus')) {
    return 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=320&h=200&fit=crop&q=80';
  }
  
  // Coding / Creator laptops
  if (useTags.includes('editing') || nameLower.includes('creator') || nameLower.includes('zenbook') || nameLower.includes('oled')) {
    return 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=320&h=200&fit=crop&q=80';
  }
  
  // General fallback using a hash of the laptop name to select consistently
  const images = [
    'https://images.unsplash.com/photo-1496181130204-7552cc14b1e0?w=320&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=320&h=200&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=320&h=200&fit=crop&q=80'
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % images.length;
  return images[index];
};

function App() {
  const [budget, setBudget] = useState<number | ''>('');
  const [useCases, setUseCases] = useState<string[]>(['coding']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingPhase, setLoadingPhase] = useState<string>('');
  const [results, setResults] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [budgetError, setBudgetError] = useState<string | null>(null);
  
  // Validation visual state
  const [invalidSubmit, setInvalidSubmit] = useState<boolean>(false);

  const toggleUseCase = (useCase: 'coding' | 'gaming' | 'editing') => {
    if (useCases.includes(useCase)) {
      if (useCases.length > 1) {
        setUseCases(useCases.filter(u => u !== useCase));
      }
    } else {
      setUseCases([...useCases, useCase]);
    }
  };

  const executeSearch = async () => {
    if (!budget || budget < 35000) {
      setBudgetError('Minimum budget is ₹35,000');
      setInvalidSubmit(true);
      setTimeout(() => setInvalidSubmit(false), 600);
      return;
    }
    
    setBudgetError(null);
    setIsLoading(true);
    setError(null);
    setResults(null);

    const phases = [
      "Scanning Amazon, Flipkart, Croma...",
      "Ranking by specs and value...",
      "AI selecting best picks..."
    ];
    
    setLoadingPhase(phases[0]);
    let phaseIdx = 0;
    const interval = setInterval(() => {
      phaseIdx = (phaseIdx + 1) % phases.length;
      setLoadingPhase(phases[phaseIdx]);
    }, 2500);

    try {
      const data = await fetchLaptopsFromAI(Number(budget), useCases, apiKey);
      setResults(data);
      // Smooth scroll to results once loaded
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'AN UNEXPECTED NETWORK ERROR OCCURRED. PLEASE CHECK YOUR INTEGRATION SETTINGS.');
    } finally {
      clearInterval(interval);
      setIsLoading(false);
    }
  };

  const handleFind = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch();
  };

  const LaptopImage = ({ brand, name, useTags = [], imageUrl, className = "h-[140px]" }: { brand: string; name: string; useTags?: string[]; imageUrl?: string; className?: string }) => {
    const unsplashUrl = getStableLaptopImage(name, useTags);
    const [imgSrc, setImgSrc] = useState<string>(imageUrl || unsplashUrl);
    const [hasFailedOnce, setHasFailedOnce] = useState<boolean>(false);
    const [showFallbackText, setShowFallbackText] = useState<boolean>(false);

    return (
      <div className={`w-full ${className} bg-vanguard-darker border border-vanguard-border relative flex items-center justify-center overflow-hidden`}>
        {!showFallbackText && (
          <img
            src={imgSrc}
            alt={brand}
            className="w-full h-full object-cover"
            onError={() => {
              if (imageUrl && imgSrc === imageUrl && !hasFailedOnce) {
                // First fallback: try stable Unsplash category image
                setImgSrc(unsplashUrl);
                setHasFailedOnce(true);
              } else {
                // Second fallback: show monogram text block
                setShowFallbackText(true);
              }
            }}
          />
        )}
        {showFallbackText && (
          <div 
            className="w-full h-full flex flex-col items-center justify-center bg-vanguard-darker text-[#2a2a2a] relative select-none font-mono"
          >
            <div className="text-3xl font-black tracking-[0.3em] text-[#E8FF00]">
              {brand.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    );
  };

  const Tag = ({ type }: { type: 'coding' | 'gaming' | 'editing' }) => {
    const styles = {
      coding: 'border-[#00cfff] text-[#00cfff] bg-[#00cfff]/[0.05]',
      gaming: 'border-[#ff4455] text-[#ff4455] bg-[#ff4455]/[0.05]',
      editing: 'border-[#ff9900] text-[#ff9900] bg-[#ff9900]/[0.05]',
    };
    return (
      <span className={`border px-2 py-0.5 text-[9px] tracking-widest font-mono uppercase font-bold ${styles[type]}`}>
        {type}
      </span>
    );
  };

  const SpecsGrid = ({ specs }: { specs: Specs }) => (
    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
      <div className="bg-vanguard-darker border border-vanguard-border p-2">
        <div className="text-[8px] text-[#888888] uppercase tracking-wider mb-0.5 font-bold">Processor</div>
        <div className="font-semibold text-white truncate text-[11px]" title={specs.Processor}>{specs.Processor}</div>
      </div>
      <div className="bg-vanguard-darker border border-vanguard-border p-2">
        <div className="text-[8px] text-[#888888] uppercase tracking-wider mb-0.5 font-bold">GPU</div>
        <div className="font-semibold text-white truncate text-[11px]" title={specs.GPU}>{specs.GPU}</div>
      </div>
      <div className="bg-vanguard-darker border border-vanguard-border p-2">
        <div className="text-[8px] text-[#888888] uppercase tracking-wider mb-0.5 font-bold">RAM</div>
        <div className="font-semibold text-white truncate text-[11px]" title={specs.RAM}>{specs.RAM}</div>
      </div>
      <div className="bg-vanguard-darker border border-vanguard-border p-2">
        <div className="text-[8px] text-[#888888] uppercase tracking-wider mb-0.5 font-bold">Storage</div>
        <div className="font-semibold text-white truncate text-[11px]" title={specs.Storage}>{specs.Storage}</div>
      </div>
      <div className="bg-vanguard-darker border border-vanguard-border p-2 col-span-2">
        <div className="text-[8px] text-[#888888] uppercase tracking-wider mb-0.5 font-bold">Display</div>
        <div className="font-semibold text-white truncate text-[11px]" title={specs.Display}>{specs.Display}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-vanguard-bg text-white flex flex-col font-sans select-none antialiased">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-vanguard-bg/90 backdrop-blur-md border-b border-vanguard-border z-50 flex items-center justify-between px-6 md:px-12 select-none">
        <div className="text-xl font-bold uppercase tracking-wider">
          FINDL<span className="text-[#E8FF00]">A</span>P
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center items-center px-4 md:px-12 pt-20 pb-12 z-10 relative">
        <div className="w-full max-w-3xl flex flex-col items-center text-center">
          <div className="text-[#888888] text-2xs md:text-xs tracking-[0.25em] font-mono mb-6 uppercase font-bold">
            ✦ AI-POWERED GEAR FINDER ✦
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-[-0.05em] uppercase leading-[0.9] text-white flex flex-col items-center">
            <span>Find Your</span>
            <span className="text-[#E8FF00] my-2">Perfect</span>
            <span>Partner.</span>
          </h1>

          {/* Form Area */}
          <form 
            onSubmit={handleFind} 
            className={`w-full border ${invalidSubmit ? 'animate-red-flash border-[#ff4455]' : 'border-vanguard-border'} transition-colors duration-200 bg-vanguard-dark flex flex-col`}
          >
            {/* Budget Row */}
            <div className="flex border-b border-vanguard-border h-16 items-center">
              <span className="text-2xl font-bold px-4 text-[#E8FF00] select-none font-mono">₹</span>
              <input
                type="number"
                value={budget}
                onChange={(e) => {
                  const val = e.target.value;
                  setBudget(val === '' ? '' : Number(val));
                }}
                placeholder="Go with budget"
                min="35000"
                className="flex-1 bg-transparent border-0 outline-none text-xl font-bold px-2 text-white h-full placeholder:text-[#333333]"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="h-full bg-[#E8FF00] hover:bg-[#d6ec00] text-black font-black text-xs tracking-widest uppercase px-8 flex items-center gap-2 border-l border-vanguard-border disabled:opacity-50 transition-colors"
              >
                FIND <span className="font-mono">→</span>
              </button>
            </div>

            {/* Use Case Chips Selector */}
            <div className="grid grid-cols-3 text-center items-center h-14 select-none">
              <div 
                onClick={() => toggleUseCase('coding')}
                className={`h-full border-r border-vanguard-border flex items-center justify-center gap-2.5 cursor-pointer hover:bg-white/[0.02] transition-colors ${useCases.includes('coding') ? 'bg-white/[0.01]' : ''}`}
              >
                <div className={`w-2 h-2 border ${useCases.includes('coding') ? 'bg-[#E8FF00] border-[#E8FF00]' : 'border-[#444444]'}`}></div>
                <span className="text-[10px] md:text-xs tracking-widest font-mono font-bold uppercase text-white">CODING</span>
              </div>
              <div 
                onClick={() => toggleUseCase('gaming')}
                className={`h-full border-r border-vanguard-border flex items-center justify-center gap-2.5 cursor-pointer hover:bg-white/[0.02] transition-colors ${useCases.includes('gaming') ? 'bg-white/[0.01]' : ''}`}
              >
                <div className={`w-2 h-2 border ${useCases.includes('gaming') ? 'bg-[#E8FF00] border-[#E8FF00]' : 'border-[#444444]'}`}></div>
                <span className="text-[10px] md:text-xs tracking-widest font-mono font-bold uppercase text-white">GAMING</span>
              </div>
              <div 
                onClick={() => toggleUseCase('editing')}
                className={`h-full flex items-center justify-center gap-2.5 cursor-pointer hover:bg-white/[0.02] transition-colors ${useCases.includes('editing') ? 'bg-white/[0.01]' : ''}`}
              >
                <div className={`w-2 h-2 border ${useCases.includes('editing') ? 'bg-[#E8FF00] border-[#E8FF00]' : 'border-[#444444]'}`}></div>
                <span className="text-[10px] md:text-xs tracking-widest font-mono font-bold uppercase text-white">EDITING</span>
              </div>
            </div>
          </form>

          {/* Helper details below Form */}
          <div className="w-full mt-3 flex justify-between items-center text-[10px] font-mono tracking-widest text-[#888888] uppercase">
            <span>{useCases.length} SELECTED</span>
          </div>

          {/* Validation budget error */}
          {budgetError && (
            <div className="mt-4 text-[#ff4455] text-xs font-mono font-bold tracking-widest uppercase">
              ⚠️ {budgetError}
            </div>
          )}
        </div>
      </div>

      {/* Loading Animation Area */}
      {isLoading && (
        <div className="fixed inset-0 bg-vanguard-bg/95 flex flex-col justify-center items-center z-50 p-6">
          <div className="w-full max-w-md border border-vanguard-border bg-vanguard-dark p-6 relative">
            <div className="mt-6 mb-4 text-center text-xs font-mono tracking-wider font-bold uppercase text-white">
              {loadingPhase}
            </div>
            
            {/* Loading Progress Bar */}
            <div className="w-full h-2 bg-vanguard-darker border border-vanguard-border relative overflow-hidden">
              <div className="animate-loading-bar"></div>
            </div>
          </div>
        </div>
      )}

      {/* Output Results Container */}
      {(results || error) && (
        <div id="results-section" className="w-full px-6 md:px-12 pb-24 max-w-7xl mx-auto flex flex-col gap-12 pt-12">
          
          {/* Main heading separator */}
          <div className="border-b border-vanguard-border pb-4 flex justify-between items-end font-mono">
            <h2 className="text-sm font-bold tracking-[0.25em] text-[#888888] uppercase">✦ ANALYSIS RESULTS ✦</h2>
          </div>

          {error && (
            <div className="border border-[#ff4455] bg-vanguard-dark p-8 font-mono text-left flex flex-col gap-4 max-w-2xl mx-auto w-full">
              <div className="text-[#ff4455] font-black tracking-widest text-sm uppercase">⚠️ SEARCH ERROR</div>
              <div className="bg-vanguard-darker border border-vanguard-border p-4 text-xs font-mono text-white break-words uppercase">
                {error}
              </div>
              <div className="flex gap-4 mt-2">
                <button 
                  onClick={executeSearch} 
                  className="bg-[#ff4455] hover:bg-[#dd3344] text-black transition-colors px-6 py-2 text-2xs tracking-widest uppercase font-black"
                >
                  TRY AGAIN
                </button>
              </div>
            </div>
          )}

          {results && (
            <>
              {/* Summary message */}
              <div className="text-sm font-mono text-white leading-relaxed uppercase border border-vanguard-border p-5 bg-vanguard-dark tracking-wider flex justify-between items-center flex-wrap gap-4 font-bold">
                <div>
                  <span className="text-[#E8FF00]">SUMMARY // </span> {results.summary}
                </div>
                <div className="text-2xs text-[#888888] font-bold border border-vanguard-border px-2 py-1 bg-vanguard-darker">
                  TOTAL FOUND: {results.totalFound}
                </div>
              </div>

              {/* Best Pick Banner Card */}
              <div className="relative border border-[#E8FF00] bg-[#E8FF00]/[0.01] p-6 pt-10 flex flex-col lg:grid lg:grid-cols-12 gap-8 select-none">
                
                {/* badge pinned top-left edge */}
                <div className="absolute top-0 left-0 bg-[#E8FF00] text-black font-black text-2xs tracking-widest uppercase px-3 py-1">
                  BEST PICK
                </div>

                 {/* Column 1: Laptop Image (left) */}
                <div className="lg:col-span-3 flex flex-col justify-center">
                  <LaptopImage brand={results.bestPick.brand} name={results.bestPick.name} imageUrl={results.bestPick.imageUrl} className="h-[180px]" />
                </div>

                {/* Column 2: Specs & Quote (center) */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                  <div className="text-lg font-bold uppercase tracking-wider font-mono text-white">
                    {results.bestPick.name}
                  </div>
                  
                  {/* Quote with accent yellow left border */}
                  <div className="border-l-2 border-[#E8FF00] pl-4 italic text-xs text-[#888888] leading-relaxed uppercase tracking-wider font-mono">
                    "{results.bestPick.whyBest}"
                  </div>

                  <SpecsGrid specs={results.bestPick.specs} />
                </div>

                {/* Column 3: Price + stores (right) */}
                <div className="lg:col-span-3 flex flex-col justify-between gap-6 border-t lg:border-t-0 lg:border-l border-vanguard-border pt-6 lg:pt-0 lg:pl-6 text-right lg:text-left">
                  <div>
                    <div className="text-[9px] text-[#888888] font-mono tracking-widest uppercase mb-1 font-bold">EST. RETAIL PRICE</div>
                    <div className="text-[#E8FF00] font-black text-4xl tracking-tight font-mono">
                      {results.bestPick.price}
                    </div>
                  </div>
 
                  <div className="flex flex-col gap-2 w-full">
                    <div className="text-[8px] text-[#888888] font-mono tracking-widest uppercase text-left font-bold">PURCHASE CHANNELS:</div>
                    {results.bestPick.stores.map((store, i) => (
                      <a 
                        key={i}
                        href={store.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full text-center border border-vanguard-border hover:border-[#E8FF00] bg-vanguard-darker hover:bg-white/[0.02] text-white py-2 px-3 text-2xs font-mono tracking-widest uppercase transition-colors flex justify-between items-center"
                      >
                        <span>{store.name}</span>
                        <span className="text-[#E8FF00] font-bold">{store.price}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Laptop Grid */}
              <div className="bg-vanguard-border gap-[1px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full border border-vanguard-border">
                {results.laptops.map((laptop) => (
                  <div key={laptop.rank} className="bg-vanguard-dark p-6 flex flex-col relative min-h-[480px] justify-between">
                    
                    {/* Rank number top-left */}
                    <div className="absolute top-2 left-4 text-5xl font-black text-[#1c1c22] tracking-tighter select-none font-mono">
                      {String(laptop.rank).padStart(2, '0')}
                    </div>

                    {/* Content area */}
                    <div className="flex flex-col gap-4 z-10 pt-8">
                      {/* Laptop Image (height 140px) */}
                      <LaptopImage brand={laptop.brand} name={laptop.name} useTags={laptop.useTags} imageUrl={laptop.imageUrl} className="h-[140px]" />

                      {/* Use Tags row */}
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {laptop.useTags.map((tag, i) => (
                          <Tag key={i} type={tag} />
                        ))}
                      </div>

                      {/* Laptop Name */}
                      <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-white leading-tight mt-1 truncate">
                        {laptop.name}
                      </h3>

                      {/* Specs block */}
                      <SpecsGrid specs={laptop.specs} />
                    </div>

                    {/* Bottom Row */}
                    <div className="flex justify-between items-end border-t border-vanguard-border pt-4 mt-6">
                      <div className="text-left font-mono">
                        <div className="text-[8px] text-[#555555] uppercase font-bold tracking-widest mb-0.5">EST. PRICE</div>
                        <div className="text-[#E8FF00] text-lg font-black">{laptop.price}</div>
                      </div>

                      {/* Mini store links stacked right-aligned */}
                      <div className="flex flex-col gap-1 text-right max-w-[150px]">
                        {laptop.stores.slice(0, 2).map((store, i) => (
                          <a 
                            key={i} 
                            href={store.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-[9px] font-mono text-[#888888] hover:text-[#E8FF00] tracking-wider truncate"
                          >
                            {store.name.toUpperCase()} @ <span className="font-bold text-white">{store.price}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Vanguard Footer */}
              <footer className="w-full text-center pt-8 border-t border-vanguard-border font-mono text-[9px] text-[#333333] tracking-[0.25em] uppercase leading-relaxed">
                FINDLAP — AI LAPTOP INTELLIGENCE · PRICES ARE INDICATIVE · ALWAYS VERIFY BEFORE PURCHASE
              </footer>
            </>
          )}

        </div>
      )}
    </div>
  );
}

export default App;
