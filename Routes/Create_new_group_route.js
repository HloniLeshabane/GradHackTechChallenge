'use strict'
const path = require('path')
const express = require('express')
const router = express.Router()
const db_f = require('../db_functions.js')
const getUserName = require('../cookie_check.js').getUserName
const bodyParser = require('body-parser')
const check = require('../cookie_check.js').check
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const Web3 = require('web3')
const url = 'https://mainnet.infura.io/v3/05b33b757fa2459faa09aa3c727d1a52'
const web3 = new Web3(url)
const address = '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8'
const etherToRand = 29134.15

router.get('/',check, async (req, res) => {
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
 

  res.render('bitcoin', {
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

router.post('/',check, async (req, res) => {
  const name = req.body.groupName
  const description = req.body.groupDescription
  const theme = req.body.groupTheme
  const activity = 'Created group'
  
  const groupLog = name + 'Log'

  const result = await db_f.insertGroup(name, description, theme)
  if (result) {
    const username = getUserName(req)
    console.log(username)
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)

    db_f.addStudenttoGroup(username, name, today.toDateString())
    db_f.Log_creation(name, groupLog)
    db_f.Log(groupLog, username, activity, today.toDateString())
    res.sendFile(path.join(__dirname, '../views', 'create_new_group_files', 'group_created.html'))
  } else {
    res.redirect('/')
  }

  // res.redirect('/dashboard')
})
module.exports = router
