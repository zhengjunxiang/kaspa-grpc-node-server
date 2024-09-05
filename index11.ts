const { Wallet, initKaspaFramework } = require('@kaspa/wallet');
import * as kaspacore from '@kaspa/core-lib';
const { RPC } = require('@kaspa/grpc-node');

(async () => {
  await initKaspaFramework();
  const network = "kaspatest";
  // const port = Wallet.networkTypes[network].port; // default port for testnet
  // console.log('Wallet.networkTypes', Wallet.networkTypes)
  const rpc = new RPC({ clientConfig:{ host : '13.213.9.146:16110' } });
  // const rpc = new RPC({ clientConfig:{ host : '13.213.9.146:16310' } });

  const wallet = Wallet.fromMnemonic(
    // "father term enlist tone impact hard prison whale inhale drive range nasty tenant acid oven city recall canyon again smile gallery social chuckle tobacco",
    "attitude mystery jazz nuclear crane clay catalog boat wage ensure render usage",
    { network, rpc },
    {disableAddressDerivation:true}
  );


  rpc.onConnect(async () => {
    const fromAddr = 'kaspa:qzchz5n73n3u5lcxpxrj5t95plmrjruurm9le3detjqty5gmnygjxhk3t3zfn'
    const privKeys = '7dad88d8e2d541ce1e1b18ad13be20cbe1d82dc235d88c88c5d61e235d9cf083'
    const toAddr = 'kaspa:qrtzs7t38xsy4a3jdcqywgrsey3xth5hn0gtyqpem0k7fvffgyymjyldq33zl'
    const amount = 10000000;  // amount in base units
    const fee = 10000000;     // user fees
    // wallet.findUtxos(['kaspa:qzchz5n73n3u5lcxpxrj5t95plmrjruurm9le3detjqty5gmnygjxhk3t3zfn'])
    // .then((res: any) => {
    //   console.log('res', res)
    // }).catch((err: any) => {
    //   console.error('err', err)
    // })

    rpc.getUtxosByAddresses(
      [fromAddr]
    ).then((res: any) => {
      console.log('res', res.entries)
      const tx: kaspacore.Transaction = new kaspacore.Transaction()
        .from(res.entries)
        .to(toAddr, amount)
        .setVersion(0)
        .fee(fee)
        // .change(changeAddr)
      tx.sign(privKeys, kaspacore.crypto.Signature.SIGHASH_ALL, 'schnorr');

      console.log('--- tx', tx)
    }).catch((err: any) => {
      console.error('err', err)
    })
    setTimeout(async () => {
      try {
        let response = await wallet.submitTransaction({
            // toAddr: 'kaspatest:qrr28334xft4s47ttn6dhclwez3veh5vs8ws8et4u2t74y65jrznzly8sj2mp', // destination address
            toAddr, // destination address
            amount: 10000000,  // amount in base units
            fee: 10000000,     // user fees
        }, true);
        if(!response)
          console.log('general error');  // if kaspad returns null (should never occur)
        else
          console.log('success:', response);
      } catch(ex) {
        console.log('error:',ex);
      }
    }, 1000)
  })

})();

