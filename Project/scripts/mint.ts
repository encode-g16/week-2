import { ethers } from "ethers"; // dont need to ship hardhat ethers, raw ethers is OK
import "dotenv/config";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

// Address of deployed Token.sol on Rinkeby
const tokenAddress = "0x4337785FcD690BaA3C6C151B1b80747423683aBD";

// Addresses to send tokens to
const addresses = [
  "0x8648c078bA7ea89BfF9D0e3863fA6497F973B4da",
  "0x7453e7606aF987FE46fE7be51fF2Bc1c6D4bc0e1",
  "0x4764e0eB62E55a2E8CB1D593588D2FC52CC0e89b",
  "0x3d6C691e4d0122DD96C941748a60478641756a4d",
  "0x4b626dd79Cb12d1F5Ea2eA887b5107d538d1b9D3",
  "0x68e81fFD2fc215994f7d6dd11199fD01f75470f9",
  "0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9",
  "0x2F34973B63c65091e3e2203D8CAD3d158f6feE38",
];

async function main() {
  // create wallet and connect to provider
  // ensure it resolves to the private key that deployed Token.sol as it has MINTER_ROLE
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
  console.log(`Using address ${wallet.address}`);
  // const provider = ethers.providers.getDefaultProvider("ropsten");
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.ROPSTEN_URL
  );
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  // get contract instance at the right address
  const tokenContract = new ethers.Contract(
    tokenAddress,
    tokenJson.abi,
    signer
  );

  // mint some tokens to the addresses
  const amount = ethers.utils.parseEther("1000"); // 1,000 tokens each
  for (let i = 0; i < addresses.length; i++) {
    const tx = await tokenContract.mint(addresses[i], amount, {
      gasLimit: 1000000,
    }); // runs out of gas with default, 100k gas per mint on average (source: hard hat gas reporter)
    const receipt = await tx.wait(1); // wait 1 confirmation for transaction to be mined
    console.log(
      `Minted ${amount} tokens to ${addresses[i]}, Hash: ${receipt.transactionHash}`
    );
  }
  console.log("Minted all tokens to all addresses");
  console.log("-------------------------------------------");
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});

// Addresses to mint tokens to
// 0x8648c078bA7ea89BfF9D0e3863fA6497F973B4da
// 0x7453e7606aF987FE46fE7be51fF2Bc1c6D4bc0e1
// 0x4764e0eB62E55a2E8CB1D593588D2FC52CC0e89b
// 0x3d6C691e4d0122DD96C941748a60478641756a4d
// 0x4b626dd79Cb12d1F5Ea2eA887b5107d538d1b9D3
// 0x68e81fFD2fc215994f7d6dd11199fD01f75470f9
// 0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9
// 0x2F34973B63c65091e3e2203D8CAD3d158f6feE38
