pragma solidity ^0.4.18;

import "./base/Ownable.sol";
import "./Distributor.sol";

contract DistributorFactory is Ownable {

    function deployDistributor(address _token, uint _rate, address _appWallet, address _internalWallet, address _controller)
      public
      returns(address)
    {
      Distributor distributor = new Distributor(_token, _rate, _appWallet, _internalWallet);
      /* make the controller contract the owner of the distributor */
      distributor.transferOwnership(_controller);
      return address(distributor);
    }

}
