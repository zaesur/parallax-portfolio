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
  MeshToonMaterial,
  NearestFilter,
  TorusGeometry,
  TorusKnotGeometry,
} from "three";
import Page from "./Page";
import gradientTexturePath from "/public/textures/gradients/3.jpg";
import "./Experience.css";
import Stars from "./Stars";
import { useFrame } from "@react-three/fiber";

const geometries = [
  new TorusGeometry(1, 0.4, 16, 60),
  new ConeGeometry(1, 2, 32),
  new TorusKnotGeometry(0.8, 0.35, 100, 16),
];

const Experience: FunctionComponent = () => {
  const delay = 0.1;
  const margin = 0.1;
  const distance = 4;
  const color = "#ffeded";
  const gradientTexture = useTexture(gradientTexturePath);

  const { current: material } = useRef(
    (() => {
      gradientTexture.magFilter = NearestFilter;

      return new MeshToonMaterial({
        color,
        gradientMap: gradientTexture,
      });
    })()
  );

  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * margin - camera.position.x) * delay;
    camera.position.y += (pointer.y * margin - camera.position.y) * delay;
  });

  return (
    <Suspense fallback={<Html>Loading...</Html>}>
      <PerspectiveCamera
        makeDefault
        fov={35}
        near={0.1}
        far={100}
        position={[0, 0, 6]}
      />
      <directionalLight position={[1, 1, 0]} />

      <ScrollControls pages={geometries.length}>
        <Scroll>
          <Stars
            color={color}
            distance={distance}
            particlesCount={200}
            objectsCount={geometries.length}
          />
          {geometries.map((geometry, index) => (
            <Page
              index={index}
              key={geometry.uuid}
              position={[index % 2 ? 2 : -2, -distance * index, 0]}
            >
              <mesh>
                <primitive object={geometry} />
                <primitive object={material} />
              </mesh>
            </Page>
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
