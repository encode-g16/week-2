import { ethers } from "ethers"; // dont need to ship hardhat ethers, raw ethers is OK
import "dotenv/config";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

// Address of deployed Token.sol on Rinkeby
const tokenAddress = "0x4337785FcD690BaA3C6C151B1b80747423683aBD";

async function main() {
  // create wallet and connect to provider
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

  // delegate votes to self
  const transactionResponse = await tokenContract.delegate(wallet.address);
  transactionResponse.wait(); // wait for transaction to be mined
  const delegatingTo = await tokenContract.delegates(wallet.address);
  console.log(`${wallet.address} delegated to ${delegatingTo}`);

  // do a transfer to update the snapshot
  const account2 = "0x2F34973B63c65091e3e2203D8CAD3d158f6feE38";
  const tx = await tokenContract.transfer(
    account2,
    ethers.utils.parseEther("0.01")
  );
  tx.wait();

  // get and print updates number of votes
  const numVotes = await tokenContract.getVotes(wallet.address);
  console.log(`${wallet.address} has ${numVotes} votes`);
  console.log("-----------------------------------------------------");
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
