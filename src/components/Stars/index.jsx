import React, { useRef, useLayoutEffect } from 'react';
import { Matrix4} from 'three';

function StarsCreate(props) {
    // xMin,xMax,yMin,yMax,zMin,zMax
    // let starCount = 1000;
    const ref = useRef();
    // console.log(props.starCount);

    useLayoutEffect(()=> {
        const transform = new Matrix4();
        let x,y,z;
        for( let i=0; i<props.starCount; i++){
            // x = Math.random() * props.xMax;
            x = Math.floor(Math.random() * (props.xMax - props.xMin)) + props.xMin;
            // y = Math.random() * props.yMax - props.yMin;
            y = Math.floor(Math.random() * (props.yMax - props.yMin)) + props.yMin;
            // z = Math.random() * props.zMax - props.zMin;
            z = Math.floor(Math.random() * (props.zMax - props.zMin)) + props.zMin;
            // console.log(x,y,z);
            transform.setPosition(x,y,z);
            ref.current.setMatrixAt(i, transform);
        }
    },[])
    return(
        <instancedMesh ref={ref} args={[null, null, props.starCount]}>
            {/* <PointsMaterial color={0xaaaaaa} size={0.7}/> */}
            {/* <circleBufferGeometry args={[0.3,20]} />   */}
            <sphereGeometry args={[0.3, 10, 10]} />
            <meshBasicMaterial color={props.sphereColor}/>
        </instancedMesh>
    )
}

export function Stars() {
    return <>
        {/* Right stars */}
        <StarsCreate  starCount={1000} sphereColor={0xd8d7d8} xMin={20} xMax={200} yMin={-200} yMax={200} zMin={-400} zMax={400} />

        {/* Left stars */}
        <StarsCreate  starCount={1000} sphereColor={0x030113} xMin={-200} xMax={-20} yMin={-200} yMax={200} zMin={-400} zMax={400} />
    </>
}
