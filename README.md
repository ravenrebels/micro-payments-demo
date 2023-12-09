# Ravencoin Micropayment Demo Project

## Overview

This project demonstrates the implementation of micropayments using Ravencoin. It's designed as a simple Express.js web server that showcases a practical use-case for cryptocurrency-based transactions in accessing web content.

## Functionality

Access Control: Initially, users who have not completed a payment are gently encouraged to do so. This ensures a seamless and user-friendly experience.
Secure Area: Upon successful payment, users gain access to a secure section of the website (/secure), where exclusive content is hosted. This area can include a variety of materials such as videos, images, and other rich content, even including dynamically fetched content from external sources.

## How It Works

When a user attempts to access the /secure area without having made a payment, they are presented with a prompt, guiding them to complete the transaction.
Once the payment is verified, the user is granted access to the /secure area, unlocking the exclusive content.

# Usage

## Getting started

You need to have GIT and Node.js/NPM installed.
Install node from here https://nodejs.org/en

Clone this repository

run `npm install` to install dependencies.

run `npm start` to start.

## Where is my money?

For every new session, a new wallet is created in the ./wallets directory.
Each wallet is just a json file with the 12 words, with the WIF being used.
So after paying, you can transfer the funds back to your self.

## Testnet vs Mainnet

You can change network in the ./config.json file

```text
rvn for mainnet
rvn-test for testnet
```

Please note, if you visit the web app, a Ravencoin address is stored in your user session.
If you then change network, restart the server, your session is still alive but it has the an address for the wrong network. In that case, remove cookies.

## License

MIT
