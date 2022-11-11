import { MeshProps, useFrame } from "@react-three/fiber";
import { FunctionComponent, useRef, useState } from "react";
import { BufferGeometry, Material, Mesh } from "three";

interface PageProps extends Pick<MeshProps, "position"> {
  geometry: BufferGeometry;
  material: Material;
  index: number;
  total: number;
}

const Page: FunctionComponent<PageProps> = ({
  geometry,
  material,
  index,
  total,
  ...props
}) => {
  const ref = useRef<Mesh>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.1;
    ref.current.rotation.y += delta * 0.12;
  });

  return (
    <mesh ref={ref} {...props}>
      <primitive object={geometry} />
      <primitive object={material} />
    </mesh>
  );
};

export default Page;
