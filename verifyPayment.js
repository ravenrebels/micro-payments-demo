import { setupRavencoinAddress } from "./setupRavencoinAddress.js";
import { getReceived } from "./getReceived.js";

//Middeware, setup Ravencoin address and check balance
export async function verifyPayment(request, response, next) {
  //Create address if needed
  if (!request.session.address) {
    setupRavencoinAddress(request);
  }
  if (request.session.accessGranted === true) {
    return next();
  }

  //Check balance on chain and in mempool
  let received = await getReceived(request.session.address);
  let amount = 10;
  request.session.accessGranted = received >= amount;

  return next();
}
