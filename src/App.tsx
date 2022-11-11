import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import "./App.css";
import { PerspectiveCamera } from "@react-three/drei";

function App() {
  return (
    <>
      <div className="webgl">
        <Canvas>
          <PerspectiveCamera
            makeDefault
            fov={35}
            near={0.1}
            far={100}
            position={[0, 0, 6]}
          />
          <Experience />
        </Canvas>
      </div>

      <section className="section">
        <h1>My Portfolio</h1>
      </section>
      <section className="section">
        <h2>My projects</h2>
      </section>
      <section className="section">
        <h2>Contact me</h2>
      </section>
    </>
  );
}

export default App;
