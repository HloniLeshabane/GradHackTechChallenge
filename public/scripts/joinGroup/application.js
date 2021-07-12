'use strict'

fetch('/application')
  .then(function (res) {
    if (res.ok) {
      return res.json()
    } else {
      throw 'No database connection!'
    }
  }).then(function (msgs) {
    msgs.forEach(student => {
      const text1 = document.getElementById('apps')
      const text2 = document.createElement('div')
      text2.className = 'col-xl-3 col-md-6'
      const text3 = document.createElement('div')
      text3.className = 'card bg-success text-white mb-4'
      const text4 = document.createElement('div')
      text4.className = 'card-body'
      const text5 = document.createElement('h5')
      const text6 = document.createElement('h5')

      text1.appendChild(text2)
      text2.appendChild(text3)
      text2.appendChild(text3) // put groupname

      text3.appendChild(text4)
      text3.appendChild(text5)
      text3.appendChild(text6)

      /* Group name */
      text4.innerHTML = 'Vote for ' + student.Student + ' to join group. Please ignore if you have already voted'

      /* Accept */
      var a = document.createElement('a')
      a.className = 'small text-white'
      a.id = 'a'
      var linkText = document.createTextNode('Accept')
      a.appendChild(linkText)
      a.href = '/voteyes/' + student.Student
      text5.appendChild(a)

      /* Decline */
      var b = document.createElement('a')
      b.className = 'small text-white'
      b.id = 'd'
      var linkText1 = document.createTextNode('Decline')
      b.appendChild(linkText1)
      b.href = '/voteno/' + student.Student
      text6.appendChild(b)
    })
  })
  .catch(function (e) {
    alert(e)
  })
