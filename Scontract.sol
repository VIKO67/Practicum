pragma solidity ^0.4.0;

contract Swallet {
    mapping (address => Permit) myAddressmapping;

    event AddingSender ( address Adder, address addee, uint amountsendable);

    struct Permit {
        bool Allowed;
        uint maxTransferAmount;
    }
    function addAddresstoSenderList(address permitted, uint maxTransferAmount) onlyowner public {
        myAddressmapping[permitted] = Permit(true, maxTransferAmount);
        emit AddingSender(msg.sender, permitted, maxTransferAmount);
    }

    function sendFunds(address receiver, uint amountinWei) public {
        if(myAddressmapping[msg.sender].Allowed){
            if(myAddressmapping[msg.sender].maxTransferAmount >= amountinWei) {
                bool istheAmountSent = receiver.transfer(amountinWei);
                if (!istheAmountSent) {
                    revert();
                }
            } else {
                revert();
            }
        } else {
            revert();
        }
    }
    function removeAddressfromSenderList (address theAddress) public {
        delete permittedAddresses[theAddress];
    }
}