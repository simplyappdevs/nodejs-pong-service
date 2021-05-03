/**
 * App Imports
 */
import * as CONSTS from './app-constants';

/**
 * SimplyAppDevs Imports
 */
import {LogEntry, logger as loggerHelper} from '@simplyappdevs/logging-helper';

// initialize
loggerHelper.init(CONSTS.APPNAME);

// console out log for now
loggerHelper.setLoggerOutput((entry: LogEntry) => {
  console.log(JSON.stringify(entry));
});

// export
export default loggerHelper;