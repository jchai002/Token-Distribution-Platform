pragma solidity ^0.4.18;

import "./base/SafeMath.sol";
import "./base/Ownable.sol";
import "./base/ERC20.sol";

contract Distributor is Ownable {
    using SafeMath for uint256;

    ERC20 public token;
    address public thirdPartyWallet;
    address public internalWallet;

    // how many token units a buyer gets per wei
    uint256 public rate = 1000;
    // amount of raised money in wei
    uint256 public weiRaised;

    /**
     * event for token purchase logging
     * @param purchaser who paid for the tokens
     * @param beneficiary who got the tokens
     * @param value weis paid for purchase
     * @param amount amount of tokens purchased
     */
    event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);
    event TokenDistribution(address indexed to, uint256 amount);

      function Distributor(address _token, uint256 _rate, address _thirdPartyWallet, address _internalWallet)
        public
      {
          token = ERC20(_token);
          rate = _rate;
          thirdPartyWallet = _thirdPartyWallet;
          internalWallet = _internalWallet;
      }

    function distribute(address _to, uint _amount)
      onlyOwner
      public
    {
        token.transfer(_to, _amount);
        TokenDistribution(_to, _amount);
    }

    // low level token purchase function
    function buyTokens(address _beneficiary)
      public
      payable
    {
      require(_beneficiary != address(0));
      require(msg.value >= 0);

      uint256 weiAmount = msg.value;

      // calculate token amount to be created
      uint256 tokenAmount = weiAmount.mul(rate);

      // update state
      weiRaised = weiRaised.add(weiAmount);

      token.transfer(_beneficiary, tokenAmount);
      TokenPurchase(msg.sender, _beneficiary, weiAmount, tokenAmount);

      forwardFunds();
    }

    // send ether to the fund collection wallet
    // override to create custom fund forwarding mechanisms
    function forwardFunds()
      internal
    {
      thirdPartyWallet.transfer(msg.value.mul(95).div(100));
      internalWallet.transfer(msg.value.mul(5).div(100));
    }

    // fallback function can be used to buy tokens
    function ()
      external
      payable
    {
      buyTokens(msg.sender);
    }

}
