// @ts-nocheck
const express = require('express')

const route = express.Router()

route.get("/getBalanceByAddress", (req, res1) => {
  const address = req.query.address
  client.getBalanceByAddress(address).then((res) => {
    return res1.json(res.balance)
  }).catch(err => {
    console.error('err', err)
  })
})

route.get("/getUtxosByAddresses", (req, res1) => {
  const address = req.query.address
  client.getUtxosByAddresses(
    [address]
  ).then((res) => {
    return res1.json(res.entries)
  }).catch(err => {
    console.error('err', err)
  })
})

route.post("/submitTransaction", (req, res1) => {
  const tx = req.body.tx;

  client.submitTransaction(
    JSON.parse(tx)
  ).then((res) => {
    if (!res.transactionId) {
      throw new Error(res.error.message)
    }
    console.log('res', res)
    return res1.json(res.entries)
  }).catch(err => {
    console.error('err', err)
    res1.status(400).json({ error: err.message });
  })
})

export default route