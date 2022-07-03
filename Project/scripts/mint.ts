import { ethers } from "ethers"; // dont need to ship hardhat ethers, raw ethers is OK
import "dotenv/config";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { args, getRopstenProvider, getWallet } from "../config";

async function main() {
  // create wallet and connect to provider
  // ensure it resolves to the private key that deployed Token.sol as it has MINTER_ROLE
  const wallet = getWallet();
  // const provider = ethers.providers.getDefaultProvider("ropsten");
  const provider = getRopstenProvider();
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  if (!args.tokenAddress) {
    throw new Error(
      "please provide the token address (--token-address or --ta)"
    );
  }

  if (!args.mintTo) {
    throw new Error("please provide the mint to address (--mint-to or --mt)");
  }

  // get contract instance at the right address
  const tokenContract = new ethers.Contract(
    args.tokenAddress,
    tokenJson.abi,
    signer
  );

  // mint some tokens to the addresses
  const amount = ethers.utils.parseEther("1000"); // 1,000 tokens each

  for (let i = 0; i < args.mintTo.length; i++) {
    const tx = await tokenContract.mint(args.mintTo[i], amount, {
      gasLimit: 1000000,
    }); // runs out of gas with default, 100k gas per mint on average (source: hard hat gas reporter)
    const receipt = await tx.wait(1); // wait 1 confirmation for transaction to be mined
    console.log(
      `Minted ${amount} tokens to ${args.mintTo[i]}, Hash: ${receipt.transactionHash}`
    );
  }

  console.log("-------------------------------------------");
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
