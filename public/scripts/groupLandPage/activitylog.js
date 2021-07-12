'use strict'

fetch('/group/activity/log')
  .then(function (res) {
    if (res.ok) {
      return res.json()
    } else {
      throw 'No database connection!'
    }
  }).then(function (msgs) {
    msgs.forEach(student => {
      const element = document.createElement('td')
      const element2 = document.createElement('td')
      const element3 = document.createElement('td')
      const subelem = document.createElement('tr')
      const sub = document.getElementById('myTable')
      element.innerHTML = student.Student_Name
      subelem.appendChild(element)
      sub.appendChild(subelem)
      element2.innerHTML = student.Activity
      subelem.appendChild(element2)
      sub.appendChild(subelem)
      element3.innerHTML = student.DATE
      subelem.appendChild(element3)
      sub.appendChild(subelem)
    })
  })
  .catch(function (e) {
    alert(e)
  })
