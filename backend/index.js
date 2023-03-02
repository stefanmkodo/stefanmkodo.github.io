const express = require('express')
const cryto = require('crypto');
const app = express()
const port = 3000

function getTokens() {
    return new Array(300).fill("").map(() => cryto.randomBytes(3).toString('hex'));
}


function getClientId() {
    return cryto.randomBytes(6).toString('hex');
}

app.get("/api/auth", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    
    res.status(200).json({ok: true, clientId: getClientId()});
});

app.get('/api/tokens', (req, res) => {
    const request = req.query;
    console.log(request)
    const tokens = getTokens();
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    
    res.status(200).json({tokens: tokens});
});

app.post("/api/check", (req, res) => {
    console.log(req.body);
    res.status(200).json({ok: true});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
