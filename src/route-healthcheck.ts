/**
 * SimplyAppDevs Imports
 */
import {default as defaultLogger} from './logger';

// module logger
const logger = defaultLogger.createModuleLogger('HEALTHCHECK');

/**
 * Express Imports
 */
import {default as express} from 'express';

// router
const hcRouter = express.Router();

/**
 * Healthcheck default path
 */
hcRouter.get('/', (req, res) => {
  logger.logDebug('/', 'Received GET /');

  res.status(200).send('System is up and running');
});

/**
 * Healthcheck endpoint to randomly return error
 */
hcRouter.get('/testerror/:httpErrorCode?', (req, res) => {
  logger.logDebug('/', `Received GET /testerror/${req.params.httpErrorCode}`);

  switch (req.params.httpErrorCode) {
    case '404':
      res.status(404).send('Triggered HTTP 404');
      break;

    case '500':
      res.status(500).send('Triggered HTTP 500');
      break;

    default:
      res.status(400).send('Triggered HTTP 400');
      break;
  }
});

// return
export default hcRouter;