const Controller = artifacts.require("./Controller.sol");
const Distributor = artifacts.require("./Distributor.sol");
const TestToken = artifacts.require("./TestToken.sol");
const TestToken2 = artifacts.require("./TestToken2.sol");

module.exports = function(deployer, network, accounts) {
  setup(deployer, network, accounts);
};

async function setup(deployer, network, accounts) {
  const controller = await Controller.deployed();
  const token1 = await TestToken.deployed();
  const token2 = await TestToken2.deployed();
  const appWallet = accounts[1];
  const internalWallet = accounts[2];

  // deploy distributors
  await controller.deployDistributor(
    token1.address,
    1500,
    "test app 1",
    "first app in platform",
    appWallet,
    internalWallet
  );

  await controller.deployDistributor(
    token2.address,
    2000,
    "test app 2",
    "second app in platform",
    appWallet,
    internalWallet
  );

  // get distributor instances
  const token1Struct = await controller.tokens(token1.address);
  const distributor1Address = token1Struct[3];
  const distributor1 = Distributor.at(distributor1Address);

  const token2Struct = await controller.tokens(token2.address);
  const distributor2Address = token2Struct[3];
  const distributor2 = Distributor.at(distributor2Address);

  // mint initial supply to distributors
  await token1.mint(distributor1Address);
  await token2.mint(distributor2Address);
}
