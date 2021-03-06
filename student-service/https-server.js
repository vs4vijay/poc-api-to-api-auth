#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

const CONFIG = {
    port: process.env.PORT || 4000,
    cert: process.env.SSL_CERT || fs.readFileSync('../ca1/server-cert.pem'),
    key: process.env.SSL_KEY || fs.readFileSync('../ca1/server-key.pem'),
    ca: [ fs.readFileSync('../ca2/ca-cert.pem') ]
};

const options = {
    cert: CONFIG['cert'],
    key: CONFIG['key'],
    ca: CONFIG['ca'], // required in case of self-signed certificate
    requestCert: true, // enables the Client Certification
    rejectUnauthorized: true // false, in case of self-signed certificate (requestCert should be false too)
};

const server = https.createServer(options, app).listen(CONFIG['port'], () => {
    console.log(`Application running on port ${CONFIG['port']} with HTTPS`)
});

app.get('/', (req, res) => { 
	console.log('Request');
	res.send({message: 'Student Service from Secure Server!'});
});