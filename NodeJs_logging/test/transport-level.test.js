import winston from 'winston';

test('creat new logger with console & file transport level', () => {

  /**
   * Todo: saat kita membuat logger minimal harus ada 1 transport agar tidak error logger nya
   */
  const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({}),
      new winston.transports.File({
        filename: "application.log"
      }),
      new winston.transports.File({
        level: 'error',
        filename: "application-error.log"
      }),
    ]
  });

  logger.info('Hello World');
  logger.info('Hello Logging');
  logger.info('Hello Logging');
  logger.info('Hello Logging');
  logger.error('Hello Error');
  logger.error('Hello Error');
  logger.error('Hello Error');

});