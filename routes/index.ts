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

export default route