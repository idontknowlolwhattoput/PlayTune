// FPSPrediction.jsx
import { useState, useEffect } from 'react';
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
  Layers
} from 'lucide-react';

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

  // Fetch components on mount
  useEffect(() => {
    fetchAllComponents();
  }, []);

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
      console.log('Analysis results:', analysis); // Debug log
      setResults(analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
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

  const renderPerformanceCard = (title, value, subtitle, color) => (
    <div className="bg-[#1a1a2e] rounded-xl border border-[#2d1b4e] p-5 hover:border-purple-500/30 transition-all">
      <p className="text-sm text-gray-400 mb-2">{title}</p>
      <p className={`text-2xl font-light ${color}`}>{value || 'N/A'}</p>
      <p className="text-xs text-gray-500 mt-1">{subtitle || 'No data'}</p>
    </div>
  );

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
              {results.fpsEstimates && (
                <>
                  {renderPerformanceCard(
                    'Esports Titles',
                    results.fpsEstimates.esport?.fps || results.fpsEstimates.esports?.fps || 'N/A',
                    results.fpsEstimates.esport?.games || results.fpsEstimates.esports?.details || 'CS2, Valorant, LoL',
                    'text-emerald-400'
                  )}
                  {renderPerformanceCard(
                    'AAA Games',
                    results.fpsEstimates.aaa_gpu?.fps || results.fpsEstimates.aaa?.fps || 'N/A',
                    results.fpsEstimates.aaa_gpu?.games || results.fpsEstimates.aaa?.details || 'Cyberpunk, Starfield',
                    'text-blue-400'
                  )}
                  {renderPerformanceCard(
                    'Competitive',
                    results.fpsEstimates.competitive?.fps || 'N/A',
                    results.fpsEstimates.competitive?.games || results.fpsEstimates.competitive?.details || 'Apex, Overwatch 2',
                    'text-purple-400'
                  )}
                </>
              )}
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