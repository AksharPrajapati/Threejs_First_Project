import {
  Environment,
  Html,
  OrbitControls,
  useGLTF,
  PerspectiveCamera,
  useHelper,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense } from "react";
import { DoubleSide, CameraHelper } from "three";
import ModelCharacter from "./ModelCharacter";

function LoadModels() {
  const camera = React.useRef();
  useHelper(camera, CameraHelper, "red");
  const Plane = () => {
    return (
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} scale={[4, 4, 4]} receiveShadow>
        <planeGeometry />
        <meshBasicMaterial side={DoubleSide} color="pink" />
      </mesh>
    );
  };

  return (
    // <>
    //   <PerspectiveCamera
    //     makeDefault
    //     position={[5, 2, 5]}
    //     fov={30}
    //       ref={camera}
    //     //   camera={{ position: [5, 2, 5], fov: 30, ref: { camera } }}
    //   />
    <group>
      <ModelCharacter />
      <Plane />
    </group>
    // </>
  );
}

export default LoadModels;
