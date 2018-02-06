import ether from "./helpers/ether";
import EVMRevert from "./helpers/EVMRevert";

const BigNumber = web3.BigNumber;

const should = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

let Vault = artifacts.require("./Vault.sol");
let TestToken = artifacts.require("./TestToken.sol");

contract("Vault", accounts => {
  const owner = accounts[0];
  const admin = accounts[1];
  const destination = accounts[2];
  const spender = accounts[3];
  const approval_needed_threshold = 50;
  var token, vault;

  beforeEach(async () => {
    token = await TestToken.new();
    vault = await Vault.new(token.address, approval_needed_threshold);
    await vault.setAdmin(admin);
    await vault.setSpender(spender);
    await token.mint(vault.address, 888888888);
  });

  it("has a token", async () => {
    console.log("vault contract address", await vault.address);
    console.log("vault contract admin", await vault.admin());
    console.log("vault contract spender", await vault.spender());
    console.log("vault token contract address", await vault.token());
    assert.ok(token);
  });

  it("transaction can be executed directly by the spender if the amount is less than the threshold", async () => {
    let oldBalance;
    let transferAmt = approval_needed_threshold - 2;
    let receiver = accounts[2];
    await vault
      .token()
      .then(() => token.balanceOf(vault.address))
      .then(balance => (oldBalance = balance))
      .then(() => vault.sendTokenTo(receiver, transferAmt, { from: spender }))
      .then(() => token.balanceOf(vault.address))
      .then(balance => {
        assert.equal(balance.toNumber() + transferAmt, oldBalance.toNumber());
      });
  });

  it("transaction will execute after admin approval if the amount is greater than the threshold", async () => {
    let oldBalance;
    let transferId;
    let transferAmt = approval_needed_threshold + 2;
    let receiver = accounts[2];
    await vault
      .token()
      .then(() => token.balanceOf(vault.address))
      .then(balance => (oldBalance = balance))
      .then(() => vault.sendTokenTo(receiver, transferAmt, { from: spender }))
      .then(tx => (transferId = tx.logs[0].args.transferId))
      .then(() => token.balanceOf(vault.address))
      .then(balance => {
        assert.equal(balance.toNumber(), oldBalance.toNumber());
      })
      .then(() => vault.admin())
      .then(admin => vault.confirm(transferId, { from: admin }))
      .then(() => token.balanceOf(vault.address))
      .then(balance => {
        assert.equal(balance.toNumber() + transferAmt, oldBalance.toNumber());
      });
  });
});
