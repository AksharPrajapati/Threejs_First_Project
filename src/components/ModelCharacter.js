import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, useFBX } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
import { useControls } from "../utils/useControls";

function ModelCharacter() {
  //   const fbx = useFBX("/char.fbx");
  const controls = useControls();

  const { animations, nodes, scene } = useGLTF("/Fox.glb");
  scene.traverse((mesh) => {
    // console.log(mesh);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  console.log(nodes);
  const { scene: CourtScene } = useGLTF("/court-transformed.glb");

  CourtScene.traverse((mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });

  const { names, ref, clips } = useAnimations(animations);

  let mixer = null;

  let looking = null;
  let walking = null;
  useEffect(() => {
    mixer = new THREE.AnimationMixer(scene);
    walking = mixer.clipAction(animations[1]);
    looking = mixer.clipAction(animations[0]);

    // scene.position.set(1.5, 0.5, 1.5);
    scene.position.set(-5, -1.5, 5);

    scene.rotation.set(0, Math.PI, 0);
  }, [scene, animations]);

  let previousTime = 0;

  useFrame(({ clock, camera }) => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;
    looking !== null && looking.play();
    // mixer.update(deltaTime * 0.5);
    const { forward, backward, left, right, brake, reset } = controls.current;

    const updatePosition = () => {
      walking !== null && walking.play();
      const idealOffset = new THREE.Vector3(0, 1, -6);
      //   const idealOffset = new THREE.Vector3(0, 2, 1);

      mixer.update(deltaTime * 0.5);
      idealOffset.applyEuler(scene.rotation);
      idealOffset.add(scene.position);
      const pos = scene.position.clone();
      pos.y += 1.5;
      camera.lookAt(pos);
      camera.position.copy(
        new THREE.Vector3().lerp(
          idealOffset,
          1.0 - Math.pow(0.001, elapsedTime)
        )
      );
    };

    if (forward) {
      scene.translateZ(deltaTime * 2 * 0.5);
      updatePosition();
    } else if (backward) {
      scene.translateZ(-deltaTime * 2 * 0.5);
      updatePosition();
    } else if (left) {
      scene.rotation.y += deltaTime * 0.2;
      updatePosition();
    } else if (right) {
      scene.rotation.y -= deltaTime * 0.2;
      updatePosition();
    } else if (reset) {
      console.log("reset");
    }

    // scene.position.x = Math.cos(elapsedTime);
    // scene.position.z = Math.sin(elapsedTime);

    // scene.rotation.z = Math.sin(elapsedTime);
  });

  return (
    // <group dispose={null}>
    // <group scale={0.01}>
    //   {/* <primitive object={nodes.mixamorigHips} /> */}
    //   <skinnedMesh
    //     castShadow
    //     receiveShadow
    //     geometry={nodes.fox.geometry}
    //     skeleton={nodes.fox.skeleton}
    //     // rotation={[-Math.PI / 2, 0, 0]}
    //     scale={100}
    //   ></skinnedMesh>
    // </group>
    // </group>
    <group>
      <primitive object={scene} scale={0.01} />
    </group>
    // <group>
    //   <skinnedMesh
    //     castShadow
    //     receiveShadow
    //     geometry={nodes?.fox?.geometry}
    //     skeleton={nodes?.fox?.skeleton}
    //   ></skinnedMesh>
    //   <meshStandardMaterial map={nodes?.fox?.material?.map} />
    // </group>
  );
}

// useGLTF.preload("/stacy.glb");

export default ModelCharacter;
