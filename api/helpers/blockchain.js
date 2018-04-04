const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER)
);
const Tx = require("ethereumjs-tx");

function getTransanctionStatus(tx) {
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionReceipt(tx, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
}

module.exports = {
  pollForTransactionState: function(tx) {
    return new Promise(async function poll(resolve) {
      var result = await getTransanctionStatus(tx);
      // if the transaction is not mined
      if (!result || !result.blockNumber) {
        // recursive call to poll again
        console.log("Re-trying with hash", tx);
        setTimeout(poll.bind(null, resolve), 3000);
      } else {
        // otherwise stop polling and resolve
        resolve(result);
      }
    });
  },
  sendRawTransaction: async function(data, to) {
    const admin = process.env.ADMIN;
    const adminPrivKey = new Buffer(process.env.ADMIN_PRIVATE_KEY, "hex");
    const txCount = web3.eth.getTransactionCount(admin);
    const nonceHex = web3.toHex(txCount);

    const gasPrice = web3.eth.gasPrice;
    const gasPriceHex = web3.toHex(gasPrice);
    const gasLimitHex = web3.toHex(3000000);

    var tx = new Tx({
      nonce: nonceHex,
      gasPrice: gasPriceHex,
      gasLimit: gasLimitHex,
      from: admin,
      to,
      data
    });
    tx.sign(adminPrivKey);

    var stx = tx.serialize();
    web3.eth.sendRawTransaction("0x" + stx.toString("hex"), (err, hash) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("tx hash: " + hash);
    });
  }
};
