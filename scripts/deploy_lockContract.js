const hre = require("hardhat");
require("dotenv").config();

async function main() {

  console.log("Step 1");

  _admin = process.env.PVT_KEY;
  _gateway = "0x30de9d1d358ff1b60fb8057235aac35e23b7650f";

//   let deployer = (await hre.ethers.getSigner()).address;
//   console.log('Deploying on', hre.network.name, 'with account', deployer);
  
  const lockContract = await hre.ethers.getContractFactory("lockContract");
  const lockContractContract = await lockContract.deploy(_admin, _gateway); //5irechain
  await lockContractContract.deployed();
  console.log("Lock Contract deployed to:", lockContractContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});