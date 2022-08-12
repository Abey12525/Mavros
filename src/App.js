import { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import './App.css';
import { Star } from './components/stars';


function App() {
  return (
    <div className="App">
        <Canvas>
          <Suspense fallback={null}>
            <Star/>
          </Suspense>
        </Canvas>
    </div>
  );
}

export default App;
