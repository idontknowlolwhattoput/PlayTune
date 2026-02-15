// Sidebar.jsx
import { useContext } from "react";
import { SelectionContext } from "../context/selectionprovider.jsx";
import { 
  FaGamepad, 
  FaChartLine, 
  FaMicrochip 
} from "react-icons/fa";

export default function Sidebar() {

  const { selection, setSelection } = useContext(SelectionContext);

  const menuItems = [
    { 
      key: "browse",
      label: "Browse Games", 
      icon: <FaGamepad className="text-xl" />
    },
    { 
      key: "fps",
      label: "FPS Prediction", 
      icon: <FaChartLine className="text-xl" />
    },
    { 
      key: "hardware",
      label: "Hardware Benchmark", 
      icon: <FaMicrochip className="text-xl" />
    }
  ];

  return (
    <div className=" w-full h-full bg-[#0a0a0f] border-r border-[#2d1b4e] py-8">
      <ul className="space-y-2 px-3">
        {menuItems.map((item) => (
          <li key={item.key}>
            <button
              onClick={() => setSelection(item.key)}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 text-left ${
                selection === item.key
                  ? "bg-[#2d1b4e] text-white"
                  : "text-gray-400 hover:bg-[#1a1a2e] hover:text-[#9f7aea]"
              }`}
            >
              <span>{item.icon}</span>
              <span className="poppins text-sm font-semibold">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
