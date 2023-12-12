import { getRPC } from "@ravenrebels/ravencoin-rpc";
import config from "./config.js";

//Support both Ravencoin testnet and mainnet
const URLs = {
  rvn: "https://rvn-rpc-mainnet.ting.finance/rpc",
  "rvn-test": "https://rvn-rpc-testnet.ting.finance/rpc",
};
const URL = URLs[config.network];
const rpc = getRPC("anonymous", "anonymous", URL);

export async function getReceived(address) {
  const params = [
    {
      addresses: [address],
    },
  ];
  //Get balance on chain
  const b = await rpc("getaddressbalance", params);

  //Get mempool balance for instant payments,
  //less secure since mempool transaction has not yet been confirmed
  //Ignore transactions with "Replace-By-Fee" enabled
  const mempool = await rpc("getaddressmempool", params);
  let received = b.received;
  for (const item of mempool) {
    const transaction = await rpc("getrawtransaction", [item.txid, true]);
    if (isRBFEnabled(transaction) === true) {
      console.log("Skipping transaction", item.txid, " it's BRF enabled");
      break;
    }
    if (item.assetName === "RVN" && item.satoshis > 0) {
      received += item.satoshis;
    }
  }
  // Convert received from satoshis to Ravencoin: divide by 100 million since 1 ravencoin = 100 million satoshis
  if (received > 0) {
    return received / 100000000;
  }
  return received;
}
/*
 //a transaction can be flagged as RBF "Replace-By-Fee" if the sequence number of any of its inputs is less than 0xFFFFFFFF (4294967295).
 */
function isRBFEnabled(transaction) {
  if (!transaction || !transaction.vin) {
    return false;
  }

  for (const input of transaction.vin) {
    if (input.sequence < 0xffffffff) {
      return true;
    }
  }
  return false;
}
