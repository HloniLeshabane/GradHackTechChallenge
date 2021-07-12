'use strict'
//const mail = require('../mail')
const form = document.getElementById('vote-form')

form.addEventListener('submit', (e) => {
  const choice = document.querySelector('input[name = vot]:checked').value

  const data = { vot: choice }
  fetch('/dashboard/voting', {
    method: 'post',
    body: JSON.stringify(data),
    headers: new Headers({ 'Content-Type': 'application/json ' })
  })

    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  e.preventDefault()
})

let dataPoints = [
  { label: 'Yes', y: 0 },
  { label: 'No', y: 0 }

]

const chartContainer = document.querySelector('#chartContainer')

if (chartContainer) {
  const chart = new CanvasJS.Chart('chartContainer', {

    AnimationEnabled: true,
    theme: 'theme1',
    title: {
      text: 'Poll results'
    },
    data: [
      {
        type: 'column',
        dataPoints: dataPoints
      }
    ]
  })

  chart.render()

  //Pusher.logToConsole = true

  const pusher = new Pusher('1ca697c08744efcbc7ed', {
    cluster: 'mt1'
  })

  const channel = pusher.subscribe('fundaNami-poll')
  channel.bind('fundaNami-vote', function (data) {
    dataPoints = dataPoints.map(x => {
      if (x.label === data.vot) {
        x.y += data.points
        return x
      } else { return x }
    })
    chart.render()
  })
}






let x = setInterval(function(){

  let dueDate  ='July 04, 2021, 23:40' // This date is obtained from cookies
  let countDate = new Date(dueDate).getTime()
  let now = new Date().getTime()
  let gap = countDate-now
  let seconds = 1000
  let minutes = seconds*60
  let hours = minutes*60
  let days = hours*24

  let textDay = Math.floor(gap/days)
  let textHour = Math.floor((gap%days)/ hours)
  let textMinute = Math.floor((gap%hours)/minutes)
  let textSecond = Math.floor((gap%minutes)/seconds)

  document.querySelector('.day').innerHTML = textDay
  document.querySelector('.hour').innerHTML = textHour
  document.querySelector('.minute').innerHTML = textMinute
  document.querySelector('.second').innerHTML = textSecond

  if (gap<1000){
    document.getElementById('hide').innerHTML='VOTE SESSION CLOSED'
    document.getElementById('hide').style.color = 'Red'
    document.getElementById('done_voting').style.display = 'none'
    //document.getElementById('done_voting').innerText = 'done'
    document.querySelector('.day').innerHTML = 0
    document.querySelector('.hour').innerHTML = 0
    document.querySelector('.minute').innerHTML = 0
    document.querySelector('.second').innerHTML = 0
    clearInterval(x)
  }


},1000)

/*
let countDown = ()=>{

  let dueDate  ='July 04, 2021, 16:25' // This date is obtained from the database
  let countDate = new Date(dueDate).getTime()
  let now = new Date().getTime()
  let gap = countDate-now

  let seconds = 1000
  let minutes = seconds*60
  let hours = minutes*60
  let days = hours*24

  let textDay = Math.floor(gap/days)
  let textHour = Math.floor((gap%days)/ hours)
  let textMinute = Math.floor((gap%hours)/minutes)
  let textSecond = Math.floor((gap%minutes)/seconds)

  document.querySelector('.day').innerHTML = textDay
  document.querySelector('.hour').innerHTML = textHour
  document.querySelector('.minute').innerHTML = textMinute
  document.querySelector('.second').innerHTML = textSecond

  if (gap<1000){
    document.getElementById('hide').innerHTML='VOTE SESSION CLOSED'
    document.getElementById('hide').style.color = 'Red'
    document.getElementById('done_voting').style.display = 'none'
  }
}
*/


/*
  if (gap < 1000){


    if (dataPoints[0].y >=dataPoints[1].y && dataPoints[0].y !==0){

      /*const username = getUserName(req)
      const timeElapsed = Date.now()
      const today = new Date(timeElapsed)

     db_f.addStudenttoGroup(username, name, today.toDateString())*/


      /*let email = 'phetololesego@gmail.com'
      const subject = 'FundaNami app vote outcome'
      const text = 'You are a member of group ###'



      mail(email, subject, text, (err, data) => {
        if (err) {
        throw Error('email not sent')
       } 

      })
    }else{

      let email = 'phetololesego@gmail.com'
      const subject = 'FundaNami app vote outcome'
      const text = 'You are not a member of group ###'



      mail(email, subject, text, (err, data) => {
        if (err) {
        throw Error('email not sent')
       } 

      })


    }



  }



}*/

//setInterval(countDown,1000)
