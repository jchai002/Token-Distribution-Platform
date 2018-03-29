pragma solidity ^0.4.18;

import "./base/Ownable.sol";
import "./Distributor.sol";

contract DistributorFactory is Ownable {

    function deployDistributor(address _token, uint _rate, address _thirdPartyWallet, address _internalWallet, address _admin)
      public
      returns(address)
    {
      Distributor distributor = new Distributor(_token, _rate, _thirdPartyWallet, _internalWallet);
      distributor.transferOwnership(_admin);
      return address(distributor);
    }

}
