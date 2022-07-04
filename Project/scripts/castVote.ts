import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { CustomBallot } from "../typechain";
import { args, getRopstenProvider, getWallet } from "../config";

async function main() {
  if (!args.ballotAddress) {
    throw new Error(
      "please provide the ballot address (--ballot-address or --ba)"
    );
  }
  if (!args.voteProposal) {
    throw new Error(
      "please provide the vote proposal (--vote-proposal or --vp)"
    );
  }
  if (!args.voteAmount) {
    throw new Error("please provide the vote amount (--vote-amount or --va)");
  }

  const wallet = getWallet();
  const provider = getRopstenProvider();
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const walletBalance = Number(ethers.utils.formatEther(balanceBN));
  if (walletBalance < 0.01) {
    throw new Error("Not enough ether");
  }

  const voteAmount = ethers.utils.parseEther(args.voteAmount);
  console.log(
    `Attaching ballot contract interface to address ${args.ballotAddress}`
  );
  const ballotContract: CustomBallot = new Contract(
    args.ballotAddress,
    ballotJson.abi,
    signer
  ) as CustomBallot;

  const votingPowerBefore = await ballotContract.votingPower();
  console.log(`Voting Power of ${wallet.address} is ${votingPowerBefore}`);
  const proposal = await ballotContract.proposals(args.voteProposal);
  console.log(
    `Making vote for proposal No. ${
      args.voteProposal + 1
    }: ${ethers.utils.parseBytes32String(proposal.name)}`
  );

  const tx = await ballotContract.vote(
    args.voteProposal.toString(),
    voteAmount.toString(),
    {
      gasLimit: 10000000,
    }
  );
  console.log("Awaiting confirmations");
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);

  const votingPowerAfter = await ballotContract.votingPower();
  console.log(
    `Remaining voting power of address ${wallet.address} is ${votingPowerAfter}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
