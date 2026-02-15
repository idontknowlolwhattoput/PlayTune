// home.jsx
import Header from "./header";
import Sidebar from "./sidebar";
import MainContent from "./maincontent";
export default function Home () {
    // Vite uses import.meta.env instead of process.env
    console.log('🔑 API Key loaded:', import.meta.env.VITE_RAWG_RAWG_API_KEY ? '✅ Yes' : '❌ No');
    console.log('🔑 Key preview:', import.meta.env.VITE_RAWG_RAWG_API_KEY?.substring(0, 5) + '...');
    
    return (
        <div className="w-screen h-screen overflow-hidden">
          <div className="w-full h-[12%] ">
            <Header />
          </div>
          <div className="w-full h-[88%] flex">
            <div className="w-[15%] h-full ">
              <Sidebar />
            </div>
            <div className="w-[85%] h-full ">
              <MainContent />
            </div>
          </div>
        </div>
    )
}   