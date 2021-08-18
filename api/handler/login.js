import {promisify} from 'util';
import jwt from 'jsonwebtoken';
import bcrypt from '@phc/bcrypt';
import {db} from '../db';

const sign = promisify(jwt.sign);

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export function loginGet(req, res) {
  res
    .writeHead(200, {'content-type': 'application/json'})
    .end(JSON.stringify({token: req.csrfToken()}));
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function loginPost(req, res) {
  const {email, password} = req.body;
  if (!email || !password) {
    res
      .writeHead(400, {'content-type': 'application/json'})
      .end(JSON.stringify({message: 'email, and password must be supplied'}));
    return;
  }

  try {
    // Check if the user exists
    const user = await db.findOne({email});
    if (!user) {
      res
        .writeHead(400, {'content-type': 'application/json'})
        .end(JSON.stringify({message: 'invalid email'}));
      return;
    }

    // Verify the password
    const verified = await bcrypt.verify(user.password, password);

    if (verified) {
      const token = await sign(user, 'oXKbg24L2MBFsoQ5GRmBnJyp4ryHyAur', {expiresIn: '10m'});
      res
        .writeHead(200, {'content-type': 'application/json'})
        .end(JSON.stringify({message: 'ok', token}));
      return;
    }

    res
      .writeHead(400, {'content-type': 'application/json'})
      .end(JSON.stringify({message: 'invalid password'}));
    return;
  } catch (error) {
    res
      .writeHead(500, {'content-type': 'application/json'})
      .end(JSON.stringify({error}));
  }
}
