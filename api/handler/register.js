import bcrypt from '@phc/bcrypt';
import {db} from '../db';

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export function registerGet(req, res) {
  res
    .writeHead(200, {'content-type': 'application/json'})
    .end(JSON.stringify({token: req.csrfToken()}));
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function registerPost(req, res) {
  const {name, email, password} = req.body;
  if (!name || !email || !password) {
    res
      .writeHead(400, {'content-type': 'application/json'})
      .end(JSON.stringify({message: 'name, email, and password must be supplied'}));
    return;
  }

  try {
    // Hash the password first
    const hashed = await bcrypt.hash(password);

    const data = await db.insert(
      {
        name,
        email,
        password: hashed,
      },
    );

    res
      .writeHead(200, {'content-type': 'application/json'})
      .end(JSON.stringify({message: 'ok', data}));
    return;
  } catch (error) {
    res
      .writeHead(500, {'content-type': 'application/json'})
      .end(JSON.stringify({error}));
  }
}
