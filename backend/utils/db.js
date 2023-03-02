
const db = {}


export function getTokensByClient(clientId) {
    return db[clientId]?.tokens;
}

export function setTokensByClient(clientId, tokens) {
    if(db[clientId] === undefined) db[clientId] = {};
    db[clientId].tokens = tokens;
}

export function getStatusByClient(clientId) {
    return db[clientId]?.status === "passed";
}

export function setStatus(clientId, status) {
    return db[clientId].status = status;
}

