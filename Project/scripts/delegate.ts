import { ethers } from "ethers"; // dont need to ship hardhat ethers, raw ethers is OK
import "dotenv/config";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

// Address of deployed Token.sol on Rinkeby
const tokenAddress = "0x27F47342B874df32e9E6BBcb09BB2D12cb385b65";

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

  // connect to account 2
  const wallet2 = new ethers.Wallet(process.env.PRIVATE_KEY2 ?? EXPOSED_KEY);
  const signer2 = wallet2.connect(provider);

  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  // get contract instance connected to Account 1
  const tokenContractAccount1 = new ethers.Contract(
    tokenAddress,
    tokenJson.abi,
    signer
  );

  // get contract instance connected to Account 2
  const tokenContractAccount2 = new ethers.Contract(
    tokenAddress,
    tokenJson.abi,
    signer2
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

  // Account 2 delegates votes to self
  console.log(`Account 2 is delegating votes to itself...`);
  const txResponse = await tokenContractAccount2.delegate(wallet2.address);
  const txReceipt = await txResponse.wait(); // wait for transaction to be mined
  console.log(
    `Delgating complete. Hash: ${txReceipt.transactionHash.toString()}`
  );
  const account2DelegatingTo = await tokenContractAccount2.delegates(
    wallet2.address
  );
  console.log(
    `${wallet2.address} has delegated to ${account2DelegatingTo.toString()}`
  );
  console.log("-----------------------------------------------------");
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
