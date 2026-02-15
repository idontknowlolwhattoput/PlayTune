// FPSPrediction.jsx
import { FaChartLine, FaMicrochip, FaMemory, FaHdd } from 'react-icons/fa';

export default function FPSPrediction() {
  return (
    <div className="w-full h-full bg-[#0a0a0f] overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-white mb-2">FPS Prediction</h1>
          <p className="text-gray-400 text-sm">Select your hardware to see estimated FPS for popular games</p>
        </div>

        {/* Hardware Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* CPU Selector */}
          <div className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2d1b4e]">
            <div className="flex items-center gap-3 mb-4">
              <FaMicrochip className="text-[#9f7aea] text-xl" />
              <h2 className="text-lg font-medium text-white">CPU</h2>
            </div>
            <select className="w-full bg-[#0a0a0f] text-white border border-[#2d1b4e] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#9f7aea]">
              <option>Intel Core i9-13900K</option>
              <option>Intel Core i7-13700K</option>
              <option>AMD Ryzen 9 7950X</option>
              <option>AMD Ryzen 7 7800X3D</option>
            </select>
          </div>

          {/* GPU Selector */}
          <div className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2d1b4e]">
            <div className="flex items-center gap-3 mb-4">
              <FaChartLine className="text-[#9f7aea] text-xl" />
              <h2 className="text-lg font-medium text-white">GPU</h2>
            </div>
            <select className="w-full bg-[#0a0a0f] text-white border border-[#2d1b4e] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#9f7aea]">
              <option>NVIDIA RTX 4090</option>
              <option>NVIDIA RTX 4080</option>
              <option>AMD RX 7900 XTX</option>
              <option>NVIDIA RTX 4070 Ti</option>
            </select>
          </div>

          {/* RAM Selector */}
          <div className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2d1b4e]">
            <div className="flex items-center gap-3 mb-4">
              <FaMemory className="text-[#9f7aea] text-xl" />
              <h2 className="text-lg font-medium text-white">RAM</h2>
            </div>
            <select className="w-full bg-[#0a0a0f] text-white border border-[#2d1b4e] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#9f7aea]">
              <option>32GB DDR5-6000</option>
              <option>16GB DDR5-5600</option>
              <option>32GB DDR4-3600</option>
              <option>16GB DDR4-3200</option>
            </select>
          </div>

          {/* Storage Selector */}
          <div className="bg-[#1a1a2e] rounded-lg p-6 border border-[#2d1b4e]">
            <div className="flex items-center gap-3 mb-4">
              <FaHdd className="text-[#9f7aea] text-xl" />
              <h2 className="text-lg font-medium text-white">Storage</h2>
            </div>
            <select className="w-full bg-[#0a0a0f] text-white border border-[#2d1b4e] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#9f7aea]">
              <option>NVMe SSD (3500MB/s)</option>
              <option>SATA SSD (550MB/s)</option>
              <option>HDD (160MB/s)</option>
            </select>
          </div>
        </div>

        {/* Predict Button */}
        <div className="text-center mb-8">
          <button className="bg-[#9f7aea] hover:bg-[#b794f4] text-white px-8 py-3 rounded-lg font-medium transition-all">
            Calculate FPS Predictions
          </button>
        </div>

        {/* Results Placeholder */}
        <div className="bg-[#1a1a2e] rounded-lg border border-[#2d1b4e] p-6">
          <h3 className="text-white font-medium mb-4">Predicted Performance</h3>
          <div className="text-gray-400 text-sm text-center py-8">
            Select your hardware and click calculate to see FPS predictions
          </div>
        </div>
      </div>
    </div>
  );
}