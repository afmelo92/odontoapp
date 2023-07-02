import { Server as HTTPServer } from 'http';
import { Application, json, urlencoded } from 'express';
import helmet from 'helmet';
import router from './routes';
import corsHandler from './middlewares/CORSHandler';
import errorHandler from './middlewares/ErrorHandler';
import logger from './utils/logger';

type ServerProps = {
  app: Application;
  port: number;
};

class Server {
  public app: Application;
  private port: number;
  private server: HTTPServer | null;

  constructor({ app, port = 3333 }: ServerProps) {
    this.app = app;
    this.port = port;
    this.server = null;
  }

  public async init(): Promise<HTTPServer> {
    this.routesSetup();
    return this.listen(() => {
      if (process.env.NODE_ENV !== 'test') {
        logger.log({
          level: 'info',
          message: `Listening at ${this.port}`,
        });
      }
    });
  }

  private listen(cb: () => void): HTTPServer {
    return (this.server = this.app.listen(this.port, cb));
  }

  private routesSetup(): void {
    this.app.use(helmet());
    this.app.use(corsHandler);
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(router);
    this.app.use(errorHandler);
  }

  public close() {
    this.server?.close(() => {
      if (process.env.NODE_ENV !== 'test') {
        logger.log({
          level: 'info',
          message: `closing connections...`,
        });
      }
    });
    process.exitCode = 0;
  }
}

export default Server;
