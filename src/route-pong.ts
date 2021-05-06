/**
 * SimplyAppDevs Imports
 */
import {default as defaultLogger} from './logger';

// module logger
const logger = defaultLogger.createModuleLogger('PONG');

/**
 * Express Imports
 */
import {default as express} from 'express';

// router
const hcPong = express.Router();

/**
 * Default route
 */
hcPong.get('/*', (req, res) => {
  logger.logDebug('/', 'Default route');

  const retVal = {
    method: req.method,
    hostName: req.hostname,
    ip: req.ip,
    baseURL: req.baseUrl,
    originalURL: req.originalUrl,
    params: JSON.stringify(req.params),
    cookies: JSON.stringify(req.cookies),
    headers: JSON.stringify(req.headers),
    body: req.body
  };

  res.status(200).json(retVal);
});


// export
export default hcPong;