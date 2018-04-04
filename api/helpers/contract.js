const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER)
);

module.exports = {
  getContractInstance: async function(json) {
    return await web3.eth
      .contract(json.abi)
      .at(json.networks["1522807175792"].address);
  }
};
