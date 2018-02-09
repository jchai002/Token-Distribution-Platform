pragma solidity ^0.4.18;

import "./deps/Ownable.sol";
import "./TestToken.sol";

contract TokenSale is Ownable {

    ERC20 public token;

    function TokenSale(address _token)
      public
    {
        token = TestToken(_token);
    }

    function distribute(address _to, uint _amount)
      public
    {
        token.transfer(_to, _amount);
    }

}
