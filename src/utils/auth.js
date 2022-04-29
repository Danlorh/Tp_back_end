import config from '../config'
import { UserModel } from '../resources/user/model'
import jwt from 'jsonwebtoken'

const userModel = new UserModel()

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  userModel.create(req.body)
  res.send('User created successfully')
}

export const signin = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  // const { email, password } = req.body
  const verify = ({ email, password }) => {
    let res = null
    userModel.users.forEach(user => {
      console.log(user)
      if (user.email === email) {
        if (user.password === password) {
          res = user
        }
      }
    })
    return res
  }

  const user = verify(req.body)
  console.log(user)
  if (user) {
    res.send(user)
  } else {
    res.send('Invalid email or password')
  }
}

export const protect = async (req, res, next) => {
  next()
}
