/**
 * JSON parser middleware
 * @returns {import('express').Handler}
 */
export const json
  = () =>
  /**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
   */
    async (req, _res, next) => {
      try {
        let body = '';
        for await (const chunk of req) {
          body += chunk;
        }

        req.body = JSON.parse(body);
        next();
      } catch (error) {
        next(error);
      }
    };
