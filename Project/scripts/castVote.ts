import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { CustomBallot } from "../typechain";
import { args, getRopstenProvider, getWallet } from "../config";

async function main() {
  if (!args.tokenAddress) {
    throw new Error(
      "please provide the token address (--token-address or --ta)"
    );
  }
  if (!args.ballotAddress) {
    throw new Error(
      "please provide the ballot address (--ballot-address or --ba)"
    );
  }

  const wallet = getWallet();
  const provider = getRopstenProvider();
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const walletBalance = Number(ethers.utils.formatEther(balanceBN));

  // console.log(`using token address: ${args.tokenAddress}`);
  const tokenContract = new ethers.Contract(
    args.tokenAddress,
    tokenJson.abi,
    signer
  );
  const tokenBalance = Number(
    ethers.utils.formatEther(await tokenContract.balanceOf(wallet.address))
  );
  console.log(
    `Wallet balance ${walletBalance} ether. Token balance ${tokenBalance}`
  );
  if (walletBalance < 0.01) {
    throw new Error("Not enough ether");
  }
  if (process.argv.length < 3) throw new Error("Proposal missing");
  const votedProposal = process.argv[2];
  if (process.argv.length < 4) throw new Error("Vote amount missing");
  const voteAmount = ethers.utils.parseEther(process.argv[3]);
  console.log(
    `Attaching ballot contract interface to address ${args.ballotAddress}`
  );
  const ballotContract: CustomBallot = new Contract(
    args.ballotAddress,
    ballotJson.abi,
    signer
  ) as CustomBallot;

  // delegate to self
  await tokenContract.delegate(wallet.address);
  const votingPower = await ballotContract.votingPower();
  console.log(`Voting Power of ${wallet.address} is ${votingPower}`);
  // cast vote
  console.log(`Cast a vote to Cake`);
  const tx = await ballotContract.vote(votedProposal, voteAmount);
  console.log("Awaiting confirmations");
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);
  const voteCount = await ballotContract.proposals(votedProposal);
  console.log(voteCount);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
