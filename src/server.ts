import express from "express";
import fs from "fs";
import https from "https";
import { TLSSocket } from "tls";

const opts: https.ServerOptions = {
  cert: fs.readFileSync("./certs/server/mtls-example.localdev.xyz.crt"),
  key: fs.readFileSync("./certs/server/mtls-example.localdev.xyz.key"),
  requestCert: true,
  rejectUnauthorized: false,
};

const app = express();

app.get("/", (req, res) => {
  const socket = req.socket as TLSSocket;
  const cert = socket.getPeerCertificate();

  console.log("CN:", cert.subject.CN);

  res.status(200).send(cert);
});

https.createServer(opts, app).listen(9443);
