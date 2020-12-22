import express, {Express} from 'express';
import {Request, Response} from 'express';
import compression from 'compression';
import { injectable } from 'tsyringe';
import VersionHandler from './handler';
import {config} from 'dotenv';

@injectable()
export default class VersionApp {
    private app: Express;

    constructor(private versionHandler: VersionHandler) {
        this.app = express();
        config();
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('listen_ip', process.env.LISTEN_IP || '0.0.0.0');
        this.app.use(compression());
        this.app.use(express.json());

        this.app.get('/version', (req: Request, res: Response) => {
            this.versionHandler.get(req, res);
        });
    }

    public get versionApp() {
        return this.app;
    }

    public start() {
        this.app.listen(this.app.get('port'), this.app.get('listen_ip'), () => {
            console.log(
                '  App is running at http://%s:%d in %s mode',
                this.app.get('listen_ip'),
                this.app.get('port'),
                this.app.get('env')
            );
            console.log('  Press CTRL-C to stop\n');
          });
    }
}
