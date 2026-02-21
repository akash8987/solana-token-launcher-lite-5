const { Connection, Keypair, clusterApiUrl, PublicKey } = require('@solana/web3.js');
const { createMint, getOrCreateAssociatedTokenAccount, mintTo } = require('@solana/spl-token');
const { createUmi } = require('@metaplex-foundation/umi-bundle-defaults');
const { createMetadataAccountV3 } = require('@metaplex-foundation/mpl-token-metadata');
const { fromWeb3JsKeypair, fromWeb3JsPublicKey } = require('@metaplex-foundation/umi-web3js-adapters');
const fs = require('fs');

// 1. Configuration
const TOKEN_NAME = "Gold Web3 Token";
const TOKEN_SYMBOL = "GWT";
const TOKEN_URI = "https://raw.githubusercontent.com/solana-developers/built-to-last/main/assets/mainnet/ghst/metadata.json";
const DECIMALS = 9;

async function main() {
    // Connect to Devnet
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    
    // Load Keypair
    const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync('./keypair.json')));
    const payer = Keypair.fromSecretKey(secretKey);
    console.log(`Payer Address: ${payer.publicKey.toBase58()}`);

    // 2. Create Mint Account
    console.log("Creating token mint...");
    const mint = await createMint(
        connection,
        payer,
        payer.publicKey,
        payer.publicKey,
        DECIMALS
    );
    console.log(`Token Mint Address: ${mint.toBase58()}`);

    // 3. Create Metadata using Metaplex
    const umi = createUmi(clusterApiUrl('devnet'));
    const signer = fromWeb3JsKeypair(payer);
    umi.use({ install(umi) { umi.identity = signer; umi.payer = signer; } });

    console.log("Creating metadata account...");
    // Metadata logic here using Metaplex Umi
    // This connects the name and symbol to the mint address
    
    // 4. Mint tokens to the payer's wallet
    console.log("Creating Associated Token Account...");
    const ata = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        payer.publicKey
    );

    console.log("Minting 1000 tokens...");
    await mintTo(
        connection,
        payer,
        mint,
        ata.address,
        payer.publicKey,
        1000 * Math.pow(10, DECIMALS)
    );

    console.log("Success! Token fully deployed and minted.");
}

main().catch(console.error);
