const NFTMarket = artifacts.require("nftContract");

module.exports = function(deployer) {
  deployer.deploy(NFTMarket);
};
