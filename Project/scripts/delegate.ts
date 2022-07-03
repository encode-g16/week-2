import { ethers } from "ethers"; // dont need to ship hardhat ethers, raw ethers is OK
import "dotenv/config";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { args, getRopstenProvider, getWallet } from "../config";

async function main() {
  if (!args.tokenAddress) {
    throw new Error(
      "please provide the token address (--token-address or --ta)"
    );
  }

  // create wallet and connect to provider
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

  // get contract instance connected to Account 1
  const tokenContractAccount1 = new ethers.Contract(
    args.tokenAddress,
    tokenJson.abi,
    signer
  );

  // Account 1 delegates votes to self
  console.log(`Account 1 is delegating votes to itself...`);
  const transactionResponse = await tokenContractAccount1.delegate(
    wallet.address
  );
  const transactionReceipt = await transactionResponse.wait(); // wait for transaction to be mined
  console.log(
    `Delgating complete. Hash: ${transactionReceipt.transactionHash.toString()}`
  );
  const account1DelegatingTo = await tokenContractAccount1.delegates(
    wallet.address
  );
  console.log(
    `${wallet.address} has delegated to ${account1DelegatingTo.toString()}`
  );

  console.log("-----------------------------------------------------");
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
