import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import csrf from 'csurf';
import {loginGet, loginPost} from './handler/login';
import {registerGet, registerPost} from './handler/register';
import {dataGet} from './handler/data';
import {json} from './middleware/json';
import {expectBearer} from './middleware/expectBearer';

const csrfProtection = csrf({cookie: {signed: true}});

const app = express()
  .use(cors({origin: '*'}), cookieParser('vS5EPNVYB9ArN735v6RBzZ5hgVhvQDYL'))
  .get('/login', csrfProtection, loginGet)
  .post('/login', json(), csrfProtection, loginPost)
  .get('/register', csrfProtection, registerGet)
  .post('/register', json(), csrfProtection, registerPost)
  .get('/data', expectBearer, dataGet);

// Export express app
module.exports = app;

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}
