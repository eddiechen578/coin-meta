const GameContract = artifacts.require("GameContract");

module.exports = function (deployer: Truffle.Deployer) {
  deployer.deploy(GameContract);
};
