const { ethers } = require("hardhat");

async function main() {

    const lockCoins = await ethers.getContractFactory("lockCoins");

    const lockCoinsContract = await lockCoins.deploy();

    console.log("Contract deployed at:", lockCoinsContract.target);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
})