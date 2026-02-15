// home.jsx
import { useContext } from "react";
import { SelectionContext } from "../context/selectionprovider";

import Header from "./header";
import Sidebar from "./sidebar";
import MainContent from "./maincontent";
import FPSPrediction from "./fpsprediction";
import HardwareBenchmark from "./hardwarebenchmark";

export default function Home() {

  const { selection } = useContext(SelectionContext);

  console.log(
    "🔑 API Key loaded:",
    import.meta.env.VITE_RAWG_RAWG_API_KEY ? "✅ Yes" : "❌ No"
  );

  const renderContent = () => {
    switch (selection) {
      case "fps":
        return <FPSPrediction />;
      case "hardware":
        return <HardwareBenchmark />;
      case "browse":
      default:
        return <MainContent />;
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="w-full h-[12%]">
        <Header />
      </div>

      <div className="w-full h-[88%] flex">
        <div className="w-[15%] h-full">
          <Sidebar />
        </div>

        <div className="w-[85%] h-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
