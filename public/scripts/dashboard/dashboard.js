
function searchFor() {
  const search_word = document.getElementById('search_for').value
  if (search_word == '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Empty Search'
    })
  } else {
    location.assign(`/results/${search_word}`)
  }
}

function deleteMeeting(groupname, date) {
  console.log("deleting")
  groupname = groupname.split(',')[0]
  console.log("Group: " + groupname, "Date: " + date)
  let send = false;
  Swal.fire({
    title: 'Are you sure?',
    text: "Meeting will be deleted for everyone in the group!",
    icon: 'warning',
    groupname,
    date,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    

    
    if (result.isConfirmed) {
      console.log("Group: " + groupname, "Date: " + date)
      // POST request using fetch()
      fetch('/dashboard/deleteMeeting',{

        // Adding method type
        method: 'POST',

        // Adding body or contents to send
        body: JSON.stringify({
          groupname,
          date
        }),

        // Adding headers to the request
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })

      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      location.reload()
    }
  })
}

function checkDate(date, groupname) {
  const meetingDate = new Date(date)
  const today = new Date()

  if (datesAreOnSameDay(today, meetingDate)) {
    groupname = groupname.split(',')[0]
    console.log(groupname)
    location.assign(`/screening/${groupname}`)
  } else {
    Swal.fire({
      icon: 'info',
      title: 'Woah...',
      text: 'Can only meet on the day of scheduled meeting'
    })
  }
}

const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate()

  