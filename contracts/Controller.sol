pragma solidity ^0.4.18;

import "./base/Ownable.sol";
import "./Distributor.sol";

contract Controller is Ownable {
  struct App {
    string app;
    string description;
    address tokenAddress;
    address distributorAddress;
  }

  /* mapping of token symbol to app */
  mapping (string => App) apps;

  function addApp(string _tokenSymbol, string _app, string _description, address _tokenAddress, address _distributorAddress)
      onlyOwner
      public
  {
    // store this app with tokenSymbol as key and app info as value
    apps[_tokenSymbol] = App(
      _app,
      _description,
      _tokenAddress,
      _distributorAddress
    );
  }

  function resetDistributorAddress(string _tokenSymbol, address _distributorAddress)
      onlyOwner
      public
  {
    // store this app with tokenSymbol as key and app info as value
    App storage app = apps[_tokenSymbol];
    app.distributorAddress = _distributorAddress;
  }

  function distribute(string _tokenSymbol, address _to, uint _amount)
    onlyOwner
    public
  {
    App app = apps(_tokenSymbol);
    Distributor distributor = Distributor(app.distributorAddress);
    distributor.distribute(_to, _amount);
  }

}
