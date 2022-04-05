import * as THREE from "three";
import React, { useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Html,
  Preload,
  OrbitControls,
  useCubeTexture,
  Environment,
  useGLTF,
} from "@react-three/drei";

function InnerHouse() {
  const Court = () => {
    const { scene, nodes } = useGLTF("court-transformed.glb");
    scene.position.set(0, -2, 0);
    return (
      <group>
        <primitive object={scene} />
        <mesh position={[1.5, 0, 15]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial color="blue" />
          <Html center>
            {/* <Popconfirm title="Are you sure you want to leave?" onConfirm={onClick} okText="Yes" cancelText="No"> */}
            <a href="#" onClick={() => alert("hi")}>
              {"exit"}
            </a>
            {/* </Popconfirm> */}
          </Html>
        </mesh>
      </group>
    );
  };
  return (
    // <Canvas>
    <group>
      <color attach="background" args={[0, 0, 0]} />
      {/* <OrbitControls
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        // minZoom={10}
        // enableZoom={false}
        maxDistance={10}
        // minDistance={30}
      /> */}
      <ambientLight args={[0xffffff, 0.5]} />
      <pointLight args={[0xffffff, 0.5]} position={[2, 3, 4]} />

      <Court />
      <Environment
        files={[
          "1/px.jpg",
          "1/nx.jpg",
          "1/py.jpg",
          "1/ny.jpg",
          "1/pz.jpg",
          "1/nz.jpg",
        ]}
        background
      />
    </group>
    // </Canvas>
  );
}

export default InnerHouse;
