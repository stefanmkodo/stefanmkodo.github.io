import * as db from "../utils/db.js";
import * as tokens from "./tokens.js";

export function checkStatus(clientId) {
    return db.getStatusByClient(clientId);
}


export function validateTokens(reqTokens) {
    
    // find the client in reqTokens
    const maskedClientId = reqTokens.find(token => token.length >= 12);
    
    if (!maskedClientId) return false;
    
    const clientId = maskedClientId.replace("MKD", "");
    
    // get the tokens from db
    const dbTokens = tokens.getTokens(clientId);
    
    if (!dbTokens) return false;
    
    let reqTokensProcessed = reqTokens.map(t => t.replace("MKD", ""));
    
    return checkTokensMatchInDb(clientId, reqTokensProcessed, dbTokens);
}

export function checkTokensMatchInDb(clientId, reqTokens, tokens) {
    const length = reqTokens.length;
    let reqTokensToCheck = reqTokens;
    
    console.log("clientId", clientId);
    console.log(reqTokens);
    console.log("tokens", tokens);
    
    let indexOfFirstToken = 0;
    if (reqTokens[0] === clientId) {
        indexOfFirstToken = tokens.findIndex(t => t === reqTokens[1]);
        reqTokensToCheck = reqTokens.slice(1);
    } else {
        indexOfFirstToken = tokens.findIndex(t => t === reqTokens[0]);
    }
    console.log("indexOfFirstToken", indexOfFirstToken);
    
    if (indexOfFirstToken === -1) return false;
    
    const slicedTokens = tokens.slice(indexOfFirstToken, indexOfFirstToken + length);
    const result = reqTokensToCheck.every((t, index) => slicedTokens[index] === t);
    
    if(result) {
        db.setStatus(clientId, "passed");
    }
    
    return result;
}
