const ethers = require('ethers');
const SeaPort = require('@opensea/seaport-js');

const fulfill = async (data, RPC_URL, Private) => {
  try {
    if (data.address === '' || data.order === {}) return false;
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const signer = new ethers.Wallet(Private, provider);
    const wallet = await signer.getAddress();
    const seaport = new SeaPort.Seaport(signer, { seaportVersion: '1.5' });
    const { executeAllActions: fullFillSeaport } = await seaport.fulfillOrder({
      order: data.order, accountAddress: data.address, recipientAddress: wallet
    });
    try {
      await fullFillSeaport();
      return true;
    } catch(err) {
      console.log(err);
      return false;
    }
  } catch(err) {
    console.log(err);
    return false;
  }
};

module.exports = { fulfill };