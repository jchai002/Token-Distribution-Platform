const Controller = artifacts.require("./Controller.sol");
const TestToken = artifacts.require("./TestToken.sol");
const TestToken2 = artifacts.require("./TestToken2.sol");

module.exports = function() {
  setup();
};

async function setup() {
  const accounts = web3.eth.accounts;
  console.log("accounts", web3.eth.accounts);
  const controller = await Controller.deployed();
  const token1 = await TestToken.deployed();
  const token2 = await TestToken2.deployed();
  const appWallet = accounts[1];
  const internalWallet = accounts[2];

  // deploy distributors
  controller.deployDistributor(
    token1.address,
    1500,
    "test app 1",
    "first app in platform",
    appWallet,
    internalWallet
  );

  controller.deployDistributor(
    token2.address,
    2000,
    "test app 2",
    "second app in platform",
    appWallet,
    internalWallet
  );

  const token1Struct = await controller.tokens(token1.address);
  const distributor1Address = token1Struct[2];

  const token2Struct = await controller.tokens(token2.address);
  const distributor2Address = token2Struct[2];
  console.log(token1Struct, token2Struct);
  console.log(distributor1Address, distributor2Address);
}
