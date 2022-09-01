import React, { useEffect, useRef, useState} from 'react';
import { useLoader, useThree, useFrame } from 'react-three-fiber';
// import { OrbitControls } from '@react-three/drei';
import { TextureLoader, DoubleSide, AxesHelper, Plane, Vector3} from 'three';
// import * as THREE from 'three';

import EarthNightMap from '../../assets/textures/8k_earth_nightmap.jpg';
import EarthDayMap from '../../assets/textures/8k_earth_daymap.jpg';
import EarthNormalMap from '../../assets/textures/8k_earth_normal_map.jpg';
import EarthSpecularMap from '../../assets/textures/8k_earth_specular_map.jpg';
import EarthCloudsMap from '../../assets/textures/8k_earth_clouds.jpg';

// import Earth from '../../assets/textures/8k_earth_bump.jpg';
export function Earth(props) {

    // const resf = useRef();
    const [plane] = useState(() => new Plane(new Vector3(1, -0.1, 0), 0))
    const [plane2] = useState(() => new Plane(new Vector3(-1, 0.1, 0), 0))
    const [nightMap, colorMap, normalMap, specularMap, coludsMap] = useLoader(
        TextureLoader,
        [EarthNightMap, EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
    );

    const meshRefR = useRef();
    const meshRefL = useRef();
    const cloudRef = useRef();
    
    // https://codesandbox.io/s/yomotsu-camera-controller-test-b1ome?from-embed=&file=/src/ClipBox.js
    
    useFrame((state, delta) => {
        // meshRefR.current.rotation.y = meshRefL.current.rotation.y = cloudRef.current.rotation.y += delta/4;
        meshRefR.current.rotation.y = cloudRef.current.rotation.y += delta/4;
    })

    return <>
        <pointLight position={[10,0,10]} intensity={1} />
        {/* <pointLight position={[-10,0,-10]} intensity={1} /> */}
        {/* <ambientLight intensity={1} /> */}
        <mesh ref={cloudRef}>
            <sphereGeometry args={[1.102, 30, 30]} />
            <meshPhongMaterial map={coludsMap} 
                                opacity={0.3} 
                                depthWrite={true} 
                                transparent={true}
                                side={DoubleSide}/>
        </mesh>

        {/* <mesh ref={meshRefR}>
            <sphereGeometry args={[1.1, 30, 30]} />
            <meshPhongMaterial clippingPlanes={[plane]} specularMap={specularMap} />
            <meshStandardMaterial map={colorMap} normalMap={normalMap}  clippingPlanes={[plane]}/>
        </mesh> */}

        <mesh ref={meshRefR}>
            <sphereGeometry args={[1.1, 30, 30]} />
            <meshPhongMaterial specularMap={specularMap} />
            <meshStandardMaterial map={colorMap} normalMap={normalMap} />
        </mesh>

        {/* <mesh ref={meshRefL}>
            <sphereGeometry args={[1.1, 30, 30]} />
            <meshPhongMaterial clippingPlanes={[plane2]} specularMap={specularMap}/>
            <meshStandardMaterial clippingPlanes={[plane2]} map={nightMap} normalMap={normalMap} />
        </mesh> */}

        {/* <planeHelper args={[plane, 5, "white"]} /> */}
        {/* <primitive object={new AxesHelper(10)} /> */}
    </>

}