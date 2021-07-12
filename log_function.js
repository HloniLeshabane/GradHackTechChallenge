'use strict'

function Log (group, name, activity, time) {
 const request
 request = `INSERT INTO '${group}'Log(Student_Name,Activity,DATE) VALUES ('${name}','${activity}','${time}')`
 return query
}


.query('CREATE TABLE ' + name + ' (Student_Name var(255),Msg var(255),DATE var(50))')
.query('CREATE TABLE ' + name + 'Log (Student_Name var(255),Activity var(255),DATE var(50))')