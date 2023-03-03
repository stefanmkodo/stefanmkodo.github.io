import {useEffect, useRef, useState} from 'react'
import './App.css'
import {startAnimating, stopAnimation} from "./utils/animate.js";
import QRCode from 'qrcode';
import useFPS from "./hooks/useFPS.js";
import getParam from "./utils/queryString.js";
import useClientId from "./hooks/useClientId.js";
import useTokens from "./hooks/useTokens.js";
import useCheckStatus from "./hooks/useCheckStatus.js";
import {Footer, Loader} from "./Footer.jsx";
import {Header} from "./Header.jsx";

const FPS = getParam('fps') ?? 60;

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const canvasRef = useRef(null);
    const index = useRef(0);
    
    const maxFPS = useFPS();
    const clientId = useClientId();
    const tokens = useTokens();
    const status = useCheckStatus();
    
    useEffect(() => {
        if(!tokens || tokens.length < 1) return;
        if(!clientId) return;
        
        new Promise(resolve => {
            setTimeout(resolve, 2500);
        }).then(() => setIsLoading(false));
    }, [tokens]);
    
    useEffect(() => {
        index.current = 0;
    }, [tokens]);
    
    useEffect(() => {
        if (!tokens || tokens.length < 1 || status) return;
        
        function drawQRCode() {
            let value = `MKD${tokens[index.current]}`;
            QRCode.toCanvas(canvasRef.current, value, {
                version: 1,
                width: 300
            }, function (error) {
                if (error) {
                    console.error(error);
                } else {
                    index.current = (index.current + 1) % tokens.length;
                }
            });
        }
        
        startAnimating(FPS, drawQRCode);
        
        return () => stopAnimation();
    }, [tokens, status]);
    
    return (
        <>
            <Header/>
            <div className="App">
                {isLoading && (<Loader />)}
                {!isLoading && tokens && (
                    <>
                        <p>Client ID: {clientId}</p>
                        <p id="results">Results at {FPS}fps | max {maxFPS}</p>
                        <canvas id="canvas" width="300" height="300" ref={canvasRef}></canvas>
                        <p>Status: {status === "passed" ? "passed" : "pending"}</p>
                    </>
                )}
            </div>
            <Footer/>
        </>
    )
}

export default App;


function drawSomething() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = `rgb(${Math.round(Math.random() * 200)}, ${Math.round(Math.random() * 200)}, ${Math.round(Math.random() * 200)})`;
    ctx.fillRect(10, 10, 50, 50);
}
