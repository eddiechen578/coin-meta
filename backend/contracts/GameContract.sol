// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./Factory.sol";
import "./interface/DiceInterface.sol";

contract GameContract is Factory {

    using SafeMath for uint256;

    enum Bet {
        Lo,
        Hi
    }

    enum Result {
        Lose,
        Win
    }

    enum Jackpot {
        None,
        Min,
        Medi,
        Max
    }

    struct Game {
        Bet bet;
        uint256 wager;
        bool isBetSet; //default value is false
        uint8 destiny;
        bool trigger;
    }

    mapping(address => Game) public games;

    mapping(address => uint256) public ownerBlances;

    mapping(address => uint256) public playerBlances;

    mapping(Jackpot => uint256) private reward;

    uint8 private compare = 4;

    uint8 private _status;

    address private owner;

    constructor() public {
        ownerBlances[msg.sender] = 0;
        _status = 0;
        owner = msg.sender;
        reward[Jackpot.None] = 0;
        reward[Jackpot.Min] = 1000000000000000;
        reward[Jackpot.Medi] = 10000000000000000;
        reward[Jackpot.Max] = 100000000000000000;
    }

    event GameResult(address indexed player,
        uint256 wager, Bet bet, uint8 destiny, uint256 balance,
        Result result,
        uint8 is_bonus,
        uint256 bonus,
        Result bonus_res,
        uint256 timestamp,
        bool trigger
    );

    event BalanceEvent(address indexed player, uint256 balance);

    event OwnerBalanceEvent(address indexed owner, uint256 balance);

    event NewGameEvent(address indexed player, Game game);

    modifier onlyOwner{
        require(msg.sender == owner, "not authorized");
        _;
    }

    modifier onlyPlayer{
        require(owner != msg.sender, "only player operate");
        _;
    }

    modifier isBetEnoughOfPlayer(uint256 wager){
        require(playerBlances[msg.sender] >= wager, "player have not enough balance");
        _;
    }

    modifier isBetEnoughOfOwner(uint256 wager){
        require(ownerBlances[owner] >= wager, "owner didn't have enough bet");
        _;
    }

    modifier nonRetryRoll(){
        require(games[msg.sender].isBetSet == false, "ReentrancyGuard: reentrant call");

        games[msg.sender].isBetSet = true;

        _;

        games[msg.sender].isBetSet = false;
    }

    modifier nonReentrant(){
        require(_status == 0, "ReentrancyGuard: reentrant call");

        _status = 1;

        _;

        _status = 0;

    }


    function deposit() public onlyPlayer payable {

        playerBlances[msg.sender] += msg.value;

        emit BalanceEvent(msg.sender, playerBlances[msg.sender]);
    }

    function ownerDeposit() public onlyOwner payable {

        ownerBlances[msg.sender] += msg.value;

        emit OwnerBalanceEvent(msg.sender, ownerBlances[msg.sender]);
    }

    function isOwner() public view returns (bool){
        return owner == msg.sender;
    }

    function getOwnerBalance() public view onlyOwner returns (uint256){

        return ownerBlances[msg.sender];
    }

    function getBalance() public view returns (uint256)  {
        return playerBlances[msg.sender];
    }

    function win(uint256 wager) private isBetEnoughOfOwner(wager) {

        playerBlances[msg.sender] += wager;
        ownerBlances[owner] -= wager;
    }

    function loss(uint256 wager) private isBetEnoughOfPlayer(wager) {

        playerBlances[msg.sender] -= wager;
        ownerBlances[owner] += wager;
    }

    function withdraw() public nonReentrant{
        require(owner != msg.sender, "only player operate");

        uint256 blances = playerBlances[msg.sender];
        playerBlances[msg.sender] = 0;
        (bool success,) = address(msg.sender).call{value: blances}("");

        require(success, "withdraw failed to send");

        emit BalanceEvent(msg.sender, playerBlances[msg.sender]);
    }

    function ownerWithdraw(uint256 amount) public {
        require(owner == msg.sender, "Not authorized");
        require(ownerBlances[owner] >= amount, "Insufficient balance");

        ownerBlances[owner] -= amount;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdraw failed to send");

        emit OwnerBalanceEvent(msg.sender, ownerBlances[msg.sender]);
    }

    function getGame() public view returns (Game memory){

        return games[msg.sender];
    }

    function roll(uint8 jackpot, uint8 bet, uint256 wager, bool trigger) public onlyPlayer isBetEnoughOfPlayer(wager) isBetEnoughOfOwner(wager) nonRetryRoll returns (uint8){

        require(jackpot <= 3, "Invalid jackpot size");
        require(bet == 0 || bet == 1, "Invalid bet size");
        Bet guess_bet = bet == 0 ? Bet.Lo : Bet.Hi;

        games[msg.sender].wager = wager;
        games[msg.sender].bet = guess_bet;
        games[msg.sender].trigger = !trigger;

        emit NewGameEvent(msg.sender, games[msg.sender]);

        DiceInterface build = build(games[msg.sender].wager);

        //        games[msg.sender].isBetSet = false;
        games[msg.sender].destiny = build.roll(uint8(games[msg.sender].bet));

        Result res;
        Result bonus_res;
        uint8 is_bonus = 0;
        uint256 bonus;

        if (games[msg.sender].bet == Bet.Hi) {
            if (games[msg.sender].destiny >= compare) {
                win(games[msg.sender].wager);
                res = Result.Win;
            } else {
                loss(games[msg.sender].wager);
                res = Result.Lose;
            }
        } else {
            if (games[msg.sender].destiny < compare) {
                win(games[msg.sender].wager);
                res = Result.Win;
            } else {
                loss(games[msg.sender].wager);
                res = Result.Lose;
            }
        }

        if (Jackpot(jackpot) != Jackpot.None) {

            uint256 extra_bonus;
            extra_bonus =  (reward[Jackpot(jackpot)] * 5);

            require(playerBlances[msg.sender] >= reward[Jackpot(jackpot)], "player has not enough blances");
            require(ownerBlances[owner] >= extra_bonus, "owner has not enough blances");

            is_bonus = 1;
            playerBlances[msg.sender] -= reward[Jackpot(jackpot)];
            ownerBlances[owner] += reward[Jackpot(jackpot)];

            if (games[msg.sender].destiny == 6) {

                playerBlances[msg.sender] += extra_bonus;
                ownerBlances[owner] -= extra_bonus;

                bonus_res = Result.Win;
                bonus = extra_bonus;
            }
        }


        emit GameResult(msg.sender, games[msg.sender].wager, games[msg.sender].bet, games[msg.sender].destiny, playerBlances[msg.sender], res,
            is_bonus,
            bonus,
            bonus_res,
            block.timestamp,
            games[msg.sender].trigger
        );

        return games[msg.sender].destiny;
    }

    function deleteContract() public onlyOwner{

        address payable recipient = payable(msg.sender);
        uint256 balance = ownerBlances[msg.sender];

        selfdestruct(recipient);
    }

    function round(uint256 number, uint256 decimals) internal pure returns (uint256) {
        uint256 factor = 10 ** decimals;
        uint256 halfFactor = factor / 2;

        return (number + halfFactor) / factor;
    }

}
