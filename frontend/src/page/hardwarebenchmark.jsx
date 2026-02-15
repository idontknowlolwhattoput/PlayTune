// HardwareBenchmark.jsx
import { FaMicrochip, FaChartLine, FaMemory, FaHdd, FaSearch } from 'react-icons/fa';

export default function HardwareBenchmark() {
  return (
    <div className="w-full h-full bg-[#0a0a0f] overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-white mb-2">Hardware Benchmark</h1>
          <p className="text-gray-400 text-sm">Compare and benchmark computer components</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for CPUs, GPUs, RAM..."
            className="w-full px-4 py-3 bg-[#1a1a2e] border border-[#2d1b4e] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#9f7aea] pl-10"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[#2d1b4e] pb-4">
          {['CPUs', 'GPUs', 'RAM', 'Storage'].map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1a1a2e] rounded-lg transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Benchmark Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* CPU Card */}
          <div className="bg-[#1a1a2e] rounded-lg border border-[#2d1b4e] p-4 hover:border-[#9f7aea] transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <FaMicrochip className="text-[#9f7aea] text-lg" />
              <h3 className="text-white font-medium">Intel Core i9-13900K</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Cores/Threads</span>
                <span className="text-white">24/32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Base Clock</span>
                <span className="text-white">3.0 GHz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Benchmark</span>
                <span className="text-[#9f7aea] font-medium">62,384</span>
              </div>
              <div className="w-full bg-[#0a0a0f] h-1.5 rounded-full mt-2">
                <div className="w-[95%] h-full bg-[#9f7aea] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* GPU Card */}
          <div className="bg-[#1a1a2e] rounded-lg border border-[#2d1b4e] p-4 hover:border-[#9f7aea] transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <FaChartLine className="text-[#9f7aea] text-lg" />
              <h3 className="text-white font-medium">NVIDIA RTX 4090</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">VRAM</span>
                <span className="text-white">24 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">CUDA Cores</span>
                <span className="text-white">16,384</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Benchmark</span>
                <span className="text-[#9f7aea] font-medium">36,214</span>
              </div>
              <div className="w-full bg-[#0a0a0f] h-1.5 rounded-full mt-2">
                <div className="w-[98%] h-full bg-[#9f7aea] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* RAM Card */}
          <div className="bg-[#1a1a2e] rounded-lg border border-[#2d1b4e] p-4 hover:border-[#9f7aea] transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <FaMemory className="text-[#9f7aea] text-lg" />
              <h3 className="text-white font-medium">DDR5-6000 32GB</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Speed</span>
                <span className="text-white">6000 MHz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">CAS Latency</span>
                <span className="text-white">CL36</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Benchmark</span>
                <span className="text-[#9f7aea] font-medium">89</span>
              </div>
              <div className="w-full bg-[#0a0a0f] h-1.5 rounded-full mt-2">
                <div className="w-[89%] h-full bg-[#9f7aea] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}