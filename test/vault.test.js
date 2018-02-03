import ether from "./helpers/ether";
import EVMRevert from "./helpers/EVMRevert";

const BigNumber = web3.BigNumber;

const should = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

const Vault = artifacts.require("Vault");
const TestToken = artifacts.require("TestToken");

contract("Vault", accounts => {
  const spender = accounts[0];
  const admin = accounts[1];
  const destination = accounts[2];
  const approval_needed_threshold = 50;
  var token, vault;
  // function Vault(address _spender, address _admin, uint _approval_needed_threshold)

  beforeEach(async () => {
    token = await TestToken.new();
    vault = await Vault.new(token, spender, admin, approval_needed_threshold);
  });

  it("has a token", async () => {
    console.log("vault contract address", await vault.address);
    console.log("vault token contract address", await vault.token());
  });

  it("has a token balance", async () => {
    console.log();
  });

  it(
    "transaction can be executed directly by the spender if the amount is less than the threshold"
  );

  it(
    "transaction will execute after admin approval if the amount is greater than the threshold"
  );

  it(
    "transaction will not execute if the amount is greater than the threshold and admin has not approved it"
  );
});
