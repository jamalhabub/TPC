const express = require('express');
const Web3 = require('web3');

const app = express();
const port = process.env.PORT || 3000;

const web3 = new Web3('https://bsc-dataseed.binance.org/');
const contractAddress = '0x2826A2dd79357cAaBD06739AE34e06bCcE4e80AD';
const abi = [{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"}];

const contract = new web3.eth.Contract(abi, contractAddress);

app.get('/totalSupply', async (req, res) => {
    const supply = await contract.methods.totalSupply().call();
    const humanReadable = supply / 1e18; // adjust decimals
    res.send(humanReadable.toString());
});

app.listen(port, () => console.log(`API listening on port ${port}`));
