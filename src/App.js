import { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import './App.css';
import { Star } from './components/stars';


function App() {
  return (
    <div className="App" style={{background: "linear-gradient(to-left, #1a234d, #0b0e1f)"}}>
        <Canvas>
          <Suspense fallback={null}>
            <Star/>
          </Suspense>
        </Canvas>
    </div>
  );
}

export default App;
