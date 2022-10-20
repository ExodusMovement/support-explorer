//@dev Match tx hashes for solana.

import { Connection } from "@solana/web3.js";

const validateSignature = async (tx) => {
    try {
        let connection = new Connection(
            "https://api.mainnet-beta.solana.com",
            "confirmed"
        );
        let transaction = await connection.getParsedTransaction(tx);
        let slot = await transaction.slot;

        if (slot) {
            return true;
        } else {
            console.log(transaction);
        }
    } catch (error) {
        console.log("Error in solana signature verification: ", error);
    }
};

export default validateSignature;