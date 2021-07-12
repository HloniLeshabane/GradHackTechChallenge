
function COVID19(groupname) {
    console.log('FORM CHECKING WITH: '+groupname)
    const msg = []
    document.getElementById('form1').onsubmit = function () {
        one = parseInt(document.querySelector('input[name = "one"]:checked').value)
        two = parseInt(document.querySelector('input[name = "two"]:checked').value)
        three = parseInt(document.querySelector('input[name = "three"]:checked').value)
        four = parseInt(document.querySelector('input[name = "four"]:checked').value)
        five = parseInt(document.querySelector('input[name = "five"]:checked').value)
        six = parseInt(document.querySelector('input[name = "six"]:checked').value)
        seven = parseInt(document.querySelector('input[name = "seven"]:checked').value)
        eight = parseInt(document.querySelector('input[name = "eight"]:checked').value)
        nine = parseInt(document.querySelector('input[name = "nine"]:checked').value)
        ten = parseInt(document.querySelector('input[name = "ten"]:checked').value)
        eleven = parseInt(document.querySelector('input[name = "eleven"]:checked').value)
        twelve = parseInt(document.querySelector('input[name = "twelve"]:checked').value)

        result = one + two + three + four + five + six + seven + eight + nine + ten + eleven + twelve

        if (result === 300) {
            window.location.assign(`/meeting/${groupname}`)
        } else {
            Swal.fire(
                'Hmmm feeling ok?',
                'Seems like the covid got ya!',
                'question'
              )
        }
        // document.getElementById('grade').innerHTML = result

        return false // required to not refresh the page; just leave this here
    }

}