// FPSPrediction.jsx
import { useState, useEffect, useRef } from 'react';
import { mockBenchmarkService } from '../services/benchmarkService';
import { 
  Cpu, 
  Gauge, 
  MemoryStick as Memory, 
  HardDrive,
  Activity,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Zap,
  Thermometer,
  TrendingUp,
  Layers,
  Play,
  Pause,
  RotateCcw,
  Gamepad2,
  Sword,
  Target,
  Volume2,
  VolumeX
} from 'lucide-react';

// Import videos from assets folder
import cs2Video from '../assets/cs2.mp4';
import apexVideo from '../assets/apex.mp4';
import cyberpunkVideo from '../assets/cyberpunk.mp4';

export default function FPSPrediction() {
  const [pcSpecs, setPcSpecs] = useState({
    cpu: '',
    gpu: '',
    ram: '',
    storage: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [videosLoaded, setVideosLoaded] = useState(false);
  
  // Gameplay states for each category
  const [gameplayStates, setGameplayStates] = useState({
    esport: { active: false, fps: 60, seconds: 0, minFPS: 40, maxFPS: 80, muted: true },
    aaa: { active: false, fps: 45, seconds: 0, minFPS: 30, maxFPS: 60, muted: true },
    competitive: { active: false, fps: 70, seconds: 0, minFPS: 50, maxFPS: 90, muted: true }
  });
  
  // Video refs
  const videoRefs = {
    esport: useRef(null),
    aaa: useRef(null),
    competitive: useRef(null)
  };
  
  // Animation refs for FPS counter
  const animationRefs = {
    esport: useRef(null),
    aaa: useRef(null),
    competitive: useRef(null)
  };
  
  // Component lists
  const [cpuList, setCpuList] = useState([]);
  const [gpuList, setGpuList] = useState([]);
  const [ramList, setRamList] = useState([]);
  const [storageList, setStorageList] = useState([]);
  
  // Loading states
  const [loadingComponents, setLoadingComponents] = useState({
    cpu: false,
    gpu: false,
    ram: false,
    storage: false
  });

  // Video sources mapping
  const videoSources = {
    esport: cs2Video,
    competitive: apexVideo,
    aaa: cyberpunkVideo
  };

  // Fetch components on mount
  useEffect(() => {
    fetchAllComponents();
  }, []);

  // Initialize videos
  useEffect(() => {
    // Preload videos and set properties
    Object.entries(videoRefs).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.loop = true;
        ref.current.muted = true;
        ref.current.playsInline = true;
        ref.current.preload = "auto";
      }
    });
    setVideosLoaded(true);
  }, []);

  // Handle video playback based on active state
  useEffect(() => {
    if (!videosLoaded) return;
    
    const playVideo = async (category) => {
      const video = videoRefs[category]?.current;
      if (!video) return;
      
      try {
        if (gameplayStates[category].active) {
          // Ensure video is at beginning if reset
          await video.play();
          startFPSAnimation(category);
        } else {
          video.pause();
          stopFPSAnimation(category);
        }
      } catch (error) {
        console.log(`Playback failed for ${category}:`, error);
        // If autoplay fails, update state to show paused
        setGameplayStates(prev => ({
          ...prev,
          [category]: {
            ...prev[category],
            active: false
          }
        }));
      }
    };
    
    playVideo('esport');
    playVideo('aaa');
    playVideo('competitive');
  }, [gameplayStates.esport.active, gameplayStates.aaa.active, gameplayStates.competitive.active, videosLoaded]);

  // Update FPS targets when results change
  useEffect(() => {
    if (results?.fpsEstimates) {
      updateFPSTargets();
    }
  }, [results]);

  const fetchAllComponents = async () => {
    setLoadingComponents({
      cpu: true,
      gpu: true,
      ram: true,
      storage: true
    });

    try {
      const [cpus, gpus, ram, storage] = await Promise.all([
        mockBenchmarkService.listComponents('CPU', 50),
        mockBenchmarkService.listComponents('GPU', 50),
        mockBenchmarkService.listComponents('RAM', 50),
        mockBenchmarkService.listComponents('STORAGE', 50)
      ]);

      setCpuList(cpus);
      setGpuList(gpus);
      setRamList(ram);
      setStorageList(storage);
    } catch (error) {
      console.error('Error fetching components:', error);
    } finally {
      setLoadingComponents({
        cpu: false,
        gpu: false,
        ram: false,
        storage: false
      });
    }
  };

  const handleComponentChange = (type, value) => {
    setPcSpecs(prev => ({ ...prev, [type]: value }));
  };

  const analyzePC = async () => {
    setLoading(true);
    try {
      const analysis = await mockBenchmarkService.analyzePCBuild(pcSpecs);
      console.log('Analysis results:', analysis);
      setResults(analysis);
      
      // Set initial FPS for each category based on analysis
      if (analysis.fpsEstimates) {
        updateFPSTargets(analysis);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFPSTargets = (analysis = results) => {
    if (!analysis?.fpsEstimates) return;
    
    const fps = analysis.fpsEstimates;
    
    // Parse FPS for each category
    const parseFPS = (fpsString) => {
      if (!fpsString) return { min: 60, max: 80 };
      const parts = fpsString.split('-');
      if (parts.length >= 2) {
        const min = parseInt(parts[0].trim());
        const max = parseInt(parts[1].split(' ')[0].trim());
        return { min, max };
      }
      return { min: 60, max: 80 };
    };
    
    const esportFPS = parseFPS(fps.esport?.fps || fps.esports?.fps);
    const aaaFPS = parseFPS(fps.aaa_gpu?.fps || fps.aaa?.fps);
    const competitiveFPS = parseFPS(fps.competitive?.fps);
    
    setGameplayStates(prev => ({
      ...prev,
      esport: { 
        ...prev.esport, 
        fps: Math.round((esportFPS.min + esportFPS.max) / 2),
        minFPS: esportFPS.min,
        maxFPS: esportFPS.max
      },
      aaa: { 
        ...prev.aaa, 
        fps: Math.round((aaaFPS.min + aaaFPS.max) / 2),
        minFPS: aaaFPS.min,
        maxFPS: aaaFPS.max
      },
      competitive: { 
        ...prev.competitive, 
        fps: Math.round((competitiveFPS.min + competitiveFPS.max) / 2),
        minFPS: competitiveFPS.min,
        maxFPS: competitiveFPS.max
      }
    }));
  };

  const startFPSAnimation = (category) => {
    const state = gameplayStates[category];
    const targetFPS = state.fps || 60;
    const minFPS = state.minFPS || 40;
    const maxFPS = state.maxFPS || 80;
    const fpsVariation = Math.round((maxFPS - minFPS) / 2);
    
    let frame = 0;
    
    const animate = () => {
      if (!gameplayStates[category]?.active) return;
      
      frame++;
      
      // Update seconds (60 frames = 1 second)
      if (frame % 60 === 0) {
        setGameplayStates(prev => ({
          ...prev,
          [category]: {
            ...prev[category],
            seconds: prev[category].seconds + 1
          }
        }));
      }
      
      // Update FPS counter with slight variation
      if (frame % 30 === 0) {
        const variation = Math.random() * fpsVariation * 2 - fpsVariation;
        const newFPS = Math.round(targetFPS + variation);
        setGameplayStates(prev => ({
          ...prev,
          [category]: {
            ...prev[category],
            fps: Math.max(minFPS - 5, Math.min(maxFPS + 5, newFPS))
          }
        }));
      }
      
      animationRefs[category].current = requestAnimationFrame(animate);
    };
    
    animationRefs[category].current = requestAnimationFrame(animate);
  };

  const stopFPSAnimation = (category) => {
    if (animationRefs[category]?.current) {
      cancelAnimationFrame(animationRefs[category].current);
    }
  };

  const toggleGameplay = async (category) => {
    const newActiveState = !gameplayStates[category].active;
    
    setGameplayStates(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        active: newActiveState
      }
    }));
    
    // If trying to play, ensure we handle autoplay
    if (newActiveState) {
      const video = videoRefs[category]?.current;
      if (video) {
        try {
          // Reset to beginning if at the end
          if (video.ended || video.currentTime >= video.duration - 0.5) {
            video.currentTime = 0;
          }
          await video.play();
        } catch (error) {
          console.log(`Playback failed for ${category}:`, error);
          // If play fails, revert state
          setGameplayStates(prev => ({
            ...prev,
            [category]: {
              ...prev[category],
              active: false
            }
          }));
        }
      }
    }
  };

  const resetGameplay = (category) => {
    const video = videoRefs[category]?.current;
    
    // Stop if active
    if (gameplayStates[category].active) {
      setGameplayStates(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          active: false
        }
      }));
    }
    
    // Reset video to beginning
    if (video) {
      video.currentTime = 0;
      video.pause();
    }
    
    // Reset seconds and FPS to target
    const targetFPS = gameplayStates[category].fps || 60;
    setGameplayStates(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        seconds: 0,
        fps: targetFPS,
        active: false
      }
    }));
  };

  const toggleMute = (category) => {
    const video = videoRefs[category].current;
    if (video) {
      video.muted = !video.muted;
      setGameplayStates(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          muted: !prev[category].muted
        }
      }));
    }
  };

  const getPerformanceColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getPerformanceGradient = (score) => {
    if (score >= 80) return 'from-emerald-500 to-emerald-400';
    if (score >= 60) return 'from-blue-500 to-blue-400';
    if (score >= 40) return 'from-amber-500 to-amber-400';
    return 'from-rose-500 to-rose-400';
  };

  const getPerformanceBadge = (score) => {
    if (score >= 80) return { label: 'High End', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
    if (score >= 60) return { label: 'Upper Mid', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
    if (score >= 40) return { label: 'Mid Range', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
    return { label: 'Entry Level', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
  };

  const getFPSColor = (fps) => {
    if (fps >= 100) return 'text-emerald-400';
    if (fps >= 60) return 'text-blue-400';
    if (fps >= 30) return 'text-amber-400';
    return 'text-rose-400';
  };

  const renderDropdown = (type, list, loading) => {
    const icons = {
      cpu: <Cpu className="w-5 h-5 text-purple-400" strokeWidth={1.5} />,
      gpu: <Gauge className="w-5 h-5 text-purple-400" strokeWidth={1.5} />,
      ram: <Memory className="w-5 h-5 text-purple-400" strokeWidth={1.5} />,
      storage: <HardDrive className="w-5 h-5 text-purple-400" strokeWidth={1.5} />
    };

    const labels = {
      cpu: 'Processor',
      gpu: 'Graphics Card',
      ram: 'Memory',
      storage: 'Storage'
    };

    const placeholders = {
      cpu: 'Select processor...',
      gpu: 'Select graphics card...',
      ram: 'Select memory...',
      storage: 'Select storage...'
    };

    return (
      <div className="group relative">
        <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></div>
        <div className="relative bg-[#1a1a2e] rounded-xl border border-[#2d1b4e] p-6 hover:border-purple-500/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                {icons[type]}
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-300">{labels[type]}</h2>
                <p className="text-xs text-gray-500">Select component</p>
              </div>
            </div>
            {pcSpecs[type] && (
              <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded-full border border-purple-500/20">
                Selected
              </span>
            )}
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="relative">
              <select
                value={pcSpecs[type]}
                onChange={(e) => handleComponentChange(type, e.target.value)}
                className="w-full appearance-none bg-[#0f0f1a] text-gray-300 border border-[#2d1b4e] rounded-lg px-4 py-3 pr-10 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all cursor-pointer hover:bg-[#1a1a2e]"
              >
                <option value="" className="bg-[#1a1a2e] text-gray-500">{placeholders[type]}</option>
                {list.map((item, index) => (
                  <option key={index} value={item.name} className="bg-[#1a1a2e] py-2">
                    {item.name} — {item.score} pts
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          )}
          
          {pcSpecs[type] && (
            <div className="mt-3 flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-purple-400/80 line-clamp-1">{pcSpecs[type]}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGameplayPreview = (category, title, icon, color) => {
    const state = gameplayStates[category];
    const fpsData = results?.fpsEstimates?.[category === 'aaa' ? 'aaa_gpu' : category];
    const fpsText = fpsData?.fps || 
                   (category === 'esport' ? '60-80 FPS' : 
                    category === 'aaa' ? '45-60 FPS' : '70-90 FPS');
    const games = fpsData?.games || fpsData?.details || 
                 (category === 'esport' ? 'CS2, Valorant, LoL' : 
                  category === 'aaa' ? 'Cyberpunk 2077' : 'Apex Legends');
    
    return (
      <div className="bg-[#1a1a2e] rounded-xl border border-[#2d1b4e] overflow-hidden hover:border-purple-500/30 transition-all group">
        <div className="p-4 border-b border-[#2d1b4e] flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <h3 className="font-medium text-white">{title}</h3>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${color}`}>
            {fpsText}
          </span>
        </div>
        
        <div className="relative bg-black">
          <video
            ref={videoRefs[category]}
            src={videoSources[category]}
            loop
            muted={state.muted}
            playsInline
            preload="auto"
            className="w-full h-auto aspect-[16/9] object-cover"
          />
          
          {/* Video Controls Overlay - always visible but with opacity on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
            <div className="flex gap-2">
              <button
                onClick={() => toggleGameplay(category)}
                className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-all transform hover:scale-110 shadow-lg"
                title={state.active ? 'Pause' : 'Play'}
              >
                {state.active ? 
                  <Pause className="w-4 h-4 text-white" /> : 
                  <Play className="w-4 h-4 text-white" />
                }
              </button>
              <button
                onClick={() => resetGameplay(category)}
                className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-all transform hover:scale-110 shadow-lg"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => toggleMute(category)}
                className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-all transform hover:scale-110 shadow-lg"
                title={state.muted ? 'Unmute' : 'Mute'}
              >
                {state.muted ? 
                  <VolumeX className="w-4 h-4 text-white" /> : 
                  <Volume2 className="w-4 h-4 text-white" />
                }
              </button>
            </div>
          </div>
          
          {/* FPS Counter */}
          <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#2d1b4e]">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">FPS</span>
              <span className={`font-mono text-lg font-bold ${getFPSColor(state.fps)}`}>
                {state.fps}
              </span>
            </div>
          </div>
          
          {/* Timer */}
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#2d1b4e]">
            <span className="font-mono text-sm text-white">
              {Math.floor(state.seconds / 60)}:{Math.floor(state.seconds % 60).toString().padStart(2, '0')}
            </span>
          </div>
          
          {/* Big Play Button when paused */}
          {!state.active && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <button
                onClick={() => toggleGameplay(category)}
                className="w-16 h-16 bg-purple-600/90 rounded-full flex items-center justify-center hover:bg-purple-700 transition-all transform hover:scale-110 shadow-xl"
              >
                <Play className="w-8 h-8 text-white" />
              </button>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-[#0f0f1a] border-t border-[#2d1b4e] flex justify-between items-center">
          <p className="text-xs text-gray-400">{games}</p>
          <span className="text-xs text-purple-400">
            {Math.floor(videoRefs[category]?.current?.duration || 120 / 60)} min
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-[#0a0a0f] bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      <div className="min-h-full w-full max-w-7xl mx-auto px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/20">
              <Activity className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl font-light text-white tracking-tight">Performance Analysis</h1>
              <p className="text-gray-500 text-sm mt-1 font-light">Select your components to estimate gaming performance</p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-[#1a1a2e]/50 backdrop-blur-sm rounded-lg border border-[#2d1b4e] p-4">
              <p className="text-xs text-gray-500 mb-1">Components Analyzed</p>
              <p className="text-2xl font-light text-white">{cpuList.length + gpuList.length + ramList.length + storageList.length}</p>
            </div>
            <div className="bg-[#1a1a2e]/50 backdrop-blur-sm rounded-lg border border-[#2d1b4e] p-4">
              <p className="text-xs text-gray-500 mb-1">Performance Tiers</p>
              <p className="text-2xl font-light text-white">Low / Mid / High</p>
            </div>
            <div className="bg-[#1a1a2e]/50 backdrop-blur-sm rounded-lg border border-[#2d1b4e] p-4">
              <p className="text-xs text-gray-500 mb-1">Supported Games</p>
              <p className="text-2xl font-light text-white">500+</p>
            </div>
            <div className="bg-[#1a1a2e]/50 backdrop-blur-sm rounded-lg border border-[#2d1b4e] p-4">
              <p className="text-xs text-gray-500 mb-1">FPS Database</p>
              <p className="text-2xl font-light text-white">Real-time</p>
            </div>
          </div>
        </div>

        {/* Component Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {renderDropdown('cpu', cpuList, loadingComponents.cpu)}
          {renderDropdown('gpu', gpuList, loadingComponents.gpu)}
          {renderDropdown('ram', ramList, loadingComponents.ram)}
          {renderDropdown('storage', storageList, loadingComponents.storage)}
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={analyzePC}
            disabled={loading || !pcSpecs.cpu || !pcSpecs.gpu}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-10 py-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Analyzing Configuration...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" strokeWidth={1.5} />
                  <span>Analyze Performance</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-6 animate-in fade-in duration-500 pb-16">
            {/* Three Gameplay Previews */}
            <div className="grid grid-cols-3 gap-4">
              {renderGameplayPreview(
                'esport', 
                'CS2 - Esports', 
                <Gamepad2 className="w-4 h-4 text-emerald-400" />, 
                'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              )}
              {renderGameplayPreview(
                'aaa', 
                'Cyberpunk 2077 - AAA', 
                <Sword className="w-4 h-4 text-blue-400" />, 
                'bg-blue-500/10 text-blue-400 border-blue-500/20'
              )}
              {renderGameplayPreview(
                'competitive', 
                'Apex Legends - Competitive', 
                <Target className="w-4 h-4 text-purple-400" />, 
                'bg-purple-500/10 text-purple-400 border-purple-500/20'
              )}
            </div>

            {/* FPS Legend */}
            <div className="flex items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="text-gray-400">≥100 FPS (Ultra Smooth)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-gray-400">60-99 FPS (Smooth)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <span className="text-gray-400">30-59 FPS (Playable)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                <span className="text-gray-400">30 FPS (Stutter)</span>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-[#1a1a2e] rounded-2xl border border-[#2d1b4e] p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-purple-400" strokeWidth={1.5} />
                  <h2 className="text-lg font-medium text-white">System Analysis</h2>
                </div>
                <div className="flex gap-2">
                  {['overview', 'details', 'bottlenecks'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm rounded-lg transition-all ${
                        activeTab === tab
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overall Score */}
              <div className="flex items-center gap-8 mb-8">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Performance Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-6xl font-light ${getPerformanceColor(results.overallScore)}`}>
                      {results.overallScore}
                    </span>
                    <span className="text-gray-600">/100</span>
                  </div>
                  <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full border ${getPerformanceBadge(results.overallScore).color}`}>
                    {getPerformanceBadge(results.overallScore).label}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-[#0f0f1a] rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${getPerformanceGradient(results.overallScore)}`}
                      style={{ width: `${results.overallScore}%` }}
                    ></div>
                  </div>
                  {results.performanceTier && (
                    <p className="mt-3 text-sm text-gray-400 font-light">
                      {results.performanceTier.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Component Scores Grid */}
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(results.components).map(([key, component]) => {
                  const badge = getPerformanceBadge(component.score);
                  return (
                    <div key={key} className="bg-[#0f0f1a] rounded-xl p-5 border border-[#2d1b4e] hover:border-purple-500/30 transition-all">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">{key}</p>
                      <p className="text-white text-sm font-medium mb-3 line-clamp-2" title={component.name}>
                        {component.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`text-lg font-light ${getPerformanceColor(component.score)}`}>
                          {component.score}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-[#1a1a2e] rounded-xl border border-[#2d1b4e] p-5 hover:border-purple-500/30 transition-all">
                <p className="text-sm text-gray-400 mb-2">Esports Titles</p>
                <p className="text-2xl font-light text-emerald-400">
                  {results.fpsEstimates?.esport?.fps || results.fpsEstimates?.esports?.fps || '60-80 FPS'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {results.fpsEstimates?.esport?.games || results.fpsEstimates?.esports?.details || 'CS2, Valorant, LoL'}
                </p>
              </div>
              <div className="bg-[#1a1a2e] rounded-xl border border-[#2d1b4e] p-5 hover:border-purple-500/30 transition-all">
                <p className="text-sm text-gray-400 mb-2">AAA Games</p>
                <p className="text-2xl font-light text-blue-400">
                  {results.fpsEstimates?.aaa_gpu?.fps || results.fpsEstimates?.aaa?.fps || '45-60 FPS'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {results.fpsEstimates?.aaa_gpu?.games || results.fpsEstimates?.aaa?.details || 'Cyberpunk 2077, Starfield'}
                </p>
              </div>
              <div className="bg-[#1a1a2e] rounded-xl border border-[#2d1b4e] p-5 hover:border-purple-500/30 transition-all">
                <p className="text-sm text-gray-400 mb-2">Competitive</p>
                <p className="text-2xl font-light text-purple-400">
                  {results.fpsEstimates?.competitive?.fps || '70-90 FPS'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {results.fpsEstimates?.competitive?.games || results.fpsEstimates?.competitive?.details || 'Apex Legends, Overwatch 2'}
                </p>
              </div>
            </div>

            {/* Bottlenecks */}
            {results.bottlenecks && results.bottlenecks.length > 0 && (
              <div className="bg-[#1a1a2e] rounded-xl border border-[#2d1b4e] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Thermometer className="w-4 h-4 text-amber-400" strokeWidth={1.5} />
                  <h3 className="text-sm font-medium text-white">Potential Bottlenecks</h3>
                </div>
                <div className="space-y-3">
                  {results.bottlenecks.map((bottleneck, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-[#0f0f1a] rounded-lg">
                      <AlertCircle className={`w-4 h-4 mt-0.5 ${
                        bottleneck.severity === 'high' ? 'text-rose-400' : 'text-amber-400'
                      }`} strokeWidth={1.5} />
                      <p className="text-sm text-gray-300">{bottleneck.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pairing Info */}
            {results.pairing && (
              <div className="bg-[#1a1a2e] rounded-xl border border-[#2d1b4e] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-purple-400" strokeWidth={1.5} />
                  <h3 className="text-sm font-medium text-white">CPU-GPU Pairing</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0f0f1a] p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Balance Score</p>
                    <p className="text-2xl font-light text-purple-400">{results.pairing.balance}/100</p>
                  </div>
                  <div className="bg-[#0f0f1a] p-4 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Verdict</p>
                    <p className="text-sm text-gray-300">{results.pairing.verdict}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {results.recommendations && results.recommendations.length > 0 && (
              <div className="bg-[#1a1a2e] rounded-xl border border-[#2d1b4e] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-purple-400" strokeWidth={1.5} />
                  <h3 className="text-sm font-medium text-white">Upgrade Recommendations</h3>
                </div>
                <div className="space-y-3">
                  {results.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-[#0f0f1a] rounded-lg">
                      <div className="w-1.5 h-1.5 mt-2 bg-purple-400 rounded-full"></div>
                      <p className="text-sm text-gray-300">{rec.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}