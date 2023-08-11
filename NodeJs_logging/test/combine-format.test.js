import winston from 'winston';

test('Logging with combine format', () => {

  /**
   * Todo: -  saat kita membuat logger minimal harus ada 1 transport agar tidak error logger nya
   * Todo: -  default nya format logging  -> format: winston.format.json(), 
   */
  const logger = winston.createLogger({
    level: 'info',
    // format: winston.format.json(), 
    // format: winston.format.simple(),
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.Console({})
    ]
  });

  logger.info('Hello Format');
  logger.warn('Hello Format');
  logger.error('Hello Format');

});