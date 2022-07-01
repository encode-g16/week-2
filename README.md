# Lesson 8 - Tokenized Votes

## The ERC20Votes ERC20 extension

- ERC20Votes properties
- Snapshots
- Creating snapshots when supply changes
- Using snapshots
- Self delegation
- Contract overall operation

### References

https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Votes

https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Snapshot

<pre><code>// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract MyToken is ERC20, ERC20Permit, ERC20Votes {
    constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}</code></pre>

## ERC20Votes and Ballot.sol

- (Review) TDD
- Mapping scenarios
- Contracts structure

# Homework

- Create Github Issues with your questions about this lesson
- Read the references
- (Optional) Study how ERC20Permit works https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Permit
- (Optional) Study and try out a full governance example from https://docs.openzeppelin.com/contracts/4.x/governance

# Weekend project

- Form groups of 3 to 5 students
- Complete the contracts together
- Structure scripts to
  - Deploy everything
  - Interact with the ballot factory
  - Query proposals for each ballot
  - Operate scripts
- Publish the project in Github
- Run the scripts with a few set of proposals, play around with token balances, cast and delegate votes, create ballots from snapshots, interact with the ballots and inspect results
- Write a report detailing the addresses, transaction hashes, description of the operation script being executed and console output from script execution for each step
- (Extra) Use TDD methodology

Address:

Ella
0x8648c078bA7ea89BfF9D0e3863fA6497F973B4da
0x7453e7606aF987FE46fE7be51fF2Bc1c6D4bc0e1

Francis
0x4764e0eB62E55a2E8CB1D593588D2FC52CC0e89b
0x3d6C691e4d0122DD96C941748a60478641756a4d

Bruno
0x4b626dd79Cb12d1F5Ea2eA887b5107d538d1b9D3
0x68e81fFD2fc215994f7d6dd11199fD01f75470f9

Ben
0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9
0x2F34973B63c65091e3e2203D8CAD3d158f6feE38
