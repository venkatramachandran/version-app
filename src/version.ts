export default class Version {
    constructor(private _version: string, private _gitSha: string, private _description: string) {}
    public get version() {
        return this._version;
    }

    public get gitSha() {
        return this._gitSha;
    }

    public get description() {
        return this._description;
    }

    public toJSON() {
        return {
            version: this._version,
            lastcommitsha: this._gitSha,
            description: this._description
        }
    }
}