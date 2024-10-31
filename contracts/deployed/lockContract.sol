// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "../app/lockCoins.sol";
import "node_modules/@wandevs/message/contracts/app/WmbApp.sol";

contract lockContract is lockCoins, WmbApp {
    
    event CrossChainMint(bytes32 indexed messageId, uint256 indexed fromChainId, address indexed to, uint256 amount, address fromSC);

    constructor (address _admin, address _wmbGateway) {
        initialize(_admin, _wmbGateway); 
    }

    function _wmbReceive(
        bytes calldata data,
        bytes32 messageId,
        uint256 fromChainId,
        address fromSC
    ) internal override {
        (, address to, uint256 amount,) = abi.decode(data, (address, address, uint256, string));
        withdrawCoins(amount);
        emit CrossChainMint(messageId, fromChainId, to, amount, fromSC);
    }

    function crossTo(
        uint256 toChainId,
        address toSC,
        address toUser,
        uint256 amount,
        uint256 gasLimit
    ) public payable {
        lockCoin();
        uint fee = estimateFee(toChainId, gasLimit);
        _dispatchMessage(toChainId, toSC, abi.encode(toUser, amount), fee);
    }   
}