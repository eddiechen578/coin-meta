pragma solidity >=0.4.22 <0.9.0;

import "./Dice.sol";
import "./interface/DiceInterface.sol";

contract DiceSpec is Dice, DiceInterface{

    function roll(uint8 bet) public returns (uint8){

        uint8 result;

        if(Bet(bet) == Bet.Hi){
            result = chooseMin();
        }else {
            result = chooseMax();
        }

        return result;
    }

    function chooseMin ()private returns(uint8){

        uint8 roll1 = random();
        changeRandomFactor(uint256(roll1));

        uint8 roll2 = random();
        changeRandomFactor(uint256(roll2));

        return min(roll1, roll2);
    }

    function chooseMax ()private returns(uint8){

        uint8 roll1 = random();

        changeRandomFactor(uint256(roll1));

        uint8 roll2 = random();

        changeRandomFactor(uint256(roll2));

        return max(roll1, roll2);
    }

}