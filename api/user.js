import {
  Router
} from 'express'
import jwt from 'jsonwebtoken'
const router = Router()

const data = [{
    id: '6d60697d-802e-4bf7-acce-7401612d09f1',
    name: 'Reinaldy',
    email: 'reinaldy@mail.com',
    level: 9
  },
  {
    id: '6a45d08c-3dc1-497a-a801-d1b63603cfa3',
    name: 'John Doe',
    email: 'johndoe@mail.com',
    level: 9
  },
  {
    id: 'a1005a79-c7c0-4f48-bb2e-e650626fa948',
    name: 'Steven William',
    email: 'stevew@mail.com',
    level: 9
  }
]
const APIKEY = `2spX^cJdJ8wArpEei!AQ4nH%Y&%5s*bdmNoZuMPkyrqLjO*lO8t3ZY^EvSX^Nx!r#9t!BtXw0S%j5ranpR*7mL1&`

router.post('/userdata', (req, res) => {
  if (req.body.key == APIKEY) {
    const searchData = data.find(() => {
      'email' === req.body.email
    })
    const output = jwt.sign(searchData, 'K27qp2hjYQ5cFeVxRmMr0JvNA18ZV64kLGPDy8UhWpKKTdlBMZ76eMuVGSPpfrU')
    res.status(200).json({
      status: 200,
      on: 'userdata',
      data: output
    })
  }
})

router.get('/', (req, res) => {
  res.json({
    message: 'Hello there!'
  })
})

export default router