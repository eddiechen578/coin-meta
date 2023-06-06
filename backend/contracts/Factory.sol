pragma solidity ^0.8.0;

import "./interface/DiceInterface.sol";
import "./DiceCommon.sol";
import "./DiceSpec.sol";

contract Factory {

    function build(uint256 wager) public returns (DiceInterface){

        DiceInterface dice;

        if(wager >= 100000000000000000){

            dice = new DiceSpec();
        }else {
            dice = new DiceCommon();
        }

        return dice;
    }


}