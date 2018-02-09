const TokenSale = artifacts.require("./TokenSale.sol");
const TestToken = artifacts.require("./TestToken.sol");

module.exports = function(deployer, network, accounts) {
  deployContracts(deployer, accounts);
};

async function deployContracts(deployer, accounts) {
  // const owner = accounts[0];
  // const spender = accounts[0];
  // const destination = accounts[1];
  const spender = "0x11f0cdddd75259b02418e5c116d904621632a590";

  await deployer.deploy(TestToken);
  const token = await TestToken.deployed();
  // await deployer.deploy(TokenSale, token.address);
  // const sale = await TokenSale.deployed();
  //
  // // distribute tokens
  // await token.mint(sale.address);
  // console.log("sale address balance", await token.balanceOf(sale.address));
  // const value = 888888888;
  // await sale.distribute(spender, value);
  // console.log("spender balance", await token.balanceOf(spender));
}
