// src/components/ThreeDSudokuView.tsx

'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';


type ThreeDSudokuViewProps = {
  cube: string[][][];
};

const ThreeDSudokuView: React.FC<ThreeDSudokuViewProps> = ({ cube }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
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

    // OrbitControls for interactivity
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Materials
    const prefilledMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0077ff,
      roughness: 0.2,
      metalness: 0.4,
      clearcoat: 0.8,
      transparent: true,
      opacity: 0.9,
    });

    const getColorForValue = (val: string) => {
      const colors = [
        0xff6b6b, 0xffb26b, 0xfff56b, 0x6bff95,
        0x6bdcff, 0x6b8eff, 0xc06bff, 0xff6bd8, 0xaaaaaa,
      ];
      return colors[parseInt(val) - 1] || 0xdddddd;
    };



    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1.2);
    spotLight.position.set(15, 40, 35);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const boxHelper = new THREE.BoxHelper(new THREE.Mesh(
      new THREE.BoxGeometry(9.2, 9.2, 9.2),
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, opacity: 0.3, transparent: true })
    ));
    // scene.add(boxHelper);



    const editableMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const invalidMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

    // Create cubes for each cell
    const cellSize = 1;
    const spacing = 0.1;
    const offset = (cellSize + spacing) * 9 / 2;

    for (let z = 0; z < 9; z++) {
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          const value = cube[z][y][x];
          if (value === '') continue;

          const layerColors = [
            0xe0ffe0, 0xc0ffc0, 0xa0ffa0, 0x80ff80, 0x60ff60,
            0x40ff40, 0x20ff20, 0x00ff00, 0x00cc00
          ];



          // Create the cube geometry
          const geometry = new THREE.BoxGeometry(cellSize, cellSize, cellSize);
          const layerColor = layerColors[z]; // Color by z-layer

          // Create canvas texture with the number
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

          // Physical material with color + texture map
          const material = new THREE.MeshPhysicalMaterial({
            color: layerColor,
            roughness: 0.3,
            metalness: 0.3,
            clearcoat: 0.6,
            opacity: 0.9,
            transparent: true,
            map: texture,  // apply texture here
          });

          // Create the mesh with the geometry and material
          const cubeMesh = new THREE.Mesh(geometry, material);

          // Position the cube
          cubeMesh.position.set(
            x * (cellSize + spacing) - offset,
            y * (cellSize + spacing) - offset,
            z * (cellSize + spacing) - offset
          );

          scene.add(cubeMesh);
        }
      }
    }


    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [cube]);

  return <div ref={mountRef} style={{ width: '100%', height: '600px' }} />;
};

export default ThreeDSudokuView;
