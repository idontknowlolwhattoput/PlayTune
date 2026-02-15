// MainContent.jsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaSearch,
  FaStar,
  FaGamepad,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaWindows,
  FaApple,
  FaLinux,
  FaPlaystation,
  FaXbox,
  FaMicrochip,
  FaChartLine,
  FaMemory,
  FaHdd,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaTachometerAlt,
  FaCog,
  FaInfoCircle,
  FaQuestionCircle,
} from "react-icons/fa";
import { mockBenchmarkService } from "../services/benchmarkService";

// RAWG API configuration
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

// Hardware performance database (in real app, this would come from your benchmark service)
const hardwarePerformanceDB = {
  cpus: [
    // Low-end
    {
      name: "Intel Core i3-10100",
      score: 45,
      tier: "low",
      matches: ["i3-10100", "i3"],
    },
    {
      name: "AMD Ryzen 3 3100",
      score: 43,
      tier: "low",
      matches: ["ryzen 3", "r3"],
    },
    {
      name: "Intel Pentium Gold G6400",
      score: 38,
      tier: "low",
      matches: ["pentium", "g6400"],
    },
    // Mid-range
    {
      name: "Intel Core i5-12400F",
      score: 72,
      tier: "mid",
      matches: ["i5-12400", "i5"],
    },
    {
      name: "AMD Ryzen 5 5600X",
      score: 75,
      tier: "mid",
      matches: ["ryzen 5", "r5 5600"],
    },
    {
      name: "Intel Core i5-11400",
      score: 68,
      tier: "mid",
      matches: ["i5-11400"],
    },
    // High-end
    {
      name: "AMD Ryzen 7 7800X3D",
      score: 95,
      tier: "high",
      matches: ["ryzen 7", "r7 7800"],
    },
    {
      name: "Intel Core i9-13900K",
      score: 98,
      tier: "high",
      matches: ["i9-13900", "i9"],
    },
    {
      name: "AMD Ryzen 9 7950X",
      score: 96,
      tier: "high",
      matches: ["ryzen 9", "r9 7950"],
    },
  ],
  gpus: [
    // Low-end
    {
      name: "NVIDIA GTX 1050 Ti",
      score: 32,
      tier: "low",
      matches: ["1050 ti", "gtx 1050"],
    },
    {
      name: "NVIDIA GTX 1650",
      score: 38,
      tier: "low",
      matches: ["1650", "gtx 1650"],
    },
    {
      name: "AMD Radeon RX 6400",
      score: 35,
      tier: "low",
      matches: ["6400", "rx 6400"],
    },
    // Mid-range
    {
      name: "NVIDIA RTX 3060",
      score: 68,
      tier: "mid",
      matches: ["3060", "rtx 3060"],
    },
    {
      name: "AMD Radeon RX 6600",
      score: 65,
      tier: "mid",
      matches: ["6600", "rx 6600"],
    },
    {
      name: "NVIDIA RTX 3060 Ti",
      score: 72,
      tier: "mid",
      matches: ["3060 ti", "rtx 3060 ti"],
    },
    // High-end
    {
      name: "NVIDIA RTX 3090",
      score: 94,
      tier: "high",
      matches: ["3090", "rtx 3090"],
    },
    {
      name: "NVIDIA RTX 4090",
      score: 98,
      tier: "high",
      matches: ["4090", "rtx 4090"],
    },
    {
      name: "AMD Radeon RX 7900 XTX",
      score: 90,
      tier: "high",
      matches: ["7900 xtx", "rx 7900"],
    },
  ],
};

export default function MainContent() {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreGames, setGenreGames] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");

  // PC specs state
  const [pcSpecs, setPcSpecs] = useState({
    cpu: "",
    gpu: "",
    ram: "",
    storage: "",
  });

  const [compatibilityResult, setCompatibilityResult] = useState(null);
  const [checkingCompatibility, setCheckingCompatibility] = useState(false);

  // Component lists
  const [cpuList, setCpuList] = useState([]);
  const [gpuList, setGpuList] = useState([]);
  const [ramList, setRamList] = useState([]);
  const [storageList, setStorageList] = useState([]);

  const rowRefs = useRef({});
  const heroInterval = useRef(null);

  // Fetch components
  useEffect(() => {
    fetchComponents();
  }, []);

  useEffect(() => {
    fetchAllData();
    return () => {
      if (heroInterval.current) {
        clearInterval(heroInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (featuredGames.length > 0) {
      startHeroRotation();
    }
    return () => {
      if (heroInterval.current) {
        clearInterval(heroInterval.current);
      }
    };
  }, [featuredGames]);

  const fetchComponents = async () => {
    try {
      const [cpus, gpus, ram, storage] = await Promise.all([
        mockBenchmarkService.listComponents("CPU", 50),
        mockBenchmarkService.listComponents("GPU", 50),
        mockBenchmarkService.listComponents("RAM", 50),
        mockBenchmarkService.listComponents("STORAGE", 50),
      ]);

      setCpuList(cpus);
      setGpuList(gpus);
      setRamList(ram);
      setStorageList(storage);
    } catch (error) {
      console.error("Error fetching components:", error);
    }
  };

  const startHeroRotation = () => {
    if (heroInterval.current) {
      clearInterval(heroInterval.current);
    }
    heroInterval.current = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % featuredGames.length);
    }, 6000);
  };

  const handleHeroDotClick = (index) => {
    setCurrentHeroIndex(index);
    if (heroInterval.current) {
      clearInterval(heroInterval.current);
      startHeroRotation();
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const featuredResponse = await axios.get(`${BASE_URL}/games`, {
        params: {
          key: RAWG_API_KEY,
          page_size: 5,
          ordering: "-rating",
          metacritic: "85,100",
        },
      });
      setFeaturedGames(featuredResponse.data.results);

      const genresResponse = await axios.get(`${BASE_URL}/genres`, {
        params: {
          key: RAWG_API_KEY,
          page_size: 8,
        },
      });
      setGenres(genresResponse.data.results);

      const genreGamesData = {};
      for (const genre of genresResponse.data.results.slice(0, 6)) {
        const gamesResponse = await axios.get(`${BASE_URL}/games`, {
          params: {
            key: RAWG_API_KEY,
            genres: genre.id,
            page_size: 15,
            ordering: "-rating",
          },
        });
        genreGamesData[genre.id] = gamesResponse.data.results;
      }
      setGenreGames(genreGamesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollRow = (genreId, direction) => {
    const container = rowRefs.current[genreId];
    if (container) {
      const scrollAmount = direction === "left" ? -600 : 600;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const openGameDetails = (game) => {
    setSelectedGame(game);
    setShowModal(true);
    setActiveTab("details");
    setCompatibilityResult(null);
  };

  // Parse game requirements from RAWG data
  const parseGameRequirements = (game) => {
    // Default mock requirements (in real app, RAWG might have this data)
    // For now, we'll generate based on game rating and release year
    const baseScore = game.rating * 10; // Convert 1-5 rating to 10-50

    // Newer games have higher requirements
    const yearBonus = game.released
      ? Math.max(
          0,
          (new Date().getFullYear() - new Date(game.released).getFullYear()) *
            2,
        )
      : 0;

    // Popular/AAA games have higher requirements
    const popularityBonus = game.playtime
      ? Math.min(15, game.playtime / 10)
      : 10;

    const requirementScore = Math.min(
      90,
      baseScore + yearBonus + popularityBonus,
    );

    return {
      min: {
        cpu: requirementScore * 0.7,
        gpu: requirementScore * 0.7,
        ram: requirementScore * 0.5,
        storage: requirementScore * 0.3,
      },
      rec: {
        cpu: requirementScore,
        gpu: requirementScore,
        ram: requirementScore * 0.8,
        storage: requirementScore * 0.5,
      },
    };
  };

  // Find hardware match in database
  const findHardwareMatch = (hardwareName, type) => {
    const db =
      type === "cpu" ? hardwarePerformanceDB.cpus : hardwarePerformanceDB.gpus;
    const searchName = hardwareName.toLowerCase();

    // Try to find exact or partial match
    for (const item of db) {
      for (const match of item.matches) {
        if (searchName.includes(match.toLowerCase())) {
          return item;
        }
      }
    }

    // Default fallback based on name patterns
    if (type === "cpu") {
      if (
        searchName.includes("i9") ||
        searchName.includes("ryzen 9") ||
        searchName.includes("7950")
      ) {
        return { score: 95, tier: "high" };
      } else if (
        searchName.includes("i7") ||
        searchName.includes("ryzen 7") ||
        searchName.includes("7800")
      ) {
        return { score: 85, tier: "high" };
      } else if (
        searchName.includes("i5") ||
        searchName.includes("ryzen 5") ||
        searchName.includes("5600")
      ) {
        return { score: 70, tier: "mid" };
      } else if (searchName.includes("i3") || searchName.includes("ryzen 3")) {
        return { score: 45, tier: "low" };
      }
    } else {
      if (
        searchName.includes("4090") ||
        searchName.includes("3090") ||
        searchName.includes("7900")
      ) {
        return { score: 95, tier: "high" };
      } else if (
        searchName.includes("4070") ||
        searchName.includes("3080") ||
        searchName.includes("7800")
      ) {
        return { score: 80, tier: "high" };
      } else if (
        searchName.includes("3060") ||
        searchName.includes("4060") ||
        searchName.includes("6600")
      ) {
        return { score: 65, tier: "mid" };
      } else if (
        searchName.includes("1650") ||
        searchName.includes("1050") ||
        searchName.includes("6400")
      ) {
        return { score: 35, tier: "low" };
      }
    }

    return { score: 50, tier: "mid" };
  };

  const checkCompatibility = async () => {
    if (!pcSpecs.cpu || !pcSpecs.gpu || !pcSpecs.ram) {
      alert("Please select at least CPU, GPU, and RAM");
      return;
    }

    setCheckingCompatibility(true);

    // Simulate loading
    setTimeout(() => {
      const result = calculateCompatibility(selectedGame, pcSpecs);
      setCompatibilityResult(result);
      setCheckingCompatibility(false);
    }, 1000);
  };

  const calculateCompatibility = (game, specs) => {
    // Get user's hardware scores
    const userCPU = findHardwareMatch(specs.cpu, "cpu");
    const userGPU = findHardwareMatch(specs.gpu, "gpu");

    // Get RAM score based on capacity and speed
    const ramScore = specs.ram.includes("32GB")
      ? 85
      : specs.ram.includes("16GB")
        ? 60
        : specs.ram.includes("8GB")
          ? 35
          : 40;

    // Get storage score based on type
    const storageScore = specs.storage.includes("SSD")
      ? specs.storage.includes("NVMe")
        ? 80
        : 60
      : 30;

    // Parse game requirements
    const requirements = parseGameRequirements(game);

    // Compare scores
    const cpuComparison = {
      user: userCPU.score,
      required: requirements.rec.cpu,
      min: requirements.min.cpu,
      meetsMin: userCPU.score >= requirements.min.cpu,
      meetsRec: userCPU.score >= requirements.rec.cpu,
    };

    const gpuComparison = {
      user: userGPU.score,
      required: requirements.rec.gpu,
      min: requirements.min.gpu,
      meetsMin: userGPU.score >= requirements.min.gpu,
      meetsRec: userGPU.score >= requirements.rec.gpu,
    };

    const ramComparison = {
      user: ramScore,
      required: requirements.rec.ram,
      min: requirements.min.ram,
      meetsMin: ramScore >= requirements.min.ram,
      meetsRec: ramScore >= requirements.rec.ram,
    };

    const storageComparison = {
      user: storageScore,
      required: requirements.rec.storage,
      min: requirements.min.storage,
      meetsMin: storageScore >= requirements.min.storage,
      meetsRec: storageScore >= requirements.rec.storage,
    };

    // Calculate overall system score
    const systemScore =
      cpuComparison.user * 0.35 +
      gpuComparison.user * 0.45 +
      ramComparison.user * 0.15 +
      storageComparison.user * 0.05;

    const gameRequirementScore =
      requirements.rec.cpu * 0.35 +
      requirements.rec.gpu * 0.45 +
      requirements.rec.ram * 0.15 +
      requirements.rec.storage * 0.05;

    const difference = systemScore - gameRequirementScore;

    // Check if all components meet minimum
    const allMeetMin =
      cpuComparison.meetsMin &&
      gpuComparison.meetsMin &&
      ramComparison.meetsMin &&
      storageComparison.meetsMin;

    // Determine compatibility level
    let compatibility, color, icon, message;

    if (allMeetMin && cpuComparison.meetsRec && gpuComparison.meetsRec) {
      compatibility = "Perfect";
      color = "text-emerald-400";
      icon = <FaCheckCircle className="text-emerald-400 text-2xl" />;
      message =
        "Your PC exceeds or meets recommended requirements! You can run this game at high/ultra settings.";
    } else if (allMeetMin) {
      compatibility = "Good";
      color = "text-blue-400";
      icon = <FaCheckCircle className="text-blue-400 text-2xl" />;
      message =
        "Your PC meets minimum requirements. Game should run at medium settings.";
    } else if (!cpuComparison.meetsMin && gpuComparison.meetsMin) {
      compatibility = "CPU Limited";
      color = "text-yellow-400";
      icon = <FaExclamationTriangle className="text-yellow-400 text-2xl" />;
      message =
        "Your CPU may struggle. Consider lowering settings or upgrading CPU.";
    } else if (cpuComparison.meetsMin && !gpuComparison.meetsMin) {
      compatibility = "GPU Limited";
      color = "text-yellow-400";
      icon = <FaExclamationTriangle className="text-yellow-400 text-2xl" />;
      message =
        "Your GPU may struggle. Lower graphics settings for better performance.";
    } else {
      compatibility = "Insufficient";
      color = "text-rose-400";
      icon = <FaTimesCircle className="text-rose-400 text-2xl" />;
      message =
        "Your PC does not meet minimum requirements. Game may not run well.";
    }

    // Component analysis
    const componentAnalysis = [
      {
        name: "CPU",
        userScore: cpuComparison.user,
        minReq: cpuComparison.min,
        recReq: cpuComparison.required,
        userComponent: specs.cpu,
        status: cpuComparison.meetsRec
          ? "Excellent"
          : cpuComparison.meetsMin
            ? "Good"
            : "Weak",
        color: cpuComparison.meetsRec
          ? "text-emerald-400"
          : cpuComparison.meetsMin
            ? "text-blue-400"
            : "text-rose-400",
      },
      {
        name: "GPU",
        userScore: gpuComparison.user,
        minReq: gpuComparison.min,
        recReq: gpuComparison.required,
        userComponent: specs.gpu,
        status: gpuComparison.meetsRec
          ? "Excellent"
          : gpuComparison.meetsMin
            ? "Good"
            : "Weak",
        color: gpuComparison.meetsRec
          ? "text-emerald-400"
          : gpuComparison.meetsMin
            ? "text-blue-400"
            : "text-rose-400",
      },
      {
        name: "RAM",
        userScore: ramComparison.user,
        minReq: ramComparison.min,
        recReq: ramComparison.required,
        userComponent: specs.ram,
        status: ramComparison.meetsRec
          ? "Excellent"
          : ramComparison.meetsMin
            ? "Good"
            : "Weak",
        color: ramComparison.meetsRec
          ? "text-emerald-400"
          : ramComparison.meetsMin
            ? "text-blue-400"
            : "text-rose-400",
      },
      {
        name: "Storage",
        userScore: storageComparison.user,
        minReq: storageComparison.min,
        recReq: storageComparison.required,
        userComponent: specs.storage,
        status: storageComparison.meetsRec
          ? "Excellent"
          : storageComparison.meetsMin
            ? "Good"
            : "Weak",
        color: storageComparison.meetsRec
          ? "text-emerald-400"
          : storageComparison.meetsMin
            ? "text-blue-400"
            : "text-rose-400",
      },
    ];

    // Bottlenecks
    const bottlenecks = [];
    if (!cpuComparison.meetsMin) {
      bottlenecks.push(
        `Your CPU (${specs.cpu}) is below minimum requirements.`,
      );
    }
    if (!gpuComparison.meetsMin) {
      bottlenecks.push(
        `Your GPU (${specs.gpu}) is below minimum requirements.`,
      );
    }
    if (!ramComparison.meetsMin) {
      bottlenecks.push(
        `Your RAM is below minimum requirements. Consider upgrading.`,
      );
    }
    if (
      cpuComparison.meetsMin &&
      gpuComparison.meetsMin &&
      cpuComparison.user < gpuComparison.user * 0.7
    ) {
      bottlenecks.push("Your CPU may bottleneck your GPU in this game.");
    }
    if (
      gpuComparison.meetsMin &&
      cpuComparison.meetsMin &&
      gpuComparison.user < cpuComparison.user * 0.7
    ) {
      bottlenecks.push("Your GPU is the main limiting factor for this game.");
    }

    // FPS estimate
    let estimatedFPS;
    let settings;
    if (systemScore >= 85) {
      estimatedFPS = "100+ FPS";
      settings = "Ultra/High";
    } else if (systemScore >= 70) {
      estimatedFPS = "60-100 FPS";
      settings = "High";
    } else if (systemScore >= 50) {
      estimatedFPS = "40-60 FPS";
      settings = "Medium";
    } else if (systemScore >= 35) {
      estimatedFPS = "25-40 FPS";
      settings = "Low";
    } else {
      estimatedFPS = "<25 FPS";
      settings = "Low (Unplayable)";
    }

    return {
      compatibility,
      color,
      icon,
      message,
      systemScore: Math.round(systemScore),
      gameReqScore: Math.round(gameRequirementScore),
      difference: Math.round(difference),
      estimatedFPS,
      settings,
      resolution:
        systemScore >= 80
          ? "1440p/4K"
          : systemScore >= 60
            ? "1080p/1440p"
            : "1080p",
      componentAnalysis,
      bottlenecks,
      meetsMinimum: allMeetMin,
      cpuComparison,
      gpuComparison,
    };
  };

  const getPlatformIcon = (platform) => {
    if (platform.includes("PC")) return <FaWindows className="text-xs" />;
    if (platform.includes("macOS")) return <FaApple className="text-xs" />;
    if (platform.includes("Linux")) return <FaLinux className="text-xs" />;
    if (platform.includes("PlayStation"))
      return <FaPlaystation className="text-xs" />;
    if (platform.includes("Xbox")) return <FaXbox className="text-xs" />;
    return null;
  };

  const renderDropdown = (type, list, placeholder, icon) => (
    <div className="relative">
      <select
        value={pcSpecs[type]}
        onChange={(e) =>
          setPcSpecs((prev) => ({ ...prev, [type]: e.target.value }))
        }
        className="w-full appearance-none bg-[#1a1a24] text-white border border-[#2a2a35] rounded-lg px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-[#9f7aea] focus:ring-1 focus:ring-[#9f7aea] transition-all cursor-pointer"
      >
        <option value="" className="bg-[#1a1a24] text-gray-500">
          Select {placeholder}
        </option>
        {list.map((item, index) => (
          <option key={index} value={item.name} className="bg-[#1a1a24]">
            {item.name} ({item.score} pts)
          </option>
        ))}
      </select>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9f7aea]"></div>
      </div>
    );
  }

  return (
    <div className="inter w-full h-full bg-[#0a0a0f] overflow-y-auto overflow-x-hidden font-['Inter',sans-serif]">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] flex-shrink-0">
        {featuredGames.map((game, index) => (
          <div
            key={game.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroIndex
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0">
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent"></div>
            </div>

            <div className="absolute bottom-16 left-16 max-w-2xl z-10">
              <h1 className="relative text-5xl font-bold mb-5 tracking-tight">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 bg-clip-text text-transparent blur-xl opacity-50">
                  {game.name}
                </span>
                <span className="relative bg-gradient-to-r from-[#9f7aea] via-white to-[#b794f4] bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(159,122,234,0.5)]">
                  {game.name}
                </span>
              </h1>

              <div className="flex items-center gap-4 text-sm mb-3">
                <span className="flex items-center gap-1 text-[#9f7aea] font-medium">
                  <FaStar className="text-[#9f7aea]" /> {game.rating.toFixed(1)}
                  /5
                </span>
                <span className="text-gray-400 font-light">
                  {new Date(game.released).getFullYear()}
                </span>
                <span className="text-gray-400 font-light">
                  {game.genres
                    ?.slice(0, 2)
                    .map((g) => g.name)
                    .join(" • ")}
                </span>
              </div>

              <p className="text-gray-300 text-sm font-light mb-4 line-clamp-2 max-w-xl">
                {game.description_raw?.substring(0, 150)}...
              </p>

              <button
                onClick={() => openGameDetails(game)}
                className="flex items-center gap-2 bg-[#9f7aea] hover:bg-[#b794f4] text-white px-5 py-2 rounded-md font-medium text-sm transition-all"
              >
                <FaPlay className="text-xs" /> View Details
              </button>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-16 flex gap-1.5 z-10">
          {featuredGames.map((_, index) => (
            <button
              key={index}
              onClick={() => handleHeroDotClick(index)}
              className={`h-1 transition-all ${
                index === currentHeroIndex
                  ? "w-8 bg-[#9f7aea]"
                  : "w-4 bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Genre Rows */}
      <div className="pt-6 pb-16">
        {genres.slice(0, 6).map((genre) => (
          <div key={genre.id} className="mb-8 group/row">
            <div className="flex items-center justify-between px-6 mb-2">
              <h2 className="text-lg font-medium text-white tracking-wide">
                {genre.name}{" "}
                <span className="text-gray-500 text-xs ml-2 font-light">
                  ({genre.games_count})
                </span>
              </h2>
              <span className="text-xs text-gray-500 hover:text-[#9f7aea] transition-colors cursor-pointer uppercase tracking-wider">
                View All
              </span>
            </div>

            <div className="relative px-6">
              <button
                onClick={() => scrollRow(genre.id, "left")}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-[#1a1a2e] hover:bg-[#2d1b4e] text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all shadow-lg"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              <div
                ref={(el) => (rowRefs.current[genre.id] = el)}
                className="flex gap-2 overflow-x-auto scrollbar-hide py-1 scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {genreGames[genre.id]?.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => openGameDetails(game)}
                    className="flex-none w-[140px] cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="relative rounded-md overflow-hidden bg-[#1a1a2e]">
                      <div className="aspect-[2/3] w-full relative">
                        {game.background_image ? (
                          <img
                            src={game.background_image}
                            alt={game.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#2d1b4e] to-[#1a1a2e] flex items-center justify-center">
                            <FaGamepad className="text-white/20 text-3xl" />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-70"></div>

                        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                          <FaStar className="text-[#9f7aea] text-[8px]" />
                          <span className="text-white text-[9px] font-medium">
                            {game.rating.toFixed(1)}
                          </span>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-1.5">
                          <h3 className="text-white text-[11px] font-medium leading-tight mb-1 line-clamp-2 drop-shadow-lg">
                            {game.name}
                          </h3>

                          <div className="flex items-center gap-1 text-[8px] text-gray-300">
                            <span className="bg-black/40 px-1 py-0.5 rounded">
                              {new Date(game.released)?.getFullYear() || "TBA"}
                            </span>

                            {game.parent_platforms &&
                              game.parent_platforms.length > 0 && (
                                <span className="flex items-center gap-0.5 bg-black/40 px-1 py-0.5 rounded">
                                  {game.parent_platforms
                                    .slice(0, 2)
                                    .map((p) => (
                                      <span key={p.platform.id}>
                                        {getPlatformIcon(p.platform.name)}
                                      </span>
                                    ))}
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollRow(genre.id, "right")}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-[#1a1a2e] hover:bg-[#2d1b4e] text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all shadow-lg"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Game Details Modal with Compatibility Check */}
      {showModal && selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0f0f14] rounded-lg border border-[#2a2a35]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-[#2a2a35] rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#9f7aea] transition-colors"
            >
              <FaTimes className="text-sm" />
            </button>

            {/* Modal Header with Tabs */}
            <div className="border-b border-[#2a2a35]">
              <div className="flex gap-4 px-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`py-4 text-sm font-medium transition-colors relative ${
                    activeTab === "details"
                      ? "text-[#9f7aea] border-b-2 border-[#9f7aea]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Game Details
                </button>
                <button
                  onClick={() => setActiveTab("compatibility")}
                  className={`py-4 text-sm font-medium transition-colors relative ${
                    activeTab === "compatibility"
                      ? "text-[#9f7aea] border-b-2 border-[#9f7aea]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Can I Run It?
                </button>
              </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-[200px] w-full">
              <img
                src={
                  selectedGame.background_image ||
                  "https://via.placeholder.com/1200x400/1a1a2e/9f7aea?text=No+Image"
                }
                alt={selectedGame.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-[#0f0f14]/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-light text-white mb-1">
                  {selectedGame.name}
                </h2>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-[#9f7aea]" />{" "}
                    {selectedGame.rating.toFixed(1)}
                  </span>
                  <span>•</span>
                  <span>{new Date(selectedGame.released).getFullYear()}</span>
                  <span>•</span>
                  <span>
                    {selectedGame.genres
                      ?.slice(0, 2)
                      .map((g) => g.name)
                      .join(", ")}
                  </span>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "details" ? (
                /* Game Details Tab */
                <>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-[#9f7aea] mb-2 uppercase tracking-wider">
                      About
                    </h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                      {selectedGame.description_raw ||
                        "No description available."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#9f7aea] mb-3 uppercase tracking-wider">
                      System Requirements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#1a1a24] rounded-lg p-4">
                        <h4 className="text-xs font-medium text-white mb-3">
                          Minimum
                        </h4>
                        <ul className="space-y-2 text-xs">
                          <li className="flex gap-2">
                            <span className="text-gray-500 w-16">OS:</span>
                            <span className="text-gray-300">Windows 10</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-gray-500 w-16">CPU:</span>
                            <span className="text-gray-300">
                              Intel Core i5-3570K
                            </span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-gray-500 w-16">RAM:</span>
                            <span className="text-gray-300">8 GB</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-gray-500 w-16">GPU:</span>
                            <span className="text-gray-300">
                              NVIDIA GTX 780
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-[#1a1a24] rounded-lg p-4">
                        <h4 className="text-xs font-medium text-white mb-3">
                          Recommended
                        </h4>
                        <ul className="space-y-2 text-xs">
                          <li className="flex gap-2">
                            <span className="text-gray-500 w-16">OS:</span>
                            <span className="text-gray-300">Windows 11</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-gray-500 w-16">CPU:</span>
                            <span className="text-gray-300">
                              Intel Core i7-4790
                            </span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-gray-500 w-16">RAM:</span>
                            <span className="text-gray-300">16 GB</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-gray-500 w-16">GPU:</span>
                            <span className="text-gray-300">
                              NVIDIA GTX 1060
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Compatibility Check Tab */
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-[#9f7aea] mb-3 uppercase tracking-wider">
                      Your PC Specs
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        {renderDropdown(
                          "cpu",
                          cpuList,
                          "CPU",
                          <FaMicrochip className="text-sm" />,
                        )}
                        {renderDropdown(
                          "gpu",
                          gpuList,
                          "GPU",
                          <FaChartLine className="text-sm" />,
                        )}
                      </div>
                      <div className="space-y-4">
                        {renderDropdown(
                          "ram",
                          ramList,
                          "RAM",
                          <FaMemory className="text-sm" />,
                        )}
                        {renderDropdown(
                          "storage",
                          storageList,
                          "Storage",
                          <FaHdd className="text-sm" />,
                        )}
                      </div>
                    </div>

                    <button
                      onClick={checkCompatibility}
                      disabled={
                        checkingCompatibility ||
                        !pcSpecs.cpu ||
                        !pcSpecs.gpu ||
                        !pcSpecs.ram
                      }
                      className="mt-4 w-full bg-gradient-to-r from-[#9f7aea] to-[#b794f4] text-white py-3 rounded-lg font-medium text-sm hover:from-[#b794f4] hover:to-[#9f7aea] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {checkingCompatibility ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Analyzing Compatibility...</span>
                        </>
                      ) : (
                        <>
                          <FaTachometerAlt />
                          <span>Check Compatibility</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Compatibility Results */}
                  {compatibilityResult && (
                    <div className="space-y-4 animate-in fade-in duration-500">
                      {/* Overall Result */}
                      <div
                        className={`bg-[#1a1a24] rounded-lg p-6 border ${compatibilityResult.color} border-opacity-20`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-[#0f0f14] rounded-full">
                            {compatibilityResult.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4
                                className={`text-lg font-medium ${compatibilityResult.color}`}
                              >
                                {compatibilityResult.compatibility}
                              </h4>
                              <span
                                className={`text-3xl font-bold ${compatibilityResult.color}`}
                              >
                                {compatibilityResult.systemScore}%
                              </span>
                            </div>
                            <p className="text-sm text-gray-300 mb-3">
                              {compatibilityResult.message}
                            </p>

                            {/* Score Comparison Bar */}
                            <div className="relative h-2 bg-[#0f0f14] rounded-full overflow-hidden">
                              <div
                                className="absolute h-full bg-[#9f7aea] rounded-full"
                                style={{
                                  width: `${compatibilityResult.systemScore}%`,
                                }}
                              />
                              <div
                                className="absolute h-full w-0.5 bg-white"
                                style={{
                                  left: `${compatibilityResult.gameReqScore}%`,
                                }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>
                                Your PC: {compatibilityResult.systemScore}%
                              </span>
                              <span>
                                Required: {compatibilityResult.gameReqScore}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#1a1a24] rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">
                            Estimated FPS
                          </p>
                          <p
                            className={`text-sm font-medium ${compatibilityResult.color}`}
                          >
                            {compatibilityResult.estimatedFPS}
                          </p>
                        </div>
                        <div className="bg-[#1a1a24] rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">Settings</p>
                          <p className="text-sm font-medium text-white">
                            {compatibilityResult.settings}
                          </p>
                        </div>
                        <div className="bg-[#1a1a24] rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">
                            Resolution
                          </p>
                          <p className="text-sm font-medium text-white">
                            {compatibilityResult.resolution}
                          </p>
                        </div>
                        <div className="bg-[#1a1a24] rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-1">
                            Performance Gap
                          </p>
                          <p
                            className={`text-sm font-medium ${compatibilityResult.difference >= 0 ? "text-emerald-400" : "text-rose-400"}`}
                          >
                            {compatibilityResult.difference > 0 ? "+" : ""}
                            {compatibilityResult.difference}%
                          </p>
                        </div>
                      </div>

                      {/* Component Analysis */}
                      <div className="bg-[#1a1a24] rounded-lg p-4">
                        <h4 className="text-xs font-medium text-[#9f7aea] mb-3 uppercase tracking-wider">
                          Component Analysis
                        </h4>
                        <div className="space-y-4">
                          {compatibilityResult.componentAnalysis.map(
                            (component, index) => (
                              <div key={index}>
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-300 w-16">
                                      {component.name}
                                    </span>
                                    <span
                                      className="text-xs text-gray-500 truncate max-w-[150px]"
                                      title={component.userComponent}
                                    >
                                      {component.userComponent.length > 20
                                        ? component.userComponent.substring(
                                            0,
                                            20,
                                          ) + "..."
                                        : component.userComponent}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span
                                      className={`text-xs ${component.color}`}
                                    >
                                      {component.status}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {component.userScore} pts
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-2 bg-[#0f0f14] rounded-full overflow-hidden">
                                    <div
                                      className={`h-full ${
                                        component.userScore >= component.recReq
                                          ? "bg-emerald-400"
                                          : component.userScore >=
                                              component.minReq
                                            ? "bg-blue-400"
                                            : "bg-rose-400"
                                      }`}
                                      style={{
                                        width: `${Math.min(100, component.userScore)}%`,
                                      }}
                                    />
                                  </div>
                                  <div className="flex gap-2 text-[10px] text-gray-500">
                                    <span>
                                      Min: {Math.round(component.minReq)}
                                    </span>
                                    <span>
                                      Rec: {Math.round(component.recReq)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      {/* Bottlenecks & Recommendations */}
                      {compatibilityResult.bottlenecks.length > 0 && (
                        <div className="bg-[#1a1a24] rounded-lg p-4 border border-yellow-500/20">
                          <h4 className="text-xs font-medium text-yellow-400 mb-3 uppercase tracking-wider">
                            Potential Issues
                          </h4>
                          <div className="space-y-2">
                            {compatibilityResult.bottlenecks.map(
                              (bottleneck, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <FaExclamationTriangle className="text-yellow-400 text-xs mt-0.5" />
                                  <p className="text-xs text-gray-300">
                                    {bottleneck}
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {/* Upgrade Recommendations */}
                      {!compatibilityResult.meetsMinimum && (
                        <div className="bg-[#1a1a24] rounded-lg p-4 border border-[#9f7aea]/20">
                          <h4 className="text-xs font-medium text-[#9f7aea] mb-3 uppercase tracking-wider">
                            Upgrade Recommendations
                          </h4>
                          <div className="space-y-2">
                            {compatibilityResult.componentAnalysis
                              .filter((c) => c.userScore < c.minReq)
                              .map((component, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <FaInfoCircle className="text-[#9f7aea] text-xs mt-0.5" />
                                  <p className="text-xs text-gray-300">
                                    Your {component.name} (
                                    {component.userComponent}) is below minimum
                                    requirements.
                                    {component.name === "GPU" &&
                                      " Consider an RTX 3060 or RX 6600 for 1080p gaming."}
                                    {component.name === "CPU" &&
                                      " Consider an i5-12400F or Ryzen 5 5600X."}
                                    {component.name === "RAM" &&
                                      " 16GB DDR4-3200 is the sweet spot for gaming."}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
