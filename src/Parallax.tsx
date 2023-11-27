import { useFrame } from "@react-three/fiber";
import { FunctionComponent, useMemo } from "react";
import { BufferAttribute } from "three";

interface ParallaxProps {
  color: string;
  particlesCount: number;
  objectsCount: number;
  distance: number;
  margin?: number;
  delay?: number;
}

const Parallax: FunctionComponent<ParallaxProps> = ({
  particlesCount,
  objectsCount,
  distance,
  color,
  margin = 0.1,
  delay = 0.1,
}) => {
  const positions = useMemo(() => {
    const raw = new Array(particlesCount * 3)
      .fill(0)
      .map((_, index) =>
        index % 2 === 0
          ? (Math.random() - 0.5) * 10
          : distance * 0.5 - Math.random() * distance * objectsCount
      );

    return new BufferAttribute(new Float32Array(raw), 3);
  }, [particlesCount]);

  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * margin - camera.position.x) * delay;
    camera.position.y += (pointer.y * margin - camera.position.y) * delay;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" {...positions} />
      </bufferGeometry>
      <pointsMaterial sizeAttenuation size={0.03} color={color} />
    </points>
  );
};

export default Parallax;
