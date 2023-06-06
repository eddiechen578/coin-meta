pragma solidity >=0.4.22 <0.9.0;

contract Dice {

    uint256 private randomFactor;

    constructor(){
        randomFactor = 10;
    }

    function changeRandomFactor(uint256 num)public {
       randomFactor += num;
    }

    function random() public view returns (uint8) {

        bytes32 combinedHash = keccak256(abi.encodePacked(block.timestamp, msg.sender, uint256(randomFactor)));

        return uint8(uint(combinedHash) % 6 + 1);

    }

    function min(uint8 a, uint8 b) public pure returns (uint8) {
        if (a < b) {
            return a;
        } else {
            return b;
        }
    }

    function max(uint8 a, uint8 b) public pure returns (uint8) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }
}