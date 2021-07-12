
function checkRating (mydate) {
  const rating = document.getElementById('rating').value
  const person = document.getElementById('person').value
  const reason = document.getElementById('reason').value
  // const mydate = document.getElementById('submitbtn').title
  // console.log('My date: ' + mydate)

  const dateAdded = new Date(mydate)
  const today = new Date()
  const Difference_In_Time = today.getTime() - dateAdded.getTime()
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

  console.log('Date I entered:' + dateAdded)
  console.log('Today:' + today)
  console.log('Days between:' + Difference_In_Days)

  if (Difference_In_Days < 7) {
    Swal.fire('You havent been in the group long enough to vote')
  }

  if (rating === '' || person === '' || reason === '') {
    Swal.fire('Fill in all fields')
  } else {
    fetch('/rating', {

      // Adding method type
      method: 'POST',

      // Adding body or contents to send
      body: JSON.stringify({
        rating,
        person,
        reason
      }),

      // Adding headers to the request
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
  }
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Rating complete',
    showConfirmButton: false,
    timer: 1500
  })
}
