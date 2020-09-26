import {
  Router
} from 'express'
const router = Router()
import csrf from 'csurf'
import argon from 'argon2'

const csrfProtection = csrf({
  cookie: true
})
// the password is.. password
const hashed = `$argon2id$v=19$m=16,t=4,p=1$dUVEcm1XcjZjZXZ0bGxsUg$spsSead8tJRSKn/iSLgAScaS9ZZUdKH2AH14hbYoqBkWThs3xIK4Rq7pZ53dFl2/ULyNLAXv9L17sXxdYy8WYw`
const APIKEY = `2spX^cJdJ8wArpEei!AQ4nH%Y&%5s*bdmNoZuMPkyrqLjO*lO8t3ZY^EvSX^Nx!r#9t!BtXw0S%j5ranpR*7mL1&`

router.get('/preform', csrfProtection, (req, res) => {
  res.status(200).json({
    csrfToken: req.csrfToken()
  })
})

router.post('/login', csrfProtection, async (req, res) => {
  if (req.body.key == APIKEY) {
    try {
      if (await argon.verify(hashed, req.body.password)) {
        res.status(200).json({
          status: 200,
          on: 'login',
          message: 'success'
        })
      } else {
        res.status(200).json({
          status: 200,
          on: 'login',
          message: 'failed'
        })
      }
    } catch (error) {
      res.status(200).json({
        status: 200,
        on: 'login',
        message: 'failed'
      })
    }
  }
})

export default router