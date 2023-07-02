import { format, transports, createLogger } from 'winston';
const { combine, timestamp, json, prettyPrint } = format;

const logger = createLogger({
  format: combine(json(), timestamp(), prettyPrint()),
  transports: [new transports.Console()],
});

if (process.env.NODE_ENV === 'production') {
  logger.add(
    new transports.File({
      filename: `./logs/default.log`,
    })
  );
}

export default logger;
