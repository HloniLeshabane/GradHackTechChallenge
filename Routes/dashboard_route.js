'use strict'
const path = require('path')
const express = require('express')
const db_f = require('../db_functions.js')
const router = express.Router()
const check = require('../cookie_check.js').check
const getUserName = require('../cookie_check.js').getUserName
const JWT = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const Web3 = require('web3')
const url = 'https://mainnet.infura.io/v3/05b33b757fa2459faa09aa3c727d1a52'
const web3 = new Web3(url)
const address = '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8'
const etherToRand = 29134.15

var jsonParser = bodyParser.json()
router.get('/', check, async (req, res) => {
  const username = getUserName(req)
  const meetings = await db_f.getMeetings(username)
  const ether_profile = await db_f.queryEtherClient(username)
  console.log(ether_profile.Result.recordset)

  /* Query Ether */ 
  var ethers
  web3.eth.getBalance(ether_profile.Result.recordset[0].Address,(err,bal)=>{
   
    ethers =  web3.utils.fromWei(bal,'ether')
    console.log(ethers)
    console.log(ethers*etherToRand)
  })
 

  res.render('dashboard', {
    name: username,
    meetings: meetings.Result.recordset,
    address:ether_profile.Result.recordset[0].Address,
    ethereum:ether_profile.Result.recordset[0].Total,
    balance_rands:ether_profile.Result.recordset[0].Total*etherToRand,
    reserved:ether_profile.Result.recordset[0].Reserved,
    GPU:ether_profile.Result.recordset[0].GPU,
    available:ether_profile.Result.recordset[0].Total - ether_profile.Result.recordset[0].Reserved


  })
})

router.post('/deleteMeeting',check,jsonParser, async(req, res) => {
  const username = getUserName(req)
  console.log('date:'+req.body.date,'groupname:'+req.body.groupname2)

  await db_f.deleteMeeting(req.body.groupname,req.body.date)
  res.status(200)
})

module.exports = router
