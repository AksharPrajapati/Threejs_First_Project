import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense } from "react";
import "./App.css";
import {
  Html,
  useProgress,
  Environment,
  OrbitControls,
  useFBX,
  useHelper,
  PresentationControls,
  TrackballControls,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CameraHelper } from "three";

import InnerHouse from "./components/InnerHouse";
import LoadModels from "./components/LoadModels";
import ModelCharacter from "./components/ModelCharacter";

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};
//2,3,6
function App() {
  return (
    <Canvas shadows camera={{ position: [-5, 1, 13], fov: 30 }}>
      <Suspense fallback={<Loader />}>
        {/* <Physics> */}
        <ModelCharacter />
        <InnerHouse />
        {/* <LoadModels /> */}
        {/* 
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
        /> */}
      </Suspense>

      <PresentationControls />
      {/* <OrbitControls /> */}
      {/* <TrackballControls /> */}
    </Canvas>
  );
}

export default App;
