const hre = require("hardhat");

async function main() {

  let deployer = (await hre.ethers.getSigner()).getAddress();
  console.log('Deploying on', hre.network.name, 'with account', deployer);

  const lock = await hre.ethers.getContractFactory("lockContract");
  const lockContract = await lock.deploy(deployer, "0x30de9d1d358ff1b60fb8057235aac35e23b7650f"); //5ire
  
  await lockContract.waitForDeployment();
  console.log("Contract deployed to:", lockContract.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});