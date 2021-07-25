import { ethers } from "ethers";
import ZombieOwnership from "../../build/contracts/ZombieOwnership.json";

export const helper = {
  balanceOf: async (address) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkId = await provider.send("net_version", []);
      const contract = new ethers.Contract(
        ZombieOwnership.networks[networkId].address,
        ZombieOwnership.abi,
        provider
      );
      const result = await contract.balanceOf(address);
      return result.toNumber();
    }
  },
  getOwner: async (zombieId) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkId = await provider.send("net_version", []);
      const contract = new ethers.Contract(
        ZombieOwnership.networks[networkId].address,
        ZombieOwnership.abi,
        provider
      );
      const owner = await contract.ownerOf(zombieId);
      return owner;
    }
  },
  levelUp: async (zombieId) => {
    console.log(zombieId);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkId = await provider.send("net_version", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ZombieOwnership.networks[networkId].address,
        ZombieOwnership.abi,
        signer
      );
      const fee = ethers.utils.parseEther("0.001");

      const transaction = await contract.levelUp(zombieId, {
        value: fee,
      });
      transaction.wait();
    }
  },
  getZombieById: async (zombieId) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkId = await provider.send("net_version", []);
      const contract = new ethers.Contract(
        ZombieOwnership.networks[networkId].address,
        ZombieOwnership.abi,
        provider
      );
      const result = await contract.zombies(zombieId);
      return result;
    }
  },
  generateRandomZombie: async (name) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkId = await provider.send("net_version", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ZombieOwnership.networks[networkId].address,
        ZombieOwnership.abi,
        signer
      );
      const transaction = await contract.createRandomZombie(name);
      await transaction.wait();
    }
  },
  getZombiesByAddress: async (address) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkId = await provider.send("net_version", []);
      const contract = new ethers.Contract(
        ZombieOwnership.networks[networkId].address,
        ZombieOwnership.abi,
        provider
      );
      const results = await contract.getZombiesByOwner(address);
      return results;
    }
  },
  attack: async (zombieId, targetId) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkId = await provider.send("net_version", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ZombieOwnership.networks[networkId].address,
        ZombieOwnership.abi,
        signer
      );
      const transaction = await contract.attack(zombieId, targetId);
      transaction.wait();
    }
  },
  changeName: async (zombieId, newName) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkId = await provider.send("net_version", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ZombieOwnership.networks[networkId].address,
        ZombieOwnership.abi,
        signer
      );
      const transaction = await contract.changeName(zombieId, newName);
      transaction.wait();
    }
  },
  approve: async (to_approve, zombieId) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkId = await provider.send("net_version", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ZombieOwnership.networks[networkId].address,
        ZombieOwnership.abi,
        signer
      );
      const transaction = await contract.approve(to_approve, zombieId);
      transaction.wait();
    }
  },
  transferFrom: async (from, to_transfer, zombieId) => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const networkId = await provider.send("net_version", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ZombieOwnership.networks[networkId].address,
        ZombieOwnership.abi,
        signer
      );
      const transaction = await contract.transferFrom(
        from,
        to_transfer,
        zombieId
      );
      transaction.wait();
    }
  },
};
