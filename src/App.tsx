import { ToastContainer } from "react-toastify";
import "./App.css";
import ShapeGrid from "./components/ShapeGrid";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <div className="flex items-center justify-center flex-col bg-indigo-900 w-full h-screen">
        <ShapeGrid
          speed={0.3}
          squareSize={50}
          borderColor="#2F293A"
          hoverFillColor="#222"
          shape="square"
          hoverTrailAmount={8}
        />
        <div className="absolute h-[600px] w-[600px]">
          <AppRouter />
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
