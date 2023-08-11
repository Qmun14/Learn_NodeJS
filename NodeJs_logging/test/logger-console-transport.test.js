import winston from 'winston';

test('creat new logger with console transport', () => {

  /**
   * Todo: saat kita membuat logger minimal harus ada 1 transport agar tidak error logger nya
   */
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({})
    ]
  });

  logger.log({
    level: 'info',
    message: 'Hello Logging'
  });

});