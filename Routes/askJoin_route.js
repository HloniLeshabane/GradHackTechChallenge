'use strict'
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('../db')
const check = require('../cookie_check.js').check
const getUserName = require('../cookie_check.js').getUserName
const router = express.Router()
const Cookies = require('../js/groupCookie')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/join/:group',check, (req, res) => {
  const name = req.params.group

  var groupName = req.params.group

  db.pools
    // Run query
    .then((pool) => {
      return pool.request()

      // This is only a test query, change it to whatever you need

        .query(`INSERT INTO JoinApplication (Student,GName,yes,votes) VALUES ('${name}','${groupName}',0,0)`)
    })
    .then(() => {
      res.redirect('/dashboard')
      // return res.redirected('/chatroom')
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

router.get('/invite', (req, res) => {
  const username = getUserName(req)

  db.pools
  // Run query
    .then((pool) => {
      return pool.request()

      // This is only a test query, change it to whatever you need
        .query(`SELECT * FROM Invites WHERE Student='${username}'`)
    })
    .then(result => {
      res.send(result.recordset)
      // return res.redirected('/chatroom')
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})
router.get('/sendinvite/:name',check, (req, res) => {
  const name = req.params.name
  var cookies = req.cookies
  var groupName = Cookies.getgroup('GName', JSON.stringify(cookies))

  db.pools
  // Run query
    .then((pool) => {
      return pool.request()

      // This is only a test query, change it to whatever you need
        .query(`INSERT INTO Invites (Student,GName) VALUES ('${name}','${groupName}')`)
    })
    .then(() => {
      res.redirect('/group/' + groupName)
      // return res.redirected('/chatroom')
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

router.get('/decline/:GName',check, (req, res) => {
  const username = getUserName(req)
  const group = req.params.GName

  db.pools
  // Run query
    .then((pool) => {
      return pool.request()

      // This is only a test query, change it to whatever you need

        .query(`DELETE FROM Invites WHERE Student='${username}' AND GName='${group}'`)
    })
    .then(() => {
      res.redirect('/dashboard')
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})
router.get('/accept/:GName',check, (req, res) => {
  const username = getUserName(req)
  const group = req.params.GName
  const timeElapsed = Date.now()
  const today = new Date(timeElapsed)

  db.pools
  // Run query
    .then((pool) => {
      return pool.request()

      // This is only a test query, change it to whatever you need
        .query(`INSERT INTO StudentinGroup (Student,GroupName,DateAdded) VALUES ('${username}','${group}','${today.toDateString()}')`)
        // .query(`DELETE FROM Invites WHERE Student='${username}' AND GName='${group}'`)
    }).then(db.pools
      // Run query
      .then((pool) => {
        return pool.request()

          .query(`DELETE FROM Invites WHERE Student='${username}' AND GName='${group}'`)
      }))
    .then(() => {
      res.redirect('/dashboard')
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

router.get('/application',check, (req, res) => {
  var cookies = req.cookies
  var group = Cookies.getgroup('GName', JSON.stringify(cookies))
  db.pools
  // Run query
    .then((pool) => {
      return pool.request()
      // This is only a test query, change it to whatever you need
        .query(`SELECT * FROM JoinApplication WHERE GName='${group}'`)
    }).then(result => {
      res.send(result.recordset)
      // return res.redirected('/chatroom')
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

router.get('/voteyes/:name', (req, res) => {
  const name = req.params.name
  var cookies = req.cookies
  var groupName = Cookies.getgroup('GName', JSON.stringify(cookies))

  db.pools
  // Run query
    .then((pool) => {
      return pool.request()

      // This is only a test query, change it to whatever you need
        .query(`UPDATE JoinApplication SET yes = yes+1, votes= votes+1 WHERE Student='${name}' AND GName='${groupName}'`)
    }).then(db.pools
      .then((pool) => {
        return pool.request()

          .query(`SELECT COUNT(Student) AS num FROM StudentinGroup WHERE GroupName='${groupName}'`)
      })
      .then((result) => {
        var people = result.recordset[0].num

        db.pools
        // Run query
          .then((pool) => {
            return pool.request()

            // This is only a test query, change it to whatever you need
              .query(`SELECT * FROM JoinApplication WHERE Student='${name}' AND GName='${groupName}'`)
          }).then((myJSON) => {
            var votes = myJSON.recordset[0].votes
            var yes = myJSON.recordset[0].yes
            var person = myJSON.recordset[0].Student
            console.log(votes)
            console.log(people)
            if (votes == people) {
              if (yes > (people / 2)) {
                const timeElapsed = Date.now()
                const today = new Date(timeElapsed)

                db.pools
                // Run query
                  .then((pool) => {
                    return pool.request()

                    // This is only a test query, change it to whatever you need
                      .query(`INSERT INTO StudentinGroup (Student,GroupName,DateAdded) VALUES ('${person}','${groupName}','${today.toDateString()}')`)
                      // .query(`DELETE FROM Invites WHERE Student='${username}' AND GName='${group}'`)
                  })
              }

              db.pools
              // Run query
                .then((pool) => {
                  return pool.request()

                    .query(`DELETE FROM JoinApplication WHERE Student='${person}' AND GName='${groupName}'`)
                })
            }
          })
      }))
    .then(() => {
      res.redirect('/group/' + groupName)
      // return res.redirected('/chatroom')
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

router.get('/voteno/:name', (req, res) => {
  const name = req.params.name
  var cookies = req.cookies
  var groupName = Cookies.getgroup('GName', JSON.stringify(cookies))

  db.pools
  // Run query
    .then((pool) => {
      return pool.request()

      // This is only a test query, change it to whatever you need
        .query(`UPDATE JoinApplication SET votes= votes+1 WHERE Student='${name}' AND GName='${groupName}'`)
    }).then(db.pools
      .then((pool) => {
        return pool.request()

          .query(`SELECT COUNT(Student) AS num FROM StudentinGroup WHERE GroupName='${groupName}'`)
      })
      .then((result) => {
        var people = result.recordset[0].num

        db.pools
        // Run query
          .then((pool) => {
            return pool.request()

            // This is only a test query, change it to whatever you need
              .query(`SELECT * FROM JoinApplication WHERE Student='${name}' AND GName='${groupName}'`)
          }).then((myJSON) => {
            var votes = myJSON.recordset[0].votes
            var yes = myJSON.recordset[0].yes
            var person = myJSON.recordset[0].Student
            console.log(votes)
            console.log(people)
            if (votes == people) {
              if (yes > (people / 2)) {
                const timeElapsed = Date.now()
                const today = new Date(timeElapsed)

                db.pools
                // Run query
                  .then((pool) => {
                    return pool.request()

                    // This is only a test query, change it to whatever you need
                      .query(`INSERT INTO StudentinGroup (Student,GroupName,DateAdded) VALUES ('${person}','${groupName}','${today.toDateString()}')`)
                      // .query(`DELETE FROM Invites WHERE Student='${username}' AND GName='${group}'`)
                  })
              }

              db.pools
              // Run query
                .then((pool) => {
                  return pool.request()

                    .query(`DELETE FROM JoinApplication WHERE Student='${person}' AND GName='${groupName}'`)
                })
            }
          })
      }))
    .then(() => {
      res.redirect('/group/' + groupName)
      // return res.redirected('/chatroom')
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})
module.exports = router
