# Bit Dapp

My first learning project with Dapp Development.

## Prerequisites

- Node.js v14+
- MetaMask browser extension

## How to run

- Install dependencies: `yarn`
- Compile smart contracts: `npx hardhat compile`
- Start local blockchain node: `npx hardhat node`
  - Copy one of the private keys and import into MetaMask
- Deploy smart contract to local node: `npx hardhat run scripts/deploy.js --network localhost`
  - Copy contract address and update on `App.tsx`
- Start frontend: `yarn start`
