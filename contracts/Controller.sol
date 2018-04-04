pragma solidity ^0.4.18;

import "./base/Ownable.sol";
import "./Distributor.sol";

contract Controller is Ownable {
  struct Token {
    string app;
    string appDescription;
    address tokenAddress;
    address distributorAddress;
    address appWallet;
  }

  /* mapping of token address to app */
  mapping (address => Token) public tokens;


  /* @dev: this is the factory function for deploying distributors */
  function deployDistributor(address _tokenAddress, uint _conversionRate, string _appName, string _appDescription,  address _appWallet, address _internalWallet)
    onlyOwner
    public
  {
    Distributor distributor = new Distributor(_tokenAddress, _conversionRate, _appWallet, _internalWallet);
    registerToken(_tokenAddress, _appName, _appDescription, address(distributor), _appWallet);
  }

  function registerToken(address _tokenAddress, string _appName, string _appDescription, address _distributorAddress, address _appWallet)
      internal
  {
    // store this token with token address as key and info as value
    tokens[_tokenAddress] = Token(
      _appName,
      _appDescription,
      _tokenAddress,
      _distributorAddress,
      _appWallet
    );
  }

  /* @dev If distributor contract was updated, register the new address in controller */
  function resetDistributorAddress(address _tokenAddress, address _distributorAddress)
      onlyOwner
      public
  {
    // store this app with tokenSymbol as key and app info as value
    tokens[_tokenAddress].distributorAddress =  _distributorAddress;
  }

  /* @dev If controller contract need to be updated, update the distributor owners to the new controller contract */
  function transferDistributorOwnership(address _tokenAddress, address _newOwner)
    onlyOwner
    public
  {
    Distributor distributor = Distributor(tokens[_tokenAddress].distributorAddress);
    distributor.transferOwnership(_newOwner);
  }

  function distribute(address _tokenAddress, address _to, uint _amount)
    onlyOwner
    public
  {
    Distributor distributor = Distributor(tokens[_tokenAddress].distributorAddress);
    distributor.distribute(_to, _amount);
  }

}
