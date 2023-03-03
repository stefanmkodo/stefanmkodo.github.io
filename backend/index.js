import express from "express";
import http from "http";
import https from "https";
import fs from "fs";
import {generateClientId} from "./utils/generate.js";
import * as Tokens from "./domain/tokens.js";
import * as Status  from "./domain/status.js";

const app = express()
app.use(express.json()) // for parsing application/json

const PORT = 3000
const PORT_HTTPS = 8443

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

const privateKey  = fs.readFileSync('../localhost.key', 'utf8');
const certificate = fs.readFileSync('../localhost.crt', 'utf8');

const options = {key: privateKey, cert: certificate};

http.createServer(app).listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
});
https.createServer(options, app).listen(PORT_HTTPS, () => {
    console.log(`Example app listening at https://localhost:${PORT_HTTPS}`)
});
