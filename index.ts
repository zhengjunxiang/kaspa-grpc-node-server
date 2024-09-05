const { Wallet, initKaspaFramework } = require('@kaspa/wallet');
const { RPC } = require('@kaspa/grpc-node');

(async () => {
  await initKaspaFramework();
  const network = "kaspatest";
  // const port = Wallet.networkTypes[network].port; // default port for testnet

  const rpc = new RPC({ clientConfig:{ host : '13.213.9.146:16310' } });

  const wallet = Wallet.fromMnemonic(
      "father term enlist tone impact hard prison whale inhale drive range nasty tenant acid oven city recall canyon again smile gallery social chuckle tobacco",
      { network, rpc },
      {disableAddressDerivation:true}
  );
  try {
    let response = await wallet.submitTransaction({
        address: 'kaspatest:qrr28334xft4s47ttn6dhclwez3veh5vs8ws8et4u2t74y65jrznzly8sj2mp', // destination address
        amount: 100000000,  // amount in base units
        fee: 100000000,     // user fees
    });
    if(!response)
      console.log('general error');  // if kaspad returns null (should never occur)
    else
      console.log('success:', response);
  } catch(ex) {
    console.log('error:',ex);
  }
})();

