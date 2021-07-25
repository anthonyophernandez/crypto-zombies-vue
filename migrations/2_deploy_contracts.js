const ZombieFactory = artifacts.require("ZombieFactory");
const ZombieFeeding = artifacts.require("ZombieFeeding");
const ZombieHelper = artifacts.require("ZombieHelper");
const ZombieAttack = artifacts.require("ZombieAttack");
const ZombieOwnership = artifacts.require("ZombieOwnership");
const Ownable = artifacts.require("Ownable");

module.exports = function (deployer) {
  //deployer.deploy(Ownable);
  //deployer.deploy(ZombieFactory);
  //deployer.deploy(ZombieFeeding);
  //deployer.deploy(ZombieHelper);
  //deployer.deploy(ZombieAttack);
  deployer.deploy(ZombieOwnership);
};
