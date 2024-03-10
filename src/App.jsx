import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <section>
      <div className="text-red-500 bg-slate-100 border flex flex-col justify-center items-center">
        
        <FontAwesomeIcon icon="fa-solid fa-robot" />

        <div className="max-w-[1250px] w-full flex flex-row items-center justify-center">
          <Dashboard />
        </div>
      </div>
    </section>
  );
}

export default App;
