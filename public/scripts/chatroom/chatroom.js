'use strict'

fetch('/chatroom/chats')
  .then(function (res) {
    if (res.ok) {
      return res.json()
    } else {
      throw 'No database connection!'
    }
  }).then(function (msgs) {
    msgs.forEach(student => {
      const text = document.createElement('div')
      text.className = 'sentmsg_class'
      text.id = 'sentmsg'
      const sub = document.getElementById('chats')
      sub.appendChild(text)
      const paragraph = document.createElement('p')// Create <p> element
      const li = document.createTextNode(student.Msg)
      paragraph.appendChild(li)
      text.appendChild(paragraph)
      paragraph.innerHTML = student.Student_Name + ':  '// Create text node
      text.appendChild(paragraph)// Append <p> to <body>
      const liText = document.createTextNode(student.Msg)
      paragraph.appendChild(liText)
      text.appendChild(paragraph)
    })
  })
  .catch(function (e) {
    alert(e)
  })
