// src/services/mockBenchmarkService.js

// Mock data for Low, Mid, High components with realistic benchmark scores
const mockData = {
  cpus: {
    low: [
      { name: "Intel Core i3-10100", score: 45, tier: "low", passmark_score: 6543, normalized_score: 45, cores: 4, threads: 8, base_clock: "3.6GHz", boost_clock: "4.3GHz" },
      { name: "AMD Ryzen 3 3100", score: 43, tier: "low", passmark_score: 6245, normalized_score: 43, cores: 4, threads: 8, base_clock: "3.6GHz", boost_clock: "3.9GHz" },
      { name: "Intel Pentium Gold G6400", score: 38, tier: "low", passmark_score: 5512, normalized_score: 38, cores: 2, threads: 4, base_clock: "4.0GHz", boost_clock: "4.0GHz" },
      { name: "AMD Athlon 3000G", score: 32, tier: "low", passmark_score: 4640, normalized_score: 32, cores: 2, threads: 4, base_clock: "3.5GHz", boost_clock: "3.5GHz" },
      { name: "Intel Celeron G5905", score: 28, tier: "low", passmark_score: 4060, normalized_score: 28, cores: 2, threads: 2, base_clock: "3.5GHz", boost_clock: "3.5GHz" }
    ],
    mid: [
      { name: "Intel Core i5-12400F", score: 72, tier: "mid", passmark_score: 18543, normalized_score: 72, cores: 6, threads: 12, base_clock: "2.5GHz", boost_clock: "4.4GHz" },
      { name: "AMD Ryzen 5 5600X", score: 75, tier: "mid", passmark_score: 19321, normalized_score: 75, cores: 6, threads: 12, base_clock: "3.7GHz", boost_clock: "4.6GHz" },
      { name: "Intel Core i5-11400", score: 68, tier: "mid", passmark_score: 17532, normalized_score: 68, cores: 6, threads: 12, base_clock: "2.6GHz", boost_clock: "4.4GHz" },
      { name: "AMD Ryzen 5 5500", score: 65, tier: "mid", passmark_score: 16754, normalized_score: 65, cores: 6, threads: 12, base_clock: "3.6GHz", boost_clock: "4.2GHz" },
      { name: "Intel Core i5-10400", score: 62, tier: "mid", passmark_score: 15987, normalized_score: 62, cores: 6, threads: 12, base_clock: "2.9GHz", boost_clock: "4.3GHz" }
    ],
    high: [
      { name: "AMD Ryzen 7 7800X3D", score: 95, tier: "high", passmark_score: 34567, normalized_score: 95, cores: 8, threads: 16, base_clock: "4.2GHz", boost_clock: "5.0GHz", cache: "96MB L3" },
      { name: "Intel Core i9-13900K", score: 98, tier: "high", passmark_score: 35678, normalized_score: 98, cores: 24, threads: 32, base_clock: "3.0GHz", boost_clock: "5.8GHz" },
      { name: "AMD Ryzen 9 7950X", score: 96, tier: "high", passmark_score: 34987, normalized_score: 96, cores: 16, threads: 32, base_clock: "4.5GHz", boost_clock: "5.7GHz" },
      { name: "Intel Core i7-13700K", score: 88, tier: "high", passmark_score: 32000, normalized_score: 88, cores: 16, threads: 24, base_clock: "3.4GHz", boost_clock: "5.4GHz" },
      { name: "AMD Ryzen 7 7700X", score: 85, tier: "high", passmark_score: 31000, normalized_score: 85, cores: 8, threads: 16, base_clock: "4.5GHz", boost_clock: "5.4GHz" }
    ]
  },
  
  gpus: {
    low: [
      { name: "NVIDIA GTX 1650", score: 38, tier: "low", passmark_score: 8245, normalized_score: 38, vram: "4GB GDDR5", memory_bus: "128-bit" },
      { name: "AMD Radeon RX 6400", score: 35, tier: "low", passmark_score: 7600, normalized_score: 35, vram: "4GB GDDR6", memory_bus: "64-bit" },
      { name: "NVIDIA GT 1030", score: 25, tier: "low", passmark_score: 5423, normalized_score: 25, vram: "2GB GDDR5", memory_bus: "64-bit" },
      { name: "AMD Radeon RX 550", score: 22, tier: "low", passmark_score: 4772, normalized_score: 22, vram: "2GB GDDR5", memory_bus: "128-bit" },
      { name: "NVIDIA GTX 1050 Ti", score: 32, tier: "low", passmark_score: 6942, normalized_score: 32, vram: "4GB GDDR5", memory_bus: "128-bit" }
    ],
    mid: [
      { name: "NVIDIA RTX 3060", score: 68, tier: "mid", passmark_score: 14765, normalized_score: 68, vram: "12GB GDDR6", memory_bus: "192-bit" },
      { name: "AMD Radeon RX 6600", score: 65, tier: "mid", passmark_score: 14123, normalized_score: 65, vram: "8GB GDDR6", memory_bus: "128-bit" },
      { name: "NVIDIA RTX 3060 Ti", score: 72, tier: "mid", passmark_score: 15643, normalized_score: 72, vram: "8GB GDDR6", memory_bus: "256-bit" },
      { name: "AMD Radeon RX 6650 XT", score: 70, tier: "mid", passmark_score: 15200, normalized_score: 70, vram: "8GB GDDR6", memory_bus: "128-bit" },
      { name: "NVIDIA RTX 4060", score: 67, tier: "mid", passmark_score: 14567, normalized_score: 67, vram: "8GB GDDR6", memory_bus: "128-bit" }
    ],
    high: [
      { name: "NVIDIA RTX 4090", score: 98, tier: "high", passmark_score: 38654, normalized_score: 98, vram: "24GB GDDR6X", memory_bus: "384-bit" },
      { name: "NVIDIA RTX 4080 SUPER", score: 92, tier: "high", passmark_score: 36234, normalized_score: 92, vram: "16GB GDDR6X", memory_bus: "256-bit" },
      { name: "AMD Radeon RX 7900 XTX", score: 90, tier: "high", passmark_score: 35432, normalized_score: 90, vram: "24GB GDDR6", memory_bus: "384-bit" },
      { name: "NVIDIA RTX 4070 Ti SUPER", score: 85, tier: "high", passmark_score: 33456, normalized_score: 85, vram: "16GB GDDR6X", memory_bus: "256-bit" },
      { name: "AMD Radeon RX 7900 XT", score: 83, tier: "high", passmark_score: 32765, normalized_score: 83, vram: "20GB GDDR6", memory_bus: "320-bit" }
    ]
  },
  
  ram: {
    low: [
      { name: "DDR4 2666MHz 8GB", score: 28, tier: "low", passmark_score: 2800, normalized_score: 28, speed: "2666MHz", capacity: "8GB", type: "DDR4" },
      { name: "DDR4 2400MHz 8GB", score: 25, tier: "low", passmark_score: 2500, normalized_score: 25, speed: "2400MHz", capacity: "8GB", type: "DDR4" },
      { name: "DDR4 2133MHz 8GB", score: 22, tier: "low", passmark_score: 2200, normalized_score: 22, speed: "2133MHz", capacity: "8GB", type: "DDR4" },
      { name: "DDR4 2666MHz 4GB", score: 20, tier: "low", passmark_score: 2000, normalized_score: 20, speed: "2666MHz", capacity: "4GB", type: "DDR4" },
      { name: "DDR3 1600MHz 8GB", score: 18, tier: "low", passmark_score: 1800, normalized_score: 18, speed: "1600MHz", capacity: "8GB", type: "DDR3" }
    ],
    mid: [
      { name: "DDR4 3200MHz 16GB", score: 55, tier: "mid", passmark_score: 5500, normalized_score: 55, speed: "3200MHz", capacity: "16GB", type: "DDR4" },
      { name: "DDR4 3600MHz 16GB", score: 60, tier: "mid", passmark_score: 6000, normalized_score: 60, speed: "3600MHz", capacity: "16GB", type: "DDR4" },
      { name: "DDR5 4800MHz 16GB", score: 65, tier: "mid", passmark_score: 6500, normalized_score: 65, speed: "4800MHz", capacity: "16GB", type: "DDR5" },
      { name: "DDR5 5200MHz 16GB", score: 68, tier: "mid", passmark_score: 6800, normalized_score: 68, speed: "5200MHz", capacity: "16GB", type: "DDR5" },
      { name: "DDR4 3200MHz 32GB", score: 58, tier: "mid", passmark_score: 5800, normalized_score: 58, speed: "3200MHz", capacity: "32GB", type: "DDR4" }
    ],
    high: [
      { name: "DDR5 6000MHz 32GB", score: 85, tier: "high", passmark_score: 8500, normalized_score: 85, speed: "6000MHz", capacity: "32GB", type: "DDR5", timings: "CL30" },
      { name: "DDR5 6400MHz 32GB", score: 88, tier: "high", passmark_score: 8800, normalized_score: 88, speed: "6400MHz", capacity: "32GB", type: "DDR5", timings: "CL32" },
      { name: "DDR5 7200MHz 32GB", score: 92, tier: "high", passmark_score: 9200, normalized_score: 92, speed: "7200MHz", capacity: "32GB", type: "DDR5", timings: "CL34" },
      { name: "DDR5 5600MHz 32GB", score: 80, tier: "high", passmark_score: 8000, normalized_score: 80, speed: "5600MHz", capacity: "32GB", type: "DDR5", timings: "CL28" },
      { name: "DDR5 6000MHz 64GB", score: 87, tier: "high", passmark_score: 8700, normalized_score: 87, speed: "6000MHz", capacity: "64GB", type: "DDR5", timings: "CL30" }
    ]
  },
  
  storage: {
    low: [
      { name: "Kingston A400 240GB SSD", score: 25, tier: "low", passmark_score: 2500, normalized_score: 25, type: "SATA SSD", read_speed: "500MB/s", write_speed: "350MB/s" },
      { name: "WD Blue 1TB HDD", score: 15, tier: "low", passmark_score: 1500, normalized_score: 15, type: "HDD", read_speed: "150MB/s", write_speed: "150MB/s" },
      { name: "Crucial BX500 480GB SSD", score: 28, tier: "low", passmark_score: 2800, normalized_score: 28, type: "SATA SSD", read_speed: "540MB/s", write_speed: "500MB/s" },
      { name: "Seagate BarraCuda 1TB HDD", score: 14, tier: "low", passmark_score: 1400, normalized_score: 14, type: "HDD", read_speed: "140MB/s", write_speed: "140MB/s" },
      { name: "SanDisk SSD Plus 240GB", score: 24, tier: "low", passmark_score: 2400, normalized_score: 24, type: "SATA SSD", read_speed: "530MB/s", write_speed: "310MB/s" }
    ],
    mid: [
      { name: "Samsung 970 EVO Plus 500GB", score: 65, tier: "mid", passmark_score: 18500, normalized_score: 65, type: "NVMe SSD", read_speed: "3500MB/s", write_speed: "3200MB/s" },
      { name: "WD Blue SN550 1TB NVMe", score: 62, tier: "mid", passmark_score: 17700, normalized_score: 62, type: "NVMe SSD", read_speed: "2400MB/s", write_speed: "1950MB/s" },
      { name: "Crucial P2 1TB NVMe", score: 58, tier: "mid", passmark_score: 16500, normalized_score: 58, type: "NVMe SSD", read_speed: "2400MB/s", write_speed: "1800MB/s" },
      { name: "Kingston NV1 1TB", score: 55, tier: "mid", passmark_score: 15700, normalized_score: 55, type: "NVMe SSD", read_speed: "2100MB/s", write_speed: "1700MB/s" },
      { name: "Sabrent Rocket 512GB", score: 60, tier: "mid", passmark_score: 17100, normalized_score: 60, type: "NVMe SSD", read_speed: "3400MB/s", write_speed: "2900MB/s" }
    ],
    high: [
      { name: "Samsung 990 Pro 1TB", score: 92, tier: "high", passmark_score: 26200, normalized_score: 92, type: "NVMe SSD PCIe 4.0", read_speed: "7450MB/s", write_speed: "6900MB/s" },
      { name: "WD Black SN850X 1TB", score: 90, tier: "high", passmark_score: 25600, normalized_score: 90, type: "NVMe SSD PCIe 4.0", read_speed: "7300MB/s", write_speed: "6300MB/s" },
      { name: "Seagate FireCuda 530 1TB", score: 88, tier: "high", passmark_score: 25100, normalized_score: 88, type: "NVMe SSD PCIe 4.0", read_speed: "7300MB/s", write_speed: "6000MB/s" },
      { name: "Samsung 980 Pro 1TB", score: 85, tier: "high", passmark_score: 24200, normalized_score: 85, type: "NVMe SSD PCIe 4.0", read_speed: "7000MB/s", write_speed: "5000MB/s" },
      { name: "Sabrent Rocket 4 Plus 1TB", score: 87, tier: "high", passmark_score: 24800, normalized_score: 87, type: "NVMe SSD PCIe 4.0", read_speed: "7100MB/s", write_speed: "6600MB/s" }
    ]
  }
};

// Realistic FPS data based on actual benchmarks - FIXED for low-end
const fpsDatabase = {
  // Low CPU + Low GPU - REALISTIC LOW FPS
  "low_low": {
    esport: { 
      fps: "40-60 FPS", 
      settings: "Low", 
      games: "CS2 (Low), Valorant (Low), LoL (Medium)" 
    },
    aaa_gpu: { 
      fps: "20-30 FPS", 
      settings: "Low", 
      games: "Cyberpunk 2077 (Low), Starfield (Low), RDR2 (Low)" 
    },
    competitive: { 
      fps: "30-50 FPS", 
      settings: "Low", 
      games: "Apex (Low), Overwatch 2 (Low), Fortnite (Low)" 
    }
  },
  // Low CPU + Mid GPU
  "low_mid": {
    esport: { 
      fps: "60-80 FPS", 
      settings: "Medium", 
      games: "CS2 (Medium), Valorant (High), LoL (High)" 
    },
    aaa_gpu: { 
      fps: "30-40 FPS", 
      settings: "Low", 
      games: "Cyberpunk 2077 (Low), Starfield (Low), RDR2 (Low)" 
    },
    competitive: { 
      fps: "50-70 FPS", 
      settings: "Medium", 
      games: "Apex (Medium), Overwatch 2 (Medium), Fortnite (Medium)" 
    }
  },
  // Low CPU + High GPU
  "low_high": {
    esport: { 
      fps: "70-90 FPS", 
      settings: "High", 
      games: "CS2 (High), Valorant (High), LoL (High)" 
    },
    aaa_gpu: { 
      fps: "35-45 FPS", 
      settings: "Medium", 
      games: "Cyberpunk 2077 (Low-Med), Starfield (Low), RDR2 (Low)" 
    },
    competitive: { 
      fps: "60-80 FPS", 
      settings: "High", 
      games: "Apex (High), Overwatch 2 (High), Fortnite (High)" 
    }
  },
  // Mid CPU + Low GPU
  "mid_low": {
    esport: { 
      fps: "60-80 FPS", 
      settings: "Medium", 
      games: "CS2 (Medium), Valorant (High), LoL (High)" 
    },
    aaa_gpu: { 
      fps: "30-40 FPS", 
      settings: "Low", 
      games: "Cyberpunk 2077 (Low), Starfield (Low), RDR2 (Low)" 
    },
    competitive: { 
      fps: "50-70 FPS", 
      settings: "Medium", 
      games: "Apex (Medium), Overwatch 2 (Medium), Fortnite (Medium)" 
    }
  },
  // Mid CPU + Mid GPU
  "mid_mid": {
    esport: { 
      fps: "90-120 FPS", 
      settings: "High", 
      games: "CS2 (High), Valorant (High), LoL (Ultra)" 
    },
    aaa_gpu: { 
      fps: "45-55 FPS", 
      settings: "Medium", 
      games: "Cyberpunk 2077 (Medium), Starfield (Medium), RDR2 (Medium)" 
    },
    competitive: { 
      fps: "70-90 FPS", 
      settings: "High", 
      games: "Apex (High), Overwatch 2 (High), Fortnite (High)" 
    }
  },
  // Mid CPU + High GPU
  "mid_high": {
    esport: { 
      fps: "120-165 FPS", 
      settings: "Ultra", 
      games: "CS2 (Ultra), Valorant (Ultra), LoL (Ultra)" 
    },
    aaa_gpu: { 
      fps: "55-70 FPS", 
      settings: "High", 
      games: "Cyberpunk 2077 (High), Starfield (Medium-High), RDR2 (High)" 
    },
    competitive: { 
      fps: "90-120 FPS", 
      settings: "Ultra", 
      games: "Apex (Ultra), Overwatch 2 (Ultra), Fortnite (Ultra)" 
    }
  },
  // High CPU + Low GPU
  "high_low": {
    esport: { 
      fps: "70-90 FPS", 
      settings: "Medium", 
      games: "CS2 (High), Valorant (High), LoL (Ultra)" 
    },
    aaa_gpu: { 
      fps: "35-45 FPS", 
      settings: "Low", 
      games: "Cyberpunk 2077 (Low), Starfield (Low), RDR2 (Low)" 
    },
    competitive: { 
      fps: "60-80 FPS", 
      settings: "Medium", 
      games: "Apex (High), Overwatch 2 (High), Fortnite (High)" 
    }
  },
  // High CPU + Mid GPU
  "high_mid": {
    esport: { 
      fps: "100-144 FPS", 
      settings: "Ultra", 
      games: "CS2 (Ultra), Valorant (Ultra), LoL (Ultra)" 
    },
    aaa_gpu: { 
      fps: "50-65 FPS", 
      settings: "High", 
      games: "Cyberpunk 2077 (High), Starfield (Medium), RDR2 (High)" 
    },
    competitive: { 
      fps: "80-110 FPS", 
      settings: "Ultra", 
      games: "Apex (Ultra), Overwatch 2 (Ultra), Fortnite (Ultra)" 
    }
  },
  // High CPU + High GPU
  "high_high": {
    esport: { 
      fps: "165-240+ FPS", 
      settings: "Ultra", 
      games: "CS2 (Ultra), Valorant (Ultra), LoL (Ultra)" 
    },
    aaa_gpu: { 
      fps: "80-110 FPS", 
      settings: "Ultra", 
      games: "Cyberpunk 2077 (Ultra), Starfield (High-Ultra), RDR2 (Ultra)" 
    },
    competitive: { 
      fps: "120-165 FPS", 
      settings: "Ultra", 
      games: "Apex (Ultra), Overwatch 2 (Ultra), Fortnite (Ultra)" 
    }
  }
};

// Combine all components
const allCPUs = [...mockData.cpus.low, ...mockData.cpus.mid, ...mockData.cpus.high];
const allGPUs = [...mockData.gpus.low, ...mockData.gpus.mid, ...mockData.gpus.high];
const allRAM = [...mockData.ram.low, ...mockData.ram.mid, ...mockData.ram.high];
const allStorage = [...mockData.storage.low, ...mockData.storage.mid, ...mockData.storage.high];

export const mockBenchmarkService = {
  // List components by type
  async listComponents(type, limit = 50) {
    console.log(`📋 Mock: Fetching ${type}`);
    
    let components = [];
    switch(type) {
      case 'CPU': components = allCPUs; break;
      case 'GPU': components = allGPUs; break;
      case 'RAM': components = allRAM; break;
      case 'STORAGE': components = allStorage; break;
      default: return [];
    }
    
    return components.slice(0, limit);
  },

  // Search components
  async searchComponents(name, type) {
    console.log(`🔍 Mock: Searching ${type} for "${name}"`);
    
    let components = [];
    switch(type) {
      case 'CPU': components = allCPUs; break;
      case 'GPU': components = allGPUs; break;
      case 'RAM': components = allRAM; break;
      case 'STORAGE': components = allStorage; break;
      default: return [];
    }
    
    return components.filter(c => 
      c.name.toLowerCase().includes(name.toLowerCase())
    );
  },

  // Get component details
  async getComponentDetails(name, type) {
    console.log(`📦 Mock: Getting details for ${name}`);
    
    let components = [];
    switch(type) {
      case 'CPU': components = allCPUs; break;
      case 'GPU': components = allGPUs; break;
      case 'RAM': components = allRAM; break;
      case 'STORAGE': components = allStorage; break;
      default: return null;
    }
    
    return components.find(c => 
      c.name.toLowerCase().includes(name.toLowerCase())
    ) || null;
  },

  // Analyze CPU+GPU pairing
  async analyzePairing(cpu, gpu) {
    console.log(`🔧 Mock: Analyzing ${cpu} + ${gpu}`);
    
    // Get CPU and GPU tiers
    const cpuItem = allCPUs.find(c => c.name.toLowerCase().includes(cpu.toLowerCase()));
    const gpuItem = allGPUs.find(g => g.name.toLowerCase().includes(gpu.toLowerCase()));
    
    const cpuTier = cpuItem?.tier || 'mid';
    const gpuTier = gpuItem?.tier || 'mid';
    
    // Calculate balance score
    const cpuScore = cpuItem?.score || 50;
    const gpuScore = gpuItem?.score || 50;
    const balanceScore = Math.round((cpuScore + gpuScore) / 2);
    
    // Determine bottleneck
    let bottleneck = "none";
    if (cpuScore < gpuScore * 0.6) bottleneck = "cpu";
    if (gpuScore < cpuScore * 0.6) bottleneck = "gpu";
    
    return {
      cpu: { name: cpu, score: cpuScore, tier: cpuTier },
      gpu: { name: gpu, score: gpuScore, tier: gpuTier },
      overall_balance_score: balanceScore,
      overall_verdict: bottleneck === "none" ? "Balanced" : `${bottleneck.toUpperCase()} Limited`,
      bottleneck: bottleneck,
      by_category: {
        esport: { 
          balance_score: balanceScore + 5, 
          performance: balanceScore >= 80 ? "excellent" : balanceScore >= 60 ? "good" : "average" 
        },
        aaa_gpu: { 
          balance_score: balanceScore - 5, 
          bottleneck: bottleneck 
        }
      }
    };
  },

  // Get gaming profile with realistic FPS estimates
  async getGamingProfile(cpu, gpu, resolution = '1080p') {
    console.log(`🎮 Mock: Getting gaming profile for ${cpu} + ${gpu}`);
    
    // Get CPU and GPU tiers
    const cpuItem = allCPUs.find(c => c.name.toLowerCase().includes(cpu.toLowerCase()));
    const gpuItem = allGPUs.find(g => g.name.toLowerCase().includes(gpu.toLowerCase()));
    
    const cpuTier = cpuItem?.tier || 'mid';
    const gpuTier = gpuItem?.tier || 'mid';
    
    // Get FPS data based on combination
    const combination = `${cpuTier}_${gpuTier}`;
    const fps = fpsDatabase[combination] || fpsDatabase.mid_mid;
    
    return {
      performance_by_category: {
        esport: fps.esport,
        aaa_gpu: fps.aaa_gpu,
        competitive: fps.competitive
      },
      resolution_used: resolution,
      notes: "Estimates based on 1080p benchmarks. Lower settings may improve FPS."
    };
  },

  // Analyze complete PC build
  async analyzePCBuild(specs) {
    const { cpu, gpu, ram, storage } = specs;
    
    const [cpuData, gpuData, ramData, storageData] = await Promise.all([
      this.getComponentDetails(cpu, 'CPU'),
      this.getComponentDetails(gpu, 'GPU'),
      this.getComponentDetails(ram, 'RAM'),
      this.getComponentDetails(storage, 'STORAGE')
    ]);

    const components = {
      cpu: cpuData || { name: cpu, score: 50, tier: 'mid' },
      gpu: gpuData || { name: gpu, score: 50, tier: 'mid' },
      ram: ramData || { name: ram, score: 50, tier: 'mid' },
      storage: storageData || { name: storage, score: 50, tier: 'mid' }
    };

    const overallScore = this.calculateOverallScore(components);
    const gamingProfile = await this.getGamingProfile(cpu, gpu);
    const pairing = await this.analyzePairing(cpu, gpu);

    return {
      components,
      overallScore,
      performanceTier: this.getPerformanceTier(overallScore),
      bottlenecks: this.identifyBottlenecks(components, pairing),
      fpsEstimates: gamingProfile.performance_by_category,
      pairing: {
        balance: pairing.overall_balance_score,
        verdict: pairing.overall_verdict,
        bottleneck: pairing.bottleneck
      },
      recommendations: this.generateRecommendations(components, pairing)
    };
  },

  // Calculate overall score with realistic weighting
  calculateOverallScore(components) {
    const weights = { cpu: 0.35, gpu: 0.45, ram: 0.15, storage: 0.05 };
    let score = 0;
    let weight = 0;
    
    Object.entries(components).forEach(([key, comp]) => {
      if (comp?.score) {
        score += comp.score * weights[key];
        weight += weights[key];
      }
    });
    
    return weight > 0 ? Math.round(score / weight) : 0;
  },

  // Get performance tier with realistic descriptions
  getPerformanceTier(score) {
    if (score >= 90) return { 
      label: 'Enthusiast Grade', 
      color: '#9f7aea', 
      description: 'Capable of 4K gaming at high settings. Handles any game with ease.' 
    };
    if (score >= 80) return { 
      label: 'High Performance', 
      color: '#b794f4', 
      description: 'Excellent 1440p gaming rig. Great for AAA titles at high settings.' 
    };
    if (score >= 70) return { 
      label: 'Upper Mid-Range', 
      color: '#d6bcfa', 
      description: 'Solid 1080p/1440p performer. Handles most games at high settings.' 
    };
    if (score >= 60) return { 
      label: 'Mid-Range', 
      color: '#c4b5fd', 
      description: 'Good 1080p gaming. Plays most games at medium-high settings.' 
    };
    if (score >= 45) return { 
      label: 'Entry Level', 
      color: '#9f7aea', 
      description: 'Capable 1080p gaming for esports and older titles at low-medium settings.' 
    };
    return { 
      label: 'Budget Build', 
      color: '#6b46c1', 
      description: 'Basic gaming performance. Best for esports titles at low settings (30-40 FPS).' 
    };
  },

  // Identify bottlenecks realistically
  identifyBottlenecks(components, pairing) {
    const bottlenecks = [];
    
    if (components.cpu && components.gpu) {
      const cpuScore = components.cpu.score;
      const gpuScore = components.gpu.score;
      
      if (cpuScore < gpuScore * 0.5) {
        bottlenecks.push({
          type: 'cpu',
          severity: 'high',
          message: `Significant CPU bottleneck: Your ${components.cpu.name} is too weak for your ${components.gpu.name}. You're leaving a lot of performance on the table.`
        });
      } else if (gpuScore < cpuScore * 0.5) {
        bottlenecks.push({
          type: 'gpu',
          severity: 'high',
          message: `Significant GPU bottleneck: Your ${components.gpu.name} can't keep up with your ${components.cpu.name}. A GPU upgrade would dramatically improve FPS.`
        });
      } else if (cpuScore < gpuScore * 0.7) {
        bottlenecks.push({
          type: 'cpu',
          severity: 'medium',
          message: `CPU limitation in CPU-intensive games like strategy titles and simulators. Expect lower FPS in these games.`
        });
      } else if (gpuScore < cpuScore * 0.7) {
        bottlenecks.push({
          type: 'gpu',
          severity: 'medium',
          message: `GPU limits performance in graphics-heavy games. Lower settings for smoother gameplay in AAA titles.`
        });
      }
    }

    if (components.ram && components.ram.score < 40) {
      bottlenecks.push({
        type: 'ram',
        severity: 'low',
        message: `RAM speed/capacity (${components.ram.speed || 'slow'}) may cause stuttering in modern games. 16GB 3200MHz+ recommended.`
      });
    }

    return bottlenecks;
  },

  // Generate realistic upgrade recommendations
  generateRecommendations(components, pairing) {
    const recommendations = [];
    
    const scores = Object.entries(components)
      .filter(([_, comp]) => comp?.score)
      .map(([type, comp]) => ({ type, score: comp.score }));
    
    if (scores.length > 0) {
      const weakest = scores.reduce((min, current) => 
        current.score < min.score ? current : min
      );
      
      const typeNames = {
        cpu: 'processor',
        gpu: 'graphics card',
        ram: 'RAM',
        storage: 'storage'
      };
      
      const upgradeMessages = {
        cpu: `Your ${components.cpu.name} holds back performance. A ${components.cpu.tier === 'low' ? 'Ryzen 5 5600X ($150) or i5-12400F ($140)' : 'Ryzen 7 7800X3D ($350)'} would balance your system.`,
        gpu: `Upgrading your ${components.gpu.name} would give the biggest FPS boost. Consider an ${components.gpu.tier === 'low' ? 'RTX 3060 ($280) or RX 6600 ($200)' : 'RTX 4070 ($500) or RX 7800 XT ($480)'}.`,
        ram: `Your ${components.ram.name} is slow. 16GB DDR4-3200 ($40) or DDR5-6000 ($80) would improve minimum FPS.`,
        storage: `Your ${components.storage.name} is slow. An NVMe SSD ($50-100) would reduce load times dramatically.`
      };
      
      recommendations.push({
        component: weakest.type,
        priority: 'high',
        message: upgradeMessages[weakest.type] || `Upgrading your ${typeNames[weakest.type]} would give the biggest performance boost.`
      });
    }

    // Add specific recommendations based on pairing
    if (pairing?.bottleneck === 'cpu') {
      recommendations.push({
        component: 'cpu',
        priority: 'medium',
        message: `CPU upgrade recommended for higher FPS in esports titles like CS2 and Valorant.`
      });
    }
    
    if (pairing?.bottleneck === 'gpu') {
      recommendations.push({
        component: 'gpu',
        priority: 'medium',
        message: `GPU upgrade recommended for better visuals and FPS in AAA games like Cyberpunk 2077.`
      });
    }

    if (components.gpu && components.gpu.score < 45) {
      recommendations.push({
        component: 'gpu',
        priority: 'medium',
        message: `For 1080p gaming at 60 FPS, a ${components.gpu.tier === 'low' ? 'GTX 1660 Super ($200) or RTX 3050 ($230)' : 'RTX 3060 ($280)'} would be a solid upgrade.`
      });
    }

    return recommendations;
  }
};