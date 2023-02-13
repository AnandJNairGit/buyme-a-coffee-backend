const { ethers } = require("hardhat");

// function to get balance of an Ethereum address in Ether
const getBalance = async (address) => {
  // retrieve the balance of the address in wei
  const balance = await ethers.provider.getBalance(address);
  // format the balance in Ether
  const formattedBalance = ethers.utils.formatEther(balance);
  // return the formatted balance
  return formattedBalance;
};

// function to log the balance of multiple Ethereum addresses
const consoleBalance = async (addressArray) => {
  // loop through each address
  for (let index = 0; index < addressArray.length; index++) {
    // retrieve the balance of the current address
    const balance = await getBalance(addressArray[index]);
    // log the balance to the console
    console.log(`the balance of account ${addressArray[index]} is ${balance}`);
  }
};

// main function to deploy the contract and log the balances of the accounts
async function main() {
  // retrieve the signer objects for the connected Ethereum accounts
  const [owner, acc1, acc2, acc3] = await ethers.getSigners();
  // retrieve the contract factory for the BuyMeACoffee contract
  const contract = await ethers.getContractFactory("BuyMeACoffee");
  // deploy the BuyMeACoffee contract
  const buyMeACoffee = await contract.deploy();
  // wait for the contract deployment to be confirmed
  await buyMeACoffee.deployed();xvvcvc

  buyMeACoffee.on("FunderEvent", (message) => {
    console.log("THE MESSAGE------>", message);
  });

  // log a message indicating the beginning of the balance check
  console.log("accounts balance before funding:------------------->");
  // log the balance of all connected Ethereum accounts
  await consoleBalance([
    owner.address,
    acc1.address,
    acc2.address,
    acc3.address,
  ]);

  const amount = { value: ethers.utils.parseEther("1") };
  await buyMeACoffee
    .connect(acc1)
    .buyCoffee("anand", "hey! love your work!!!", amount);
  await buyMeACoffee
    .connect(acc2)
    .buyCoffee("suresh ", " keep going bro !!!", amount);
  await buyMeACoffee
    .connect(acc3)
    .buyCoffee("rohit", "build a frontend!!!", amount);

    // conbuyMeACoffee.getFunders();

  console.log("accounts balance before funding:------------------->");
  await consoleBalance([
    owner.address,
    acc1.address,
    acc2.address,
    acc3.address,
  ]);

  console.log("the funders list are------>", await buyMeACoffee.getFunders());
}

// run the main function and catch any errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
