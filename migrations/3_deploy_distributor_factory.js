const Factory = artifacts.require("./DistributorFactory.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Factory);
};
