# TrueBlocks Explorer

<hr>

<font color="red"><b>IMPORTANT NOTE</b>: THIS REPO IS NO LONGER MAINTAINED. THE FUNCTIONALITY FORMERLY PROVIDED BY THIS REPO HAS BEEN MOVED TO [TRUEBLOCKS BROWSE](https://github.com/TrueBlocks/trueblocks-browse). PLEASE USE THAT REPO INSTEAD.</font>

<hr>

![GitHub repo size](https://img.shields.io/github/repo-size/TrueBlocks/trueblocks-explorer)
![GitHub contributors](https://img.shields.io/github/contributors/TrueBlocks/trueblocks-explorer)
![GitHub stars](https://img.shields.io/github/stars/TrueBlocks/trueblocks-explorer?style%3Dsocial)
![GitHub forks](https://img.shields.io/github/forks/TrueBlocks/trueblocks-explorer?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/trueblocks?style=social)

[![Website](https://img.shields.io/badge/Website-quickblocks.io-brightgreen.svg)](https://quickblocks.io/)
[![TrueBlocks](https://img.shields.io/badge/Trueblocks-explorer-blue.svg)](https://github.com/TrueBlocks/trueblocks-explorer)
[![React](https://img.shields.io/badge/React-node.js-purple.svg)](https://reactjs.org/)

TrueBlocks lets you explore the Ethereum blockchain in a fully-local and therefore fully-private way. This repo provides an example of a frontend application for the TrueBlocks backend: [TrueBlocks core](https://github.com/TrueBlocks/trueblocks-core).

## Prerequisites

Prior to proceeding, you must [install the TrueBlocks Core](http://github.com/TrueBlocks/trueblocks-core) on your local machine.

## Installing

Assuming you have the TrueBlocks core properly installed and can successfully run the following command:

```shell
chifra --version
```

Next, you need to either build or download the Unchained Index. See this document: https://trueblocks.io/docs/install/get-the-index/

Once you have the index, you can run the TrueBlocks local API server with:

```shell
chifra serve
```

### Installing the TrueBlocks Account Explorer

In order to use the TrueBlocks Explorer (which is pre-alpha software at this point), do this from the top of your development folder:

```shell
git clone git@github.com:TrueBlocks/trueblocks-explorer.git
cd trueblocks-explorer
cp .env.example .env
yarn install
yarn start
```

The Explorer application should automatically open your browser to `localhost:1234`.

## NPM Scripts

- `compile | compile:ui | compile:electron` compile TypeScript into JavaScript, usually before packing new Electron bundle
- `develop | develop:ui | develop:electron` run development server for UI and opens the app in Electron.
- `test | test:e2e` run unit or E2E tests

## Requirements

- **Note:** In order for the TrueBlocks to work, you must have access to an Ethereum RPC endpoint that provides both an archive node and trace data. An excellent choice for this is [Erigon](https://github.com/ledgerwatch/erigon). TrueBlocks defaults to an RPC endpoint at http://localhost:8545, but you may use any endpoint (Infura, Quiknodes, for example). Performance will be _greatly reduced_ if you use a remote server. A good solution to this problem is [dAppNode](https://dappnode.io/) or [Ava.do](https://ava.do/) platforms which allow you to install and run both Erigon and (soon) [the TrueBlocks docker version](http://github.com/TrueBlocks/trueblocks-docker).

## Getting Data from the API

The TrueBlocks Explorer uses the API provided by `chifra serve` to access data from the blockchain. Assuming everything is installed correctly and you've started the API server in a separate window, you should be able to access the API from a command line.

```shell
curl "http://localhost:8080/blocks?blocks=4001001&uniq"
```

will show every appearance of an address in block 4,001,001. This is the same data you'll get from the command line with `chifra blocks --uniq`. In general, the command line and the API endpoints provide the exact same options.

### Change data formats.

By default, everything the API returns is JSON.

However, you can change this by adding the options `&fmt=txt` or `&fmt=csv` to your request. This is sometimes useful in a data science environment (such as 'R') where you want differently formatted data. All `chifra` commands support the `fmt` options.

### More information

For information on all aspects of the TrueBlocks project, please see the website: https://trueblocks.io

## Contributing

We love contributors. Please see information about our [work flow](https://github.com/TrueBlocks/trueblocks-core/blob/develop/docs/BRANCHING.md) before proceeding.

1. Fork this repository into your own repo.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make changes to your local branch and commit them to your forked repo: `git commit -m '<commit_message>'`
4. Push back to the original branch: `git push origin TrueBlocks/trueblocks-core`
5. Create the pull request.

## Contact

If you have questions, comments, or complaints, please join the discussion on our discord server which is [linked from our website](https://trueblocks.io).

## List of Contributors

Thanks to the following people who have contributed to this project:

- **Thomas Jay Rush** - [tjayrush](https://github.com/tjayrush)
- **Ed Mazurek** - [wildmolasses](https://github.com/wildmolasses)
- **Dawid Szlachta** - [dszlachta](https://github.com/dszlachta)
