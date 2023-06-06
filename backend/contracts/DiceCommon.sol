pragma solidity >=0.4.22 <0.9.0;

import "./Dice.sol";
import "./interface/DiceInterface.sol";

contract DiceCommon is Dice, DiceInterface {

    function roll(uint8 bet) public  returns (uint8){
        uint8 result;
        uint8 tmp;

        tmp = random();

        changeRandomFactor(uint256(tmp));

        result = random();

        changeRandomFactor(uint256(result));

        return result;
    }
}