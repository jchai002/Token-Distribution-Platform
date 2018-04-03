const Controller = artifacts.require("./Controller.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Controller);
};
