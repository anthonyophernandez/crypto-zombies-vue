# crypto-zombies-vue

## Description

The goal of this project was to **learn how to connect to and interact with contracts** using a frontend framework like [`Vue`](https://v3.vuejs.org/ "Vue.js") and an ethereum web client library like [`ethers`](https://docs.ethers.io/v5/ "ethers.js").
These smart contracts are from [CryptoZombies](https://cryptozombies.io/en/course "Crypto Zombies") but in `Solidity ^0.8.6`. And there are some minor differences: the `KittiyInterface` is not implemented, so the `feedOnKitty` method is different, and `coolDownTime` is `1 minutes` instead of `1 days`.

## Project Folder Organization

Folders and files created by [`Truffle`](https://www.trufflesuite.com/truffle "Truffle"):

- build/contracts
- contracts
- migrations
- truffle-config.js

The rest of the folders and files are for the frontend:

- src/router/index.js - `Vue Router 4`
- src/store/index.js - `Vuex 4`
- modules/helper.js - `ethers`
- etc

## Consider the following

There are bugs, this is not a fully developed project.
Some parts of the application may not work properly when there's no account connected to the application through [`MetaMask`](https://metamask.io/ "MetaMask"). Also, **exceptions that occur when transactions fail haven't been addressed**. And routes aren't protected with navigation guards that prevent access to nonexistent routes or assets (zombies or addresses).
In addition, this project is configured to work with [`Ganache`](https://www.trufflesuite.com/ganache "Ganache"), see `truffle-config.js`.

## Ideas Implemented from the CryptoZombies Checkilist

- New users are redirected to an individual page where they can **generate their first random zombie** with a name of their choice
- An individual **zombie army page**, where the entire army of the account connected through `MetaMask` is displayed
- An individual **zombie page**, where you can...
  - ... **view specific zombie details and traits**
  - ... **change its name** (only if you're the onwer and it's at least level 2)
  - ... **approve another account to transfer it for you** (only if you're the owner)
  - ... **transfer it directly to another account** (only if you're the owner or you're an approved account)
  - ... **level up**
  - ... **attack it with a random zombie** of yours (1 minute of cool down)
- `ownerOf` and `balanceOf` are used internally

## How to Prepare the Web Application

1. Make sure to **set up** `Ganache` **(Chain ID: 1337) in MetaMask, and that** `Ganache` **is running a local Ethereum blockchain** where you'll deploy smart contracts.
2. **Import at least 2** `Ganache` **accounts** to `MetaMask` (import private keys)
3. Next, you need to **deploy the smart contracts** on the local Ethereum blockchain by executing the following command `truffle migrate`
4. Before running the application, make sure you have **all dependencies installed** by executing `npm install`.
   - [`Vite`, `Vue 3`](https://vitejs.dev/ "Vite.js"), [`Vuex 4`](https://next.vuex.vuejs.org/ "Vuex 4"), [`Vue Router 4`](https://next.router.vuejs.org/ "Vue Router 4")
   - [`TailwindCSS`, `PostCSS`, `Autoprefixer`](https://tailwindcss.com/docs/guides/vue-3-vite "Install Tailwind CSS with Vue 3 and Vite")
   - [`ethers`](https://docs.ethers.io/v5/ "ethers.js")
5. Then, **start the web application** by executing the following command `npm run dev`

## How to Test the Web Application

1. On the Home page, **click the 'Connect' button and select an account from** `MetaMask`. Then, you'll be redirected to the Generate Random Zombie page
2. **Choose a name and click the 'Generate' button**. Then, you'll be redirected to the Zombie Army page, where you can see your first zombie
3. If you **click the Zombie Card**, you'll be redirected to its individual page, where you can do the following:
   - **Level up the zombie**
   - **Attack the zombie with a random zombie** of yours (it could be the same if it's one of your zombies, and it has 1 minute of cool down)
   - **Change the zombie's name**, only if you're the onwer and the zombie is at least level 2. (You must refresh the page to see the changes)
   - **Approve another account to transfer the zombie for you**, only if you're the owner
   - **Transfer the zombie to another account**, only if you're the owner or you're approved. (You must refresh the page to see the changes)

If you want to test the `approve` method, you have to **log in with the zombie owner's account** and then **approve a second account**. Next, disconnect the zombie owner's account and **log in with the approved account**. Finally, **transfer the zombie from the zombie owner's account to this approved account**. (You must refresh the page to see the changes)
