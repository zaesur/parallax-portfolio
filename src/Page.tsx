import { useScroll } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { FunctionComponent, useEffect, useRef } from "react";
import { Group } from "three";

interface PageProps extends GroupProps {
  index: number;
}

const Page: FunctionComponent<PageProps> = ({ index, children, ...props }) => {
  const data = useScroll();
  const dataRef = useRef(false);
  const groupRef = useRef<Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.x += delta * 0.1;
    groupRef.current.rotation.y += delta * 0.12;

    const wasVisible = dataRef.current;
    const isVisible = data.visible(index / data.pages, 1 / data.pages);

    if (isVisible && !wasVisible) {
      gsap.to(
        groupRef.current.rotation,
        {
          duration: 1.5,
          ease: 'power2.inOut',
          x: '+=6',
          y: '+=3',
          z: '+=1.5'
        } 
      )
    }

    dataRef.current = isVisible;
  });


  return (
    <group ref={groupRef} {...props}>
      {children}
    </group>
  );
};

export default Page;
