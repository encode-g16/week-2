import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../typechain";
import { args, getRopstenProvider, getWallet } from "../config";

async function main() {
  if (!args.ballotAddress) {
    throw new Error(
      "please provide the ballot address (--ballot-address or --ba)"
    );
  }

  const wallet = getWallet();
  const provider = getRopstenProvider();
  const signer = wallet.connect(provider);
  console.log(
    `Attaching ballot contract interface to address ${args.ballotAddress}`
  );
  const ballotContract = new Contract(
    args.ballotAddress,
    ballotJson.abi,
    signer
  ) as CustomBallot;

  try {
    let proposal;
    let proposalName: string;
    let voteCount: string;
    let i = 0;
    while (true) {
      proposal = await ballotContract.proposals(i);
      proposalName = ethers.utils.parseBytes32String(proposal.name);
      voteCount = proposal.voteCount.toString();
      console.log(
        `Proposal ${i + 1}: ${proposalName}, vote count: ${voteCount}`
      );
      i++;
    }
  } catch (error) {}

  const winnerName = await ballotContract.winnerName();
  console.log(
    `Winning proposal is: ${ethers.utils.parseBytes32String(winnerName)}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
