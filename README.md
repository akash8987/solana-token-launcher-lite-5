# Solana Token Launcher Lite

A streamlined, single-directory tool for deploying your own SPL Token on the Solana Devnet or Mainnet. This repository provides a clean implementation of token creation, minting, and Metaplex metadata attachment.

## Features
* **One-Click Minting:** Create a new token supply in seconds.
* **Metadata Integration:** Automatically attach Name, Symbol, and URI via Metaplex.
* **Security:** Uses local filesystem keypairs for secure transaction signing.
* **Simple Structure:** No complex folders; just run and deploy.

## Prerequisites
* Node.js (v16.x or higher)
* A Solana wallet keypair file (`keypair.json`)
* Some Devnet SOL for transaction fees (`solana airdrop 1`)

## Setup
1. Install dependencies:
   ```bash
   npm install
