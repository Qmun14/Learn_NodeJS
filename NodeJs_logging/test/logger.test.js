import winston from 'winston';

test('creat new logger', () => {

  const logger = winston.createLogger({});

  logger.log({
    level: 'info',
    message: 'Hello Logging'
  });

});