//@dev Matches solana addresses.

import { PublicKey } from "@solana/web3.js";

const validateSolAddress = async (address) => {
    try {
        let pubkey = await new PublicKey(address);
        let isSolana = await PublicKey.isOnCurve(pubkey.toBuffer());
        return isSolana;
    } catch (error) {
        return false;
    }
};

export default validateSolAddress;