import RavencoinKey from "@ravenrebels/ravencoin-key";
import fs from "fs";
import config from "./config.js";

export function setupRavencoinAddress(request) {
  //This gives us a random address with properties like mnemonic/WIF
  const generatedAddress = RavencoinKey.generateAddressObject(config.network);
  // Storing the address and mnemonic in the session for later use
  request.session.address = generatedAddress.address;
  request.session.mnemonic = generatedAddress.mnemonic;

  // Checking if the 'wallets' directory exists, if not, creating it
  if (fs.existsSync("wallets") === false) {
    fs.mkdirSync("wallets");
  }

  const fileName = "wallets/" + generatedAddress.address + ".json";
  const json = JSON.stringify(generatedAddress);
  fs.writeFileSync(fileName, json);
}
