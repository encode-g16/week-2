```sh
➜  Project git:(francisldn-castVote) ✗ yarn ts-node --files scripts/deployToken.ts
yarn run v1.22.19
$ /Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/.bin/ts-node --files scripts/deployToken.ts
Using address 0x9E7d38692a6b1879327bAC46b848184659879B5C
Wallet balance 9.99795864398902
Deploying Token contract
Awaiting confirmations
Completed
Contract deployed at 0x9e8912770e652480dc6bA6c057d9105c719afC07
✨  Done in 25.12s.
➜  Project git:(francisldn-castVote) ✗ yarn ts-node --files scripts/deployToken.ts
yarn run v1.22.19
$ /Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/.bin/ts-node --files scripts/deployToken.ts
Using address 0x9E7d38692a6b1879327bAC46b848184659879B5C
Wallet balance 9.991814201460345
Deploying Token contract
Awaiting confirmations
Completed
Contract deployed at 0x64bF1f1B3A63539AD2D28d5FB9E602433e9E316f
✨  Done in 17.71s.
➜  Project git:(francisldn-castVote) ✗ yarn ts-node --files scripts/deployToken.ts
yarn run v1.22.19
$ /Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/.bin/ts-node --files scripts/deployToken.ts
Using address 0x9E7d38692a6b1879327bAC46b848184659879B5C
Wallet balance 9.985669758931671
Deploying Token contract
Awaiting confirmations
Completed
Contract deployed at 0x9498c2a998594EC8AaD1857D51704d13484ff5f1
Transaction hash 0xe1565e54f0c7fb6a83f578294ca20e3ee8672d1bf78999a7a13897434574d67d
✨  Done in 24.82s.
➜  Project git:(francisldn-castVote) ✗ code ../README.md
➜  Project git:(francisldn-castVote) ✗ yarn ts-node --files scripts/mint.ts
yarn run v1.22.19
$ /Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/.bin/ts-node --files scripts/mint.ts
Wallet balance 9.979525316402997
Error: please provide the token address (--token-address or --ta)
    at main (/Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/scripts/mint.ts:21:11)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
➜  Project git:(francisldn-castVote) ✗ yarn ts-node --files scripts/mint.ts -ta 0x563529285A26A05a94646CA01F5f9b61f292941D
yarn run v1.22.19
$ /Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/.bin/ts-node --files scripts/mint.ts -ta 0x563529285A26A05a94646CA01F5f9b61f292941D
Wallet balance 9.979525316402997
Error: please provide the token address (--token-address or --ta)
    at main (/Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/scripts/mint.ts:21:11)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
➜  Project git:(francisldn-castVote) ✗ yarn ts-node --files scripts/mint.ts --ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1 --mt 0x563529285A26A05a94646CA01F5f9b61f292941D
yarn run v1.22.19
$ /Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/.bin/ts-node --files scripts/mint.ts --ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1 --mt 0x563529285A26A05a94646CA01F5f9b61f292941D
Wallet balance 9.979525316402997
Error: invalid address or ENS name (argument="name", value=["0x563529285A26A05a94646CA01F5f9b61f292941D"], code=INVALID_ARGUMENT, version=contracts/5.6.0)
    at Logger.makeError (/Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/@ethersproject/logger/src.ts/index.ts:261:28)
    at Logger.throwError (/Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/@ethersproject/logger/src.ts/index.ts:273:20)
    at Logger.throwArgumentError (/Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/@ethersproject/logger/src.ts/index.ts:277:21)
    at /Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/@ethersproject/contracts/src.ts/index.ts:123:16
    at step (/Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/@ethersproject/contracts/lib/index.js:48:23)
    at Object.next (/Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/@ethersproject/contracts/lib/index.js:29:53)
    at fulfilled (/Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/@ethersproject/contracts/lib/index.js:20:58)
    at processTicksAndRejections (node:internal/process/task_queues:96:5) {
  reason: 'invalid address or ENS name',
  code: 'INVALID_ARGUMENT',
  argument: 'name',
  value: [ '0x563529285A26A05a94646CA01F5f9b61f292941D' ]
}
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
➜  Project git:(francisldn-castVote) ✗ yarn ts-node --files scripts/mint.ts --ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1 --mt 0x563529285A26A05a94646CA01F5f9b61f292941D -mt 0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9
yarn run v1.22.19
$ /Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/.bin/ts-node --files scripts/mint.ts --ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1 --mt 0x563529285A26A05a94646CA01F5f9b61f292941D -mt 0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9
Wallet balance 9.979525316402997
Minted 1000000000000000000000 tokens to 0x563529285A26A05a94646CA01F5f9b61f292941D, Hash: 0xfbdf38b79e46a0dc20e0032c111422672e11396d045eafc33cb73bbc9999ba61
-------------------------------------------
✨  Done in 24.00s.
➜  Project git:(francisldn-castVote) ✗ yarn ts-node --files scripts/mint.ts --ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1 --mt 0x563529285A26A05a94646CA01F5f9b61f292941D -mt 0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9
yarn run v1.22.19
$ /Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/.bin/ts-node --files scripts/mint.ts --ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1 --mt 0x563529285A26A05a94646CA01F5f9b61f292941D -mt 0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9
Wallet balance 9.979342187402143
MIN TO: [ '0x563529285A26A05a94646CA01F5f9b61f292941D' ]
^C
➜  Project git:(francisldn-castVote) ✗ yarn ts-node --files scripts/mint.ts --ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1 --mt 0x563529285A26A05a94646CA01F5f9b61f292941D --mt 0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9
yarn run v1.22.19
$ /Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/.bin/ts-node --files scripts/mint.ts --ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1 --mt 0x563529285A26A05a94646CA01F5f9b61f292941D --mt 0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9
Wallet balance 9.979342187402143
MIN TO: [
  '0x563529285A26A05a94646CA01F5f9b61f292941D',
  '0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9'
]
Minted 1000000000000000000000 tokens to 0x563529285A26A05a94646CA01F5f9b61f292941D, Hash: 0xc3741d253953bd2f5c597b48a00104d6489211677e0ed82e2340487baa4115fa
Minted 1000000000000000000000 tokens to 0x870ac8121ba4a31dE8E5D91675edf3f937B8D7e9, Hash: 0x95b15adcdc5b31aace78e21df59c7fd41d70dba4dcee44526d45ab3471939cd7
-------------------------------------------
✨  Done in 30.69s.
➜  Project git:(francisldn-castVote) ✗ git add .
➜  Project git:(francisldn-castVote) ✗ git commit -m "update scripts with config"
[francisldn-castVote 64c859e] update scripts with config
 6 files changed, 64 insertions(+), 108 deletions(-)
 create mode 100644 Project/.env.example
➜  Project git:(francisldn-castVote) git push
To github-kinluek:encode-g16/week-2.git
 ! [rejected]        francisldn-castVote -> francisldn-castVote (non-fast-forward)
error: failed to push some refs to 'github-kinluek:encode-g16/week-2.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
➜  Project git:(francisldn-castVote) git push -f
Enumerating objects: 23, done.
Counting objects: 100% (23/23), done.
Delta compression using up to 6 threads
Compressing objects: 100% (16/16), done.
Writing objects: 100% (16/16), 3.10 KiB | 1.55 MiB/s, done.
Total 16 (delta 8), reused 2 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (8/8), completed with 6 local objects.
To github-kinluek:encode-g16/week-2.git
 + 66db130...64c859e francisldn-castVote -> francisldn-castVote (forced update)
➜  Project git:(francisldn-castVote) yarn ts-node scripts/delegate.ts -ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1
yarn run v1.22.19
$ /Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/.bin/ts-node scripts/delegate.ts -ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1
Error: please provide the token address (--token-address or --ta)
    at main (/Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/scripts/delegate.ts:8:11)
    at Object.<anonymous> (/Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/scripts/delegate.ts:52:1)
    at Module._compile (node:internal/modules/cjs/loader:1103:14)
    at Module.m._compile (/Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/ts-node/src/index.ts:1455:23)
    at Module._extensions..js (node:internal/modules/cjs/loader:1157:10)
    at Object.require.extensions.<computed> [as .ts] (/Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/ts-node/src/index.ts:1458:12)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
    at phase4 (/Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/ts-node/src/bin.ts:567:12)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
➜  Project git:(francisldn-castVote) yarn ts-node scripts/delegate.ts --ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1
yarn run v1.22.19
$ /Users/schan2/dev/blockchain/solidity-bootcamp/projects/week-2/Project/node_modules/.bin/ts-node scripts/delegate.ts --ta 0x9498c2a998594EC8AaD1857D51704d13484ff5f1
Wallet balance 9.979094891400988
Account 1 is delegating votes to itself...
Delgating complete. Hash: 0x461d360a0fa1422d10c9a25909791a997ba155ff11cf16afb80ca45ceb8d0db4
0x9E7d38692a6b1879327bAC46b848184659879B5C has delegated to 0x9E7d38692a6b1879327bAC46b848184659879B5C
-----------------------------------------------------
✨  Done in 16.35s.
```
