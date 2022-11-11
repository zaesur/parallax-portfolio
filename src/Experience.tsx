import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { FunctionComponent, useRef } from "react";
import { Group, Mesh, MeshToonMaterial, NearestFilter, Object3D } from "three";
import gradientTexturePath from "/public/textures/gradients/3.jpg";

const isMesh = (object3D: Object3D): object3D is Mesh =>
  (object3D as Mesh).isMesh;

interface ExperienceProps {
  distance: number;
}

const Experience: FunctionComponent<ExperienceProps> = ({ distance }) => {
  const meshesRef = useRef<Group>(null!);
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

  useFrame((_, delta) => {
    meshesRef.current.traverse((mesh) => {
      if (isMesh(mesh)) {
        mesh.rotation.x += delta * 0.1;
        mesh.rotation.y += delta * 0.12;
      }
    });
  });

  return (
    <group ref={meshesRef}>
      <mesh position={[0, -distance * 0, 0]}>
        <torusGeometry args={[1, 0.4, 16, 60]} />
        <primitive object={material} />
      </mesh>

      <mesh position={[0, -distance * 1, 0]}>
        <coneGeometry args={[1, 2, 32]} />
        <primitive object={material} />
      </mesh>

      <mesh position={[0, -distance * 2, 0]}>
        <torusKnotGeometry args={[0.8, 0.35, 100, 16]} />
        <primitive object={material} />
      </mesh>
    </group>
  );
};

export default Experience;
