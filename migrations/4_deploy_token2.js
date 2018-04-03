const TestToken2 = artifacts.require("./TestToken2.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(TestToken2);
};
