import { Suspense,useEffect } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import './App.css';
import { Earth } from './components/Earth';


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

function App() {
  return (
    <div className="App" style={{background: "linear-gradient(to-left, #1a234d, #0b0e1f)"}}>
        <Canvas onCreated={({ gl }) => {
        gl.localClippingEnabled = true
      }}>
          <CameraController />
          <Suspense fallback={null}>
            <Earth/>
          </Suspense>
        </Canvas>
    </div>
  );
}

export default App;
