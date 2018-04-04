const blockchain = require("../helpers/blockchain");
const contract = require("../helpers/contract");
const ControllerJSON = require("../../build/contracts/Controller.json");

module.exports = {
  deployDistributor: async function(req, res) {
    const controller = await contract.getContractInstance(ControllerJSON);
    // deployDistributor(address _tokenAddress, uint _conversionRate, string _appName, string _appDescription,  address _appWallet, address _internalWallet)
    blockchain.sendRawTransaction(
      controller.deployDistributor.getData(
        "0x0",
        8888,
        "app name",
        "great fun app",
        "0x0",
        "0x0"
      ),
      controller.address
    );
  }
};
