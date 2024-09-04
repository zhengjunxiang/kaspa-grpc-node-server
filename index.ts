// @ts-nocheck
// export * from "./lib/rpc";
import {RPC} from './lib/rpc'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
import apiRoute from "./routes/index"

const app = express()

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use("/api", apiRoute)

global.client = new RPC({
  clientConfig: {
    host: "13.213.9.146:16310"
  }
});

client.onConnect(() => {
  console.log('onConnect')
});

app.listen(8090, async () => {
  console.log("Listening on port 8090")
})

