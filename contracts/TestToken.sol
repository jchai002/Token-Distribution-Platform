pragma solidity ^0.4.15;

import './base/StandardToken.sol';
import './base/Ownable.sol';

contract TestToken is StandardToken, Ownable {
    string public constant name = "TestToken";
    string public constant symbol = "TST";
    uint8 public constant decimals = 18;
    uint public totalSupply = 1000000000;
    bool public mintingFinished = false;

    modifier canMint() {
      if(!mintingFinished) {
        _;
      }
    }

    /*
    @dev Mint all tokens, call only be called one time.
    @param to, should be the address of the sales contract
    */
    function mint(address _to)
      onlyOwner()
      canMint()
      public
      returns (bool)
    {
      mintingFinished = true;
      balances[_to] = balances[_to].add(totalSupply);
      Transfer(address(0), _to, totalSupply);
      return true;
    }
}
