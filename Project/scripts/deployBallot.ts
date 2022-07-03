import { ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { args, getRopstenProvider, getWallet } from "../config";

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

/**
 * Example command:
 * yarn ts-node --files scripts/deployBallot.ts --ta 0x4337785FcD690BaA3C6C151B1b80747423683aBD -p cheese -p ham -p onions
 */
async function main() {
  const wallet = getWallet();
  console.log(`Using address ${wallet.address}`);
  const provider = getRopstenProvider();
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  console.log("Deploying Ballot contract");

  console.log("Proposals: ");
  const proposals = args.proposal;
  if (!proposals || proposals.length < 2)
    throw new Error("Not enough proposals provided");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

  const ballotFactory = new ethers.ContractFactory(
    ballotJson.abi,
    ballotJson.bytecode,
    signer
  );
  console.log(
    `Deploying Ballot contract with  tokenAddress=${args.tokenAddress}`
  );
  const ballotContract = await ballotFactory.deploy(
    convertStringArrayToBytes32(proposals),
    args.tokenAddress
  );
  console.log("Awaiting confirmations");
  await ballotContract.deployed();
  console.log("Completed");
  console.log(`Contract deployed at ${ballotContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
