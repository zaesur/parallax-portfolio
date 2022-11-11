import Experience from "./Experience";
import { Canvas } from "@react-three/fiber";
import "./App.css";

function App() {
  return (
    <div className="webgl">
      <Canvas>
        <Experience />
      </Canvas>
    </div>
  );
}

export default App;
