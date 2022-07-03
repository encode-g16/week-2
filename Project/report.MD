```sh

$ yarn ts-node --files scripts/deployToken.ts

Wallet balance 9.985669758931671
Deploying Token contract
Awaiting confirmations
Completed
Contract deployed at 0x9498c2a998594EC8AaD1857D51704d13484ff5f1
Transaction hash 0xe1565e54f0c7fb6a83f578294ca20e3ee8672d1bf78999a7a13897434574d67d
-------------------------------------------



$ yarn ts-node --files scripts/mint.ts --ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1 \
    --mt 0x563529285A26A05a94646CA01F5f9b61f292941D \
    --mt 0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9

Wallet balance 9.979342187402143
Minted 1000000000000000000000 tokens to 0x563529285A26A05a94646CA01F5f9b61f292941D, Hash: 0xc3741d253953bd2f5c597b48a00104d6489211677e0ed82e2340487baa4115fa
Minted 1000000000000000000000 tokens to 0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9, Hash: 0x95b15adcdc5b31aace78e21df59c7fd41d70dba4dcee44526d45ab3471939cd7
-------------------------------------------



$ yarn ts-node scripts/delegate.ts --ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1

Wallet balance 9.979094891400988
Account 1 is delegating votes to itself...
Delgating complete. Hash: 0x2253b6990b17e099bec499ab0ad2455d159c00b45e094f7dedc5713c604a2593
0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9 has delegated to 0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9
-----------------------------------------------------



$ yarn ts-node --files scripts/deployBallot.ts --ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1
    -p cheese \
    -p ham \
    -p onions \
    -p beans \
    -p tea

Using address 0x9E7d38692a6b1879327bAC46b848184659879B5C
Wallet balance 9.979021554900648
Deploying Ballot contract
Proposals:
Proposal N. 1: cheese
Proposal N. 2: ham
Proposal N. 3: onions
Proposal N. 4: beans
Proposal N. 5: tea
Deploying Ballot contract with  tokenAddress=0x9498c2a998594EC8AaD1857D51704d13484ff5f1
Awaiting confirmations
Completed
Contract deployed at 0xCa051d37e3F41f24c8615703AfeC078DA6c754F4
-----------------------------------------------------


$ yarn ts-node scripts/castVote.ts --ba 0xCa051d37e3F41f24c8615703AfeC078DA6c754F4 --vp 3 --va 69

Attaching ballot contract interface to address 0xCa051d37e3F41f24c8615703AfeC078DA6c754F4
Voting Power of 0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9 is 1000000000000000000000
Making vote for proposal No. 3: beans
Awaiting confirmations
Transaction completed. Hash: 0x87a8fcb7fe67164290dcc251b14adc7ef864dd6209641a6e48344a755531a798
Remaining voting power of address 0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9 is 931000000000000000000
-----------------------------------------------------

```
