import {promisify} from 'util';
import jwt from 'jsonwebtoken';

const verify = promisify(jwt.verify);

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function dataGet(req, res) {
  try {
    const bearer = req.headers.authorization.replace('Bearer ', '');
    const data = await verify(bearer, 'oXKbg24L2MBFsoQ5GRmBnJyp4ryHyAur');
    res
      .writeHead(200, {'content-type': 'application/json'})
      .end(JSON.stringify(data));
  } catch (error) {
    res
      .writeHead(500, {'content-type': 'application/json'})
      .end(JSON.stringify({error}));
  }
}
