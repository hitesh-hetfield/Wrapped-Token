// SPDX-License-Identifier: MIT

pragma solidity ^0.8.22;

contract lockCoins {

    uint256 public totalSupply;
    
    mapping(address => uint256) balances; /* store the balances of a user */
    mapping(uint256 => address) approvedChainIds; /* mapping to store the approved chain ids */

    event coinsLocked(address user, uint256 amount); /* Event to confirm the locking of coins */
    event coinsReleased(address user, uint256 amount); /* Event to release the coins */

    // /* add in chain ids */
    // function approveChainIds(uint256 chainId, address gatewayAddress) external {
    //     approvedChainIds[chainId] = gatewayAddress;
    // }

    // fallback() external payable {
    //     lockCoin();
    // }

    /* Lock native coins */
    function lockCoin() public payable {
        balances[msg.sender] += msg.value;

        totalSupply += msg.value;
        emit coinsLocked(msg.sender, msg.value);
    }

    /* Withdraw coins to be used if coins are locked accidentally */
    function withdrawCoins(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);

        totalSupply -= amount;
        emit coinsReleased(msg.sender, amount);
    }

    /* Check the balance of a particular account */
    function balanceOf(address user) external view returns(uint256) {
        return balances[user]; 
    }
}