pragma solidity ^0.4.15;

import "./deps/MintableToken.sol";

contract TestToken is MintableToken {
    string public constant name = "TestToken";
    string public constant symbol = "TST";
    uint8 public constant decimals = 18;
}
