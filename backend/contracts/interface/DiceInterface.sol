pragma solidity >=0.4.22 <0.9.0;

interface DiceInterface {

    enum Bet {
        Lo,
        Hi
    }

    function roll(uint8 bet) external returns (uint8);
}