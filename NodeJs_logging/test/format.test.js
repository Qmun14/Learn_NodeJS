import winston from 'winston';

test('Logging with printf format', () => {

  /**
   * Todo: -  saat kita membuat logger minimal harus ada 1 transport agar tidak error logger nya
   * Todo: -  default nya format logging  -> format: winston.format.json(), 
   */
  const logger = winston.createLogger({
    level: 'info',
    // format: winston.format.json(), 
    // format: winston.format.simple(),
    // format: winston.format.logstash(),
    format: winston.format.printf(log => {
      return `${new Date()} : ${log.level.toUpperCase()} : ${log.message}`;
    }),
    transports: [
      new winston.transports.Console({})
    ]
  });

  logger.info('Hello printf Format');
  logger.warn('Hello printf Format');
  logger.error('Hello printf Format');

});

test('Logging with format', () => {

  /**
   * Todo: -  saat kita membuat logger minimal harus ada 1 transport agar tidak error logger nya
   * Todo: -  default nya format logging  -> format: winston.format.json(), 
   */
  const logger = winston.createLogger({
    level: 'info',
    // format: winston.format.json(), 
    // format: winston.format.simple(),
    format: winston.format.logstash(),
    transports: [
      new winston.transports.Console({})
    ]
  });

  logger.log({
    level: 'info',
    message: 'Hello Format'
  });

});