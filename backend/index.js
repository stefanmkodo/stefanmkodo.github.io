import express from "express";
import {generateClientId, generateTokens} from "./utils/generate.js";
import {getTokensByClient, setTokensByClient} from "./utils/db.js";
import * as Tokens from "./domain/tokens.js";
import * as Status  from "./domain/status.js";

const app = express()
app.use(express.json()) // for parsing application/json

const port = 3000

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
})
app.get("/api/auth", (req, res) => {
    res.status(200).json({ok: true, clientId: generateClientId()});
});

app.get('/api/tokens', (req, res) => {
    const request = req.query;
    console.log(request);
    
    if (!request.clientId) {
        res.status(400).json({ok: false, error: "No clientId provided"});
        return;
    }
    
    const tokens = Tokens.getTokens(request.clientId);
    
    res.status(200).json({tokens: tokens});
});

app.get("/api/check-status", (req, res) => {
    const request = req.query;
    
    if (!request.clientId) {
        res.status(400).json({ok: false, error: "No clientId provided"});
        return;
    }
    
    res.status(200).json({ok: true, status: Status.checkStatus(request.clientId)});
});


app.post("/api/validate-tokens", (req, res) => {
    console.log("req.body", req.body.tokens);
    
    if(!req.body.tokens) {
        res.status(400).json({ok: false, error: "No tokens provided"});
        return;
    }
    
    Status.validateTokens(req.body.tokens);
    
    res.status(200).json({ok: true});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
