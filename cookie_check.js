const JWT = require('jsonwebtoken')
const secret_key = 'fundanami'

const check = (req, res, next) => {
    const token = req.cookies.fundanami_login
    

    // check json web token exists and then verify
    if (token) {
        JWT.verify(token, secret_key, (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.redirect('/login')
            } else {
                //console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

const checkforloggedin = (req, res, next) => {
    const token = req.cookies.fundanami_login
    console.log(token)
    if (token) {
        JWT.verify(token, secret_key, (err, decodedToken) => {
            if (err) {
                console.log(err)
                next()
            } else {
                console.log(decodedToken)
                res.redirect('/dashboard')
            }
        })
    } else {
        next()
    }
}

module.exports = {
    check,
    getUserName: function (req) {

        const token = req.cookies.fundanami_login
        var username

        if (token) {

            JWT.verify(token, secret_key, (err, decodedToken) => {
                if (err) {
                    console.log(err)
                    return null
                } else {
                    username = decodedToken.username
                }
            })
        } else {
            return null
        }
        return username
    },
    checkforloggedin
}