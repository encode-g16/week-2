import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../typechain";
import ballot from "../registry.json";

// retrieve ballotContract address from registry
const ballotAddress = ballot.ballotAddress;
// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(PRIVATE_KEY as string);
  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("ropsten");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );
  const ballotContract = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ) as CustomBallot;
  // const chairpersonAddress = await ballotContract.chairperson();

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
  } catch (error) {
    console.log(`End of proposals array.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
