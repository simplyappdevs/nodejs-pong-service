/**
 * App Imports
 */
import * as CONSTS from './app-constants';

/**
 * SimplyAppDevs Imports
 */
import {default as defaultLogger} from './logger';

// module logger
const logger = defaultLogger.createModuleLogger('HTTPSERVER');

/**
 * Express Imports
 */
import {default as express, NextFunction, Request, Response} from 'express';

// HTTP server
const httpServer = express();

/**
 * App Routes
 */
import hcRouter from './route-healthcheck';
import hcPong from './route-pong';

/**
 * Start HTTP server
 */
const startServer = () => {
  try {
    logger.logDebug('startServer()', `Starting HTTP server on port ${CONSTS.PORT}`);

    httpServer.use(express.json()); // for parsing application/json
    httpServer.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

    // error middleware
    httpServer.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      logger.logError('startServer()', err);

      if (res.headersSent) {
        return next(err);
      }

      res.status(500).send(err.message);
    });

    // routes
    httpServer.use('/pong', hcPong);
    httpServer.use('/healthcheck', hcRouter)

    // default middleware
    httpServer.use((req: Request, res: Response) => {
      logger.logError('startServer()', `Undefined route ${req.path}`);

      res.status(500).send(`Route not found ${req.path}`);
    });

    httpServer.listen(CONSTS.PORT, () => {
      logger.logInfo('startServer()', `Starting HTTP server on port ${CONSTS.PORT}`);
    });
  } catch (e) {
    logger.logCriticalError('startServer()', e);
  }
};

// export
export default startServer;