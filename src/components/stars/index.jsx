import React, { useEffect, useRef} from 'react';
import { useLoader, useThree, useFrame } from 'react-three-fiber';
// import { OrbitControls } from '@react-three/drei';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextureLoader, DoubleSide } from 'three';
// import * as THREE from 'three';

import EarthNightMap from '../../assets/textures/8k_earth_nightmap.jpg';
import EarthDayMap from '../../assets/textures/8k_earth_daymap.jpg';
import EarthNormalMap from '../../assets/textures/8k_earth_normal_map.jpg';
import EarthSpecularMap from '../../assets/textures/8k_earth_specular_map.jpg';
import EarthCloudsMap from '../../assets/textures/8k_earth_clouds.jpg';

// import Earth from '../../assets/textures/8k_earth_bump.jpg';


const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
       () => {
          const controls = new OrbitControls(camera, gl.domElement);
          controls.minDistance = 3;
          controls.maxDistance = 20;
          return () => {
            controls.dispose();
          };
       },
       [camera, gl]
    );
    return null;
 };

export function Star(props) {

    const [colorMap, normalMap, specularMap, coludsMap] = useLoader(
        TextureLoader,
        [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
    );

    

    const meshRef = useRef();
    const cloudRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current){
            // meshRef.current.rotation.x += delta/2;
            meshRef.current.rotation.y += delta/4;
            // meshRef.current.position.x += 0.01;
            // meshRef.current.position.y += 0.01;
            
        }
    })
    
    useFrame((state, delta) => {
        if (cloudRef.current){
            // cloudRef.current.rotation.x += delta/2;
            cloudRef.current.rotation.y += delta/4;
            // cloudRef.current.position.x += 0.01;
            // cloudRef.current.position.y += 0.01;
            
        }
    })

    return <>
        <ambientLight intensity={1} />
        <mesh ref={cloudRef}>
            <sphereGeometry args={[1.102, 50, 50]} />
            <meshPhongMaterial map={coludsMap} 
                                opacity={0.5} 
                                depthWrite={true} 
                                transparent={true}
                                side={DoubleSide}/>
        </mesh>
        <mesh ref={meshRef}>
            <CameraController/>
            <sphereGeometry args={[1.1, 50, 50]} />
            <meshPhongMaterial specularMap={specularMap}/>
            <meshStandardMaterial map={colorMap} normalMap={normalMap} />
        </mesh>
    </>

}