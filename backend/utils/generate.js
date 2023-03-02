import cryto from "crypto";

export function generateTokens() {
    return new Array(300).fill("").map(() => cryto.randomBytes(3).toString('hex'));
}

export function generateClientId() {
    return cryto.randomBytes(6).toString('hex');
}
