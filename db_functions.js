'use strict'
const { pool } = require('mssql')
const db = require('./db.js')
const database = require('./db.js')
const bcrypt = require('bcrypt')
const students_table = 'FundaNami_db.Student'
const groups_table = 'FundaNami_db.Groups'

const execute = async function (query) {
  const queryResult = { Error: '', Description: '', Result: undefined }

  // Make a query to the database
  await database.pools
    // Run query
    .then((pool) => {
      return pool.request()

        // This is only a test query, change it to whatever you need
        .query(query)
    })
    // Send back the result
    .then(result => {
      queryResult.Result = result
      return result
    })
    // If there's an error, return that with some description
    .catch(err => {
      const sql_command = query.split(' ')[0]
      queryResult.Error = err
      queryResult.Description = `Could not execute SQL command ${sql_command}`
      console.log(queryResult.Description + ' ' + err)
    })
  return queryResult
}

module.exports = {
  queryStudent: async function (username) {
    try {
      const query = `SELECT * FROM Student WHERE FirstName LIKE '${username}%' OR Username LIKE '${username}%' OR LastName LIKE '${username}%'`
      const query2 = `SELECT * FROM Student WHERE Username='${username}'`
      const result = await execute(query)
      console.log(result)
      return result
    } catch (err) {
      console.log('errored inside')
      console.log(err)
    }
  },

  insertStudent: async function (name, lastname, address, email, username, password) {
    try {
      const params = '( FirstName, LastName, Address, Email, Username,Password)'
      const values = `('${name}','${lastname}','${address}','${email}','${username}','${password}')`
      const query = `INSERT INTO Student ${params} VALUES ${values}`

      const result = await execute(query)
      return result
    } catch (err) {
      console.log(err)
    }
  },
  insertGroup: async function (name, description, theme) {
    console.log('trying')

    try {
      const params = '(Name, Description, Theme)'
      const values = `('${name}','${description}','${theme}')`
      const query = `INSERT INTO Groups ${params} VALUES ${values}`

      const result = await execute(query)
      console.log(result)

      return result
    } catch (err) {
      console.log(err)
    }
  },
  queryEtherClient: async function(username){

    try {
      const query = `SELECT * FROM Client WHERE Username ='${username}' `
      const result = await execute(query)

      return result
      
    } catch (err) {
      console.log(err)
    }

  }
  ,
  queryGroup: async function (name) {
    try {
      const query = `SELECT * FROM Groups WHERE Name LIKE '${name}%' OR Description LIKE '%${name}%'`
      const result = await execute(query)

      return result
    } catch (err) {
      console.log('errored inside')
      console.log(err)
    }
  },
  deleteStudent: async function (username) {
    try {
      const query = `DELETE FROM Student WHERE Username='${username}'`
      const result = await execute(query)

      return result
    } catch (err) {
      console.log('errored inside')
      console.log(err)
    }
  },
  authenticateStudent: async function (username, password) {
    try {
      const query = `SELECT * FROM Student WHERE Username='${username}'`
      const result = await execute(query)

      if (result.Result.recordset[0].Password === password || await bcrypt.compare(password, result.Result.recordset[0].Password)) {
        return true
      }
      return false
    } catch (err) {
      console.log('errored inside')
      console.log(err)
    }
  },
  getStudentRating: async function (username) {
    try {
      const query = `SELECT * FROM Student WHERE Username='${username}'`
      const result = await execute(query)
      return result.Result.recordset[0].studentRating
    } catch (err) {
      console.log(err)
    }
  },
  createMeeting: async function (data) {
    try {
      const params = '(GroupName,Date,Author,Agenda,StartTime,Duration)'
      const values = `('${data.GroupName}','${data.Date}','${data.Author}','${data.Agenda}','${data.StartTime}','${data.Duration}')`
      const query = `INSERT INTO Meetings ${params} VALUES ${values}`

      const result = await execute(query)

      return result
    } catch (err) {
      console.log(err)
    }
  },

  getMeetings: async function (username) {
    try {
      const query = `SELECT * FROM StudentinGroup INNER JOIN Meetings on StudentinGroup.GroupName = Meetings.GroupName WHERE Student = '${username}' ORDER BY Date ASC`
      const result = await execute(query)
      return result
    } catch (err) {
      console.log(err)
    }
  },

  getStudentbyRating: async function (minimumRating) {
    try {
      const query = `SELECT * FROM Student WHERE studentRating>=${minimumRating}`
      const result = await execute(query)
      return result
    } catch (err) {
      console.log(err)
    }
  },
  fetchStudentsFullNameinGroup: async function (groupname) {
    try {
      const query = `SELECT FirstName,LastName,Username FROM Student INNER JOIN StudentinGroup ON StudentinGroup.Student = Student.Username WHERE GroupName='${groupname}'`
      const result = await execute(query)
      return result
    } catch (err) {
      console.log(err)
    }
  },
  fetchStudentsAddressinGroup: async function (groupname) {
    try {
      const query = `SELECT  Firstname,LastName,Username, Address FROM Student INNER JOIN StudentinGroup ON StudentinGroup.Student = Student.Username WHERE GroupName='${groupname}'`
      const result = await execute(query)
      return result
    } catch (err) {
      console.log(err)
    }
  },

  setRating: async function (username, rating) {
    try {
      const query = `UPDATE Student SET studentRating = ${rating} WHERE Username='${username}'`
      const result = await execute(query)
      return result
    } catch (err) {
      console.log(err)
    }
  },
  deleteMeeting: async function (groupname, date) {
    try {
      const query = `DELETE FROM Meetings WHERE GroupName='${groupname}' AND Date='${date}'`
      const result = await execute(query)
      return result
    } catch (err) {
      console.log(err)
    }
  },

  getStudentsinGroup: async function (groupname) {
    try {
      const query = `SELECT * FROM StudentinGroup WHERE GroupName=${groupname}`
      const result = await execute(query)
      return result
    } catch (err) {
      console.log(err)
    }
  },
  getStudentinGroupList: async function (username, groupname) {
    try {
      const query = `SELECT * FROM StudentinGroup WHERE GroupName='${groupname}' AND Student='${username}'`
      const result = await execute(query)
      return result
    } catch (err) {
      console.log(err)
    }
  },
  getGroups: async function (username) {
    try {
      const query = `SELECT * FROM StudentinGroup WHERE Student='${username}'`
      const result = await execute(query)

      return result
    } catch (err) {
      console.log(err)
    }
  },

  similarGroups: async function (theme) {
    try {
      const query = `SELECT * FROM Groups WHERE theme='${theme}'`
      const result = await execute(query)
      return result
    } catch (err) {
      console.log('errored inside')
      console.log(err)
    }
  },
  addStudenttoGroup: async function (username, groupName, date) {
    try {
      const params = '( Student, GroupName, DateAdded)'
      const values = `('${username}','${groupName}','${date}')`
      const query = `INSERT INTO StudentinGroup ${params} VALUES ${values}`

      const result = await execute(query)
      return result
    } catch (err) {
      console.log(err)
    }
  },
  queryByEmail: async function (email) {
    try {
      const query = `SELECT * FROM Student WHERE Email='${email}'`
      const result = await execute(query)
      console.log(result)
      return result
    } catch (err) {
      console.log('errored inside')
      console.log(err)
    }
  },
  closeConnections: function () {
    database.pools
      .then(pool => {
        pool.close()
      })
      .catch(err => {
        throw err
      })
  },
  // Creating tables for groups
  Log_creation: async function (name, log) {
    try {
      const query1 = 'CREATE TABLE ' + log + ' (Student_Name varchar(255),Activity varchar(255),DATE varchar(50))'
      const query2 = 'CREATE TABLE ' + name + ' (Student_Name varchar(255),Msg varchar(255),DATE varchar(50))'

      const result1 = await execute(query1)
      await execute(query2)

      return result1
    } catch (err) {
      console.log('errored inside')
      console.log(err)
    }
  },
  Log: async function (log, name, activity, time) {
    try {
      const query = 'INSERT INTO ' + log + ` (Student_Name,Activity,DATE) VALUES ('${name}','${activity}','${time}')`

      const result1 = await execute(query)

      return result1
    } catch (err) {
      console.log('errored inside')
      console.log(err)
    }
  }

}
