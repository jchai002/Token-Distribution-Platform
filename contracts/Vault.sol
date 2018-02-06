pragma solidity 0.4.18;

import "./deps/Owned.sol";
import "./deps/ERC20.sol";

contract Vault is Owned {

    struct Pending {
        address receiver;
        uint256 amount;
        bool approved;
    }

    ERC20 public token;
    uint256 public threshold;

    address public admin;
    address public spender;


    Pending[] public pendings;

    event Approved(uint id);
    event AddedToPending(uint transferId);
    event Sent(address receiver, uint amount);

    modifier isPending(uint _id) {
        if (_id < pendings.length && !pendings[_id].approved) {
            _;
        }
    }

    modifier onlyAdmin() {
        if (msg.sender == admin) {
            _;
        }
    }

    modifier onlySpender() {
        if (msg.sender == spender) {
            _;
        }
    }

    function Vault(address _token, uint256 _threshold) public {
        token = ERC20(_token);
        threshold = _threshold;
        admin = msg.sender;
        spender = msg.sender;
    }

    function setToken(address _token) public onlyContractOwner {
        token = ERC20(_token);
    }

    function setAdmin(address _admin) public onlyContractOwner {
        admin = _admin;
    }

    function setSpender(address _spender) public onlyContractOwner {
        spender = _spender;
    }

    function sendTokenTo(address _destination, uint256 _amount) public onlySpender {
        if (_amount >= threshold) {
            pendings.push(Pending({
                receiver: _destination,
                amount: _amount,
                approved: false
            }));
            AddedToPending(pendings.length - 1);
        } else {
            token.transfer(_destination, _amount);
            Sent(_destination, _amount);
        }
    }

    function confirm(uint _id) public onlyAdmin isPending(_id) {
        Pending storage _pending = pendings[_id];
        token.transfer(_pending.receiver, _pending.amount);
        Approved(_id);
        Sent(_pending.receiver, _pending.amount);
        _pending.approved = true;
    }
}
