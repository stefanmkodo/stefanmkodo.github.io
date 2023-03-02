import {useEffect, useRef, useState} from 'react'
import './App.css'
import getFPS from "./utils/getFPS.js";
import {startAnimating, stopAnimation} from "./utils/animate.js";
import QRCode from 'qrcode';

const FPS = 60;
function App() {
    const [fps, setFps] = useState(0);
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const interval = setInterval(async () => {
            setFps(Math.round(await getFPS()));
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        function drawQRCode() {
            QRCode.toCanvas(canvasRef.current, `${Date.now()}`, function (error) {
                if (error) console.error(error)
                console.log('success!');
            })
        }
        
        startAnimating(FPS, drawQRCode);
        
        return () => stopAnimation();
    }, []);
    
    
    return (
        <div className="App">
            Screen max FPS {fps}
            <h3>Throttling requestAnimationFrame to a FPS</h3>
            <p>This test:  Results should be approximately {FPS}</p>
            <p id="results">Results:</p>
            <canvas id="canvas" width="300" height="300" ref={canvasRef}></canvas>
        </div>
    )
}

export default App;


function drawSomething() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = `rgb(${Math.round(Math.random() * 200)}, ${Math.round(Math.random() * 200)}, ${Math.round(Math.random() * 200)})`;
    ctx.fillRect(10, 10, 50, 50);
}
