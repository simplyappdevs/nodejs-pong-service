/**
 * App Imports
 */
import {default as loggerHelper} from './logger';
import {default as httpServer} from './http-server';

(function () {
  loggerHelper.logDebug('MAINMODULE', 'main()', 'Starting application ...');

  httpServer();
})();