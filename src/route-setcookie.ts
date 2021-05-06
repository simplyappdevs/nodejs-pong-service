/**
 * SimplyAppDevs Imports
 */
import {default as defaultLogger} from './logger';

// module logger
const logger = defaultLogger.createModuleLogger('SETCOOKIE');

/**
 * Express Imports
 */
import {default as express} from 'express';

// router
const hcSetCookie = express.Router();

/**
 * set cookie
 */
hcSetCookie.put(['/:cookiename/:cookievalue/session/:expiry(\d+)?', '/:cookiename/:cookievalue/sessionless'], (req, res) => {
  logger.logDebug('put(/:cookiename)', `Set cookie ${req.path}`);

  const cookieName = req.params.cookiename || '';
  const cookieValue = req.params.cookievalue || '';
  const isSessionLess = req.url.toLowerCase().endsWith('sessionless');
  const expiry = req.params.expiry || '60';

  if (cookieName === '') {
    return res.status(400).send('Missing cookie name');
  }

  if (isSessionLess) {
    res.cookie(cookieName, cookieName, {expires: undefined});
  } else {
    const exp = new Date();
    exp.setSeconds(exp.getSeconds() + Number.parseInt(expiry));

    res.cookie(cookieName, cookieValue, {expires: exp});
  }

  res.status(200).send('OK');
});

// export
export default hcSetCookie;