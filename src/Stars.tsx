import { FunctionComponent, useMemo } from "react";
import { BufferAttribute } from "three";

interface StarsProps {
  color: string;
  particlesCount: number;
  objectsCount: number;
  distance: number;
}

const Stars: FunctionComponent<StarsProps> = ({
  particlesCount,
  objectsCount,
  distance,
  color,
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

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" {...positions} />
      </bufferGeometry>
      <pointsMaterial sizeAttenuation size={0.03} color={color} />
    </points>
  );
};

export default Stars;