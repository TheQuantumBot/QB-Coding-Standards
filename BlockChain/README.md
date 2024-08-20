# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

# Simple Smart Contract with Hardhat Ignition

This project demonstrates a basic smart contract deployment using Hardhat's Ignition plugin.

## Features

- A simple Solidity contract for storing and retrieving an integer.
- Deployment using Hardhat's Ignition plugin.
- Basic test setup.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [Hardhat](https://hardhat.org/) installed (instructions below).

## Installation

1. Clone the repository or download the project files.

2. Navigate to the project directory:

    ```bash
    cd blockchain
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

## Usage

### Compile the Smart Contract

Compile the smart contract with Hardhat:

```bash
npx hardhat compile



#Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
