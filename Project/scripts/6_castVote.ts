import { Contract, ethers, BigNumber } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

function setupProvider() {
  const infuraOptions = process.env.INFURA_API_KEY
    ? process.env.INFURA_API_SECRET
      ? {
          projectId: process.env.INFURA_API_KEY,
          projectSecret: process.env.INFURA_API_SECRET,
        }
      : process.env.INFURA_API_KEY
    : "";
  const options = {
    alchemy: process.env.ALCHEMY_API_KEY,
    infura: infuraOptions,
  };
  const provider = ethers.providers.getDefaultProvider("ropsten", options);
  return provider;
}

async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
  console.log(`Using address ${wallet.address}`);
  const provider = setupProvider();
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  if (process.argv.length < 3) throw new Error("Ballot address is missing");
  const ballotAddress = process.argv[2];
  if (process.argv.length < 4) throw new Error("Proposal number is missing");
  const proposal = BigNumber.from(process.argv[3]);
  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );
  if (process.argv.length < 5) throw new Error("Token amount is missing");
  const amount = BigNumber.from(process.argv[4]);
  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );

  const ballotContract = new ethers.Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  );

  console.log(
    `Cast a vote to proposal ${proposal.toString()} for Wallet ${
      wallet.address
    }`
  );
  const tx = await ballotContract.vote(proposal, amount);
  console.log("Awaiting for confirmations");
  await tx.wait();
  console.log(`Voting completed. TX Hash is : ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
