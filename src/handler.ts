import {Request, Response} from 'express';
import { injectable } from 'tsyringe';
import VersionService from './version-service';

@injectable()
export default class VersionHandler {
    constructor(private versionService: VersionService) {}

    public get(_req: Request, res: Response) {
        const version = this.versionService.getVersions();
        res.status(200).json(version);
    }
}
