const Controller = artifacts.require("./Controller.sol");
const Distributor = artifacts.require("./Distributor.sol");
const TestToken = artifacts.require("./TestToken.sol");

module.exports = function() {
  run();
};

async function run() {
  const controller = await Controller.deployed();
  const token1 = await TestToken.deployed();
  const tokenBeneficiary = web3.eth.accounts[0];
  const appWallet = web3.eth.accounts[1];
  const internalWallet = web3.eth.accounts[2];

  // get distributor1 instance
  const token1Struct = await controller.tokens(token1.address);
  const distributor1Address = token1Struct[3];
  const distributor1 = Distributor.at(distributor1Address);

  // test distribute
  console.log(
    "await controller.owner()",
    await controller.owner.call(),
    tokenBeneficiary
  );
  console.log(
    "distribute test: token balance before",
    await token1.balanceOf(tokenBeneficiary)
  );
  console.log("web3.toWei()", web3.toWei(1, "ether"));
  await controller.distribute(token1.address, tokenBeneficiary, 1000);
  console.log(
    "distribute test: token balance after",
    await token1.balanceOf(tokenBeneficiary)
  );

  // buy token test
  console.log(
    "buyTokens test: token balance before",
    await token1.balanceOf(tokenBeneficiary)
  );
  await distributor1.buyTokens(tokenBeneficiary, {
    from: tokenBeneficiary,
    value: web3.toWei(1, "ether")
  });
  console.log(
    "buyTokens test: token balance after",
    await token1.balanceOf(tokenBeneficiary)
  );

  // test fallback function
  console.log(
    "fallback test: token balance before",
    await token1.balanceOf(tokenBeneficiary)
  );
  await distributor1.sendTransaction({
    from: tokenBeneficiary,
    value: web3.toWei(1, "ether")
  });
  console.log(
    "fallback test: token balance after",
    await token1.balanceOf(tokenBeneficiary)
  );
}
