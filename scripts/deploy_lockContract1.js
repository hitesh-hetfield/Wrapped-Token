const hre = require("hardhat");

async function main() {
//   const deployer = await hre.ethers.provider.getSigner(); // Get the signer from provider
//   const deployerAddress = await deployer.getAddress();    // Retrieve the address
//   console.log('Deploying on', hre.network.name, 'with account', deployerAddress);

  const lock = await hre.ethers.getContractFactory("lockContract");
  const lockContract = await lock.deploy("0x279E7873130ee43622171DD352869FFD20812a7D", "0xb1cfdd539890678a17a79b390c72e2619fae866b"); //bsepolia
  
  await lockContract.waitForDeployment();      // Wait for deployment
  console.log("Contract deployed to:", lockContract.getAddress());  // Access the contract address directly
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
