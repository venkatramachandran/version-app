import 'reflect-metadata';
import VersionService from '../src/version-service';

describe('Version Service', () => {
    let versionService: VersionService;
    
    beforeEach(() => {
        versionService = new VersionService();
    });

    it('returns a version object', () => {
        const retVal = versionService.getVersions();
        expect(retVal).toBeDefined();
    });
});
