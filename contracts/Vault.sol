pragma solidity ^0.4.15;

import "./TestToken.sol";
import "./deps/Ownable.sol";

contract Vault is Ownable {

    /*
     *  Storage
     */
    TestToken public token;
    address public admin;
    address public spender;
    uint public approval_needed_threshold;

    struct Transaction {
        address destination;
        uint value;
        bytes data;
        bool executed;
    }

    /*
     *  Events
     */

    /*
     *  Modifiers
     */

    modifier notNull(address _address) {
        require(_address != 0);
        _;
    }

    modifier onlySpender() {
        require(msg.sender == spender);
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }


    /*
     * Public functions
     */

    function Vault(address _spender, address _admin, uint _approval_needed_threshold)
        public
    {
      spender = _spender;
      admin = _admin;
      approval_needed_threshold = _approval_needed_threshold;
    }

    function setTokenContract(address _token_contract) onlyOwner() public {
      token = TestToken(_token_contract);
    }

    /*
    * @dev if called by the allows the spender, transfer the _amount number of tokens to _destination, if the _amount is greater than _approval_needed_threshold, the admin must confirm the transaction
    */
    function spendToken(address _destination, uint _amount)
      notNull(_destination)
      onlySpender()
      public
    {
      /* some checking logic */
      if (true) {
        /* is this transferring the token balance from the vault or msg.sender? Please help me confirm */
        token.transfer(_destination, _amount);
      }
    }

    function approveAndExecuteTransaction()
      onlyAdmin()
      public 
    {
      /* get the tx from the pending pool and execute it */
    }


}
