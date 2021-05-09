const hre = require("hardhat");

async function main() {
  // default greeter project (aka hello world)
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);

  // custom token
  // const Token = await hre.ethers.getContractFactory("Token");
  // const token = await Token.deploy();
  // await token.deployed();
  // console.log("Token deployed to:", token.address);

  // ERC20 token
  const Token = await hre.ethers.getContractFactory("FMOToken");
  const token = await Token.deploy(100000); // initial supply
  await token.deployed();
  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
