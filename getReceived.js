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
  const mempool = await rpc("getaddressmempool", params);

  let received = b.received;
  for (const item of mempool) {
    if (item.assetName === "RVN" && item.satoshis > 0) {
      received += item.satoshis;
    }
  }

  if (received > 0) {
    return received / 100000000;
  }
  return received;
}
