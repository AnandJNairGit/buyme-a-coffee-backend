const { ethers } = require("hardhat");



async function main() {
await ethers.getSigners();
  const contract = await ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await contract.deploy();
  await buyMeACoffee.deployed();
  console.log("the contract address-------------->", buyMeACoffee.address);

}

// run the main function and catch any errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
