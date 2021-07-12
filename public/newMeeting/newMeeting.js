
const createbtn = document.getElementById('btnNavbarSearch')

createbtn.addEventListener('click', function (e) {
  e.preventDefault()
  //e.stopPropagation()
  //e.stopImmediatePropagation(); 
  console.log('Tried to feteeeeeeee')

  const date = document.getElementById('picker').value
  const duration = document.getElementById('Duration').value
  const groupname = document.getElementById('groupname').value
  const agenda = document.getElementById('Agenda').value

  if (date === '' || duration === '' || groupname === '' || agenda === '' || duration === '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Some fields are empty'
    })
  } else {

    const socket = io()
    socket.emit('meeting_connection',{

    })


    socket.sendBuffer = [];
    let string = date
    string = string.split(' ')
    const stringArray = new Array()
    for (let i = 0; i < string.length; i++) {
      stringArray.push(string[i])
      if (i != string.length - 1) {
        stringArray.push(' ')
      }
    }
    const newdate = stringArray[0].replace('-', '/')

    // POST request using fetch()
    fetch('/newMeeting', {

      // Adding method type
      method: 'POST',

      // Adding body or contents to send
      body: JSON.stringify({
        GroupName: groupname,
        Date: newdate,
        Agenda: agenda,
        StartTime: stringArray[2],
        Duration: duration
      }),

      // Adding headers to the request
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })

    socket.on('created', function () {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Meeting created',
        showConfirmButton: false,
        timer: 1500
      })
      socket.close()
      location.assign('/dashboard')
    })
  }
})
