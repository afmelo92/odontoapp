import { format, transports, createLogger } from 'winston';
const { combine, timestamp, json, prettyPrint, simple } = format;

const logger = createLogger({
  format: combine(json(), timestamp(), prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `./logs/default.log`,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: simple(),
    })
  );
}

export default logger;
