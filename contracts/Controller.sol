pragma solidity ^0.4.18;

import "./base/Ownable.sol";
import "./Distributor.sol";

contract Controller is Ownable {
  struct App {
    string app;
    string description;
    string tokenSymbol;
    address tokenAddress;
    address distributorAddress;
  }

  /* mapping of token address to app */
  mapping (address => App) apps;

  function addApp(address _tokenAddress, string _app, string _description, string _tokenSymbol, address _distributorAddress)
      onlyOwner
      public
  {
    // store this app with tokenSymbol as key and app info as value
    apps[_tokenAddress] = App(
      _app,
      _description,
      _tokenSymbol,
      _tokenAddress,
      _distributorAddress
    );
  }

  function resetDistributorAddress(address _tokenAddress, address _distributorAddress)
      onlyOwner
      public
  {
    // store this app with tokenSymbol as key and app info as value
    App storage app = apps[_tokenAddress];
    app.distributorAddress = _distributorAddress;
  }

  function distribute(address _tokenAddress, address _to, uint _amount)
    onlyOwner
    public
  {
    Distributor distributor = Distributor(apps[_tokenAddress].distributorAddress);
    distributor.distribute(_to, _amount);
  }

}
