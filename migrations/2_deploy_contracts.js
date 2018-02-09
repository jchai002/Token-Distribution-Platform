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
  await deployer.deploy(TokenSale, token.address);
  const sale = await TokenSale.deployed();

  // distribute tokens
  await token.mint(sale.address);
  console.log("sale address balance", await token.balanceOf(sale.address));
  const value = 888888888;
  await sale.distribute(spender, value);
  console.log("spender balance", await token.balanceOf(spender));
}

//
// Running migration: 1_initial_migration.js
//   Replacing Migrations...
//   ... 0x248bb9135c67cba563c6d6076a5cfa01d38276dfd461e7f4d943b27c514a4e80
//   Migrations: 0x7192d53091386d8f9a7ece04dba52e9b407ed06c
// Saving successful migration to network...
//   ... 0xf7483d8c1a49698402449b9e53544a51f20d15bca096655c44315a7524488667
// Saving artifacts...
// Running migration: 2_deploy_contracts.js
//   Replacing TestToken...
//   ... 0xe391236366bd13953a67ca8ae362cce068412faa3f88d97a6084f0b2e9980217
//   TestToken: 0x1752ace846344dbb4733ce54f184cd1a7d064ddb
// Saving successful migration to network...
//   Deploying TokenSale...
//   ... 0xbe09be5c92f3549b473a5d3bcab27a63e9b1bf3034cc64093e88958feb8dabd7
//   ... 0x6a612ad5d226d29bd69ea2ab4e18cec4b38811f66193c79460b1203efd41909f
//   TokenSale: 0x2e252972e32ade03fed4d7109554f2498a5d01b1
//   ... 0x2325d94213e7372d5e0568f9a5a963f6635131beaed0b01d98423cf4e13a1b2e
// Saving artifacts...
// sale address balance BigNumber { s: 1, e: 9, c: [ 1000000000 ] }
//   ... 0x70e1a04ce9ad9164d6eb6670ef170a572cc0b9dbdc4b795feb9e27645566170a
// spender balance BigNumber { s: 1, e: 8, c: [ 888888888 ] }
