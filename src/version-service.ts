import Version from './version';
import Application from './application';
import {injectable} from 'tsyringe';
import * as fs from 'fs';

@injectable()
export default class VersionService {
    constructor() {}
    public getVersions(): {[k: string]: Version[]} {
        const app: Application = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
        return {[app.name]: [new Version(app.version, process.env.gitsha || '', app.description)]};
    }
}