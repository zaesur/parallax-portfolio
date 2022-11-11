import {
  Html,
  PerspectiveCamera,
  Scroll,
  ScrollControls,
  useTexture,
} from "@react-three/drei";
import { FunctionComponent, Suspense, useRef } from "react";
import {
  ConeGeometry,
  Group,
  MeshToonMaterial,
  NearestFilter,
  TorusGeometry,
  TorusKnotGeometry,
} from "three";
import Page from "./Page";
import { useFrame } from "@react-three/fiber";
import gradientTexturePath from "/public/textures/gradients/3.jpg";
import "./Experience.css";

const geometries = [
  new TorusGeometry(1, 0.4, 16, 60),
  new ConeGeometry(1, 2, 32),
  new TorusKnotGeometry(0.8, 0.35, 100, 16),
];

const Experience: FunctionComponent = () => {
  const distance = 4;
  const groupRef = useRef<Group>(null!);
  const gradientTexture = useTexture(gradientTexturePath);

  const { current: material } = useRef(
    (() => {
      gradientTexture.magFilter = NearestFilter;
      return new MeshToonMaterial({
        color: "#ffeded",
        gradientMap: gradientTexture,
      });
    })()
  );

  useFrame(({ mouse }) => {
    const { position } = groupRef.current;

    position.x += (mouse.x * 0.1 - position.x) * 0.1;
    position.y += (mouse.y * 0.1 - position.y) * 0.1;
  });

  return (
    <Suspense fallback={<Html>Loading...</Html>}>
      <group ref={groupRef}>
        <PerspectiveCamera
          makeDefault
          fov={35}
          near={0.1}
          far={100}
          position={[0, 0, 6]}
        />
      </group>
      <directionalLight position={[1, 1, 0]} />
      <ScrollControls pages={geometries.length}>
        <Scroll>
          {geometries.map((geometry, index) => (
            <Page
              index={index}
              total={geometries.length}
              key={geometry.uuid}
              geometry={geometry}
              material={material}
              position={[index % 2 ? 2 : -2, -distance * index, 0]}
            />
          ))}
        </Scroll>
        <Scroll html>
          <section className="section">
            <h1>My Portfolio</h1>
          </section>
          <section className="section">
            <h2>My projects</h2>
          </section>
          <section className="section">
            <h2>Contact me</h2>
          </section>
        </Scroll>
      </ScrollControls>
    </Suspense>
  );
};

export default Experience;
