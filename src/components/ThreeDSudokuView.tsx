// src/components/ThreeDSudokuView.tsx

'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';


type ThreeDSudokuViewProps = {
  cube: string[][][];
};


const ThreeDSudokuView: React.FC<ThreeDSudokuViewProps> = ({ cube }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [spacing, setSpacing] = useState<number>(1);

  useEffect(() => {
    if (!mountRef.current) return;

    // Clear previous canvas children (renderer.domElement) if any, before creating new renderer
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(20, 20, 20);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1.2);
    spotLight.position.set(15, 40, 35);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const cellSize = 1;
    const offset = ((cellSize + spacing) * 9) / 2;

    for (let z = 0; z < 9; z++) {
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          const value = cube[z][y][x];
          if (value === '') continue;

          const layerColors = [
            0xe0ffe0, 0xc0ffc0, 0xa0ffa0, 0x80ff80, 0x60ff60,
            0x40ff40, 0x20ff20, 0x00ff00, 0x00cc00,
          ];

          const geometry = new THREE.BoxGeometry(cellSize, cellSize, cellSize);
          const layerColor = layerColors[z];

          const canvas = document.createElement('canvas');
          canvas.width = 128;
          canvas.height = 128;
          const ctx = canvas.getContext('2d')!;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'black';
          ctx.font = '72px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(value, canvas.width / 2, canvas.height / 2);

          const texture = new THREE.CanvasTexture(canvas);
          texture.minFilter = THREE.LinearFilter;
          texture.needsUpdate = true;

          const material = new THREE.MeshPhysicalMaterial({
            color: layerColor,
            roughness: 0.3,
            metalness: 0.3,
            clearcoat: 0.6,
            opacity: 0.9,
            transparent: true,
            map: texture,
          });

          const cubeMesh = new THREE.Mesh(geometry, material);

          cubeMesh.position.set(
            x * (cellSize) - offset,
            y * (cellSize) - offset,
            z * (cellSize + spacing) - offset
          );

          scene.add(cubeMesh);
        }
      }
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount or before re-run
    return () => {
      renderer.dispose();
      controls.dispose();
      scene.clear();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [cube, spacing]); // Add spacing here so scene updates on spacing change


  return (
    <>
      <div ref={mountRef} style={{ width: '100%', height: '600px' }} />
      <label htmlFor="layerSpacing" className='text-black'>Layer Spacing:</label>
      <input
        type="range"
        id="layerSpacing"
        min="0"
        max="5"
        step="0.1"
        value={spacing}
        onChange={(e) => setSpacing(parseFloat(e.target.value))}
      />
    </>
  );

};

export default ThreeDSudokuView;
