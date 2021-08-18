/**
 * Expect a Bearer Token
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function expectBearer(req, res, next) {
  if (!req.headers.authorization?.startsWith('Bearer')) {
    res
      .writeHead(403, {'content-type': 'application/json'})
      .end(JSON.stringify({message: 'bearer token must be supplied'}));
    return;
  }

  next();
}
