import ether from "./helpers/ether";
import EVMRevert from "./helpers/EVMRevert";

const BigNumber = web3.BigNumber;

const should = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

let TokenSale = artifacts.require("./TokenSale.sol");
let TestToken = artifacts.require("./TestToken.sol");

contract("Vault", accounts => {
  const owner = accounts[0];
  const spender = accounts[0];
  const destination = accounts[1];
  var token, sale;

  beforeEach(async () => {
    token = await TestToken.new();
    sale = await TokenSale.new(token.address);
    token.mint(sale.address);
  });

  it("sales has the totalSupply of the token contract", async () => {
    assert.ok(token);
    const totalSupply = await token.totalSupply();
    const salesTokenBalance = await token.balanceOf(sale.address);
    assert.equal(
      totalSupply.toNumber(),
      salesTokenBalance.toNumber(),
      "balance of sales should be total supply of token"
    );
  });

  it("token can be distributed to another address", async () => {
    const value = 10000;
    await sale.distribute(spender, value);
    const spenderBalance = await token.balanceOf(spender);
    assert.equal(
      spenderBalance,
      value,
      "balance of spender should equal the amount distributed"
    );
  });

  it("token can be spent", async () => {
    const value = 10000;
    await sale.distribute(spender, value);
    await token.transfer(destination, value / 2);
    const destinationBalance = await token.balanceOf(spender);
    assert.equal(
      destinationBalance,
      value / 2,
      "balance of destination should equal the amount spent"
    );
  });
});
