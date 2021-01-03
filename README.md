# version-app
## Initial Setup
Once the repo is cloned, running `npm i` to install all dependencies is required to be run to have a complete working setup for development.

## Running Locally
The application is built using Typescript/Node and uses express as the HTTP web framework. To run locally, the code needs to be transpiled from TS to JS by invoking `npm run build`. 

To quickstart, run `npm start` which will build the code and run the server.

## Testing
Jest is used as the unit testing framework. More tests need to be added but existing tests can be run and code validated using `npm test`.

## Deployment
[SemVer](https://semver.org/) is used to version the application and [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/#summary) are mandated using commit linting. [commitizen](https://github.com/commitizen/cz-cli) is used to guide developers through crafting usable commit messages. 

### CI Pipeline

The CI pipeline is built as a github action and runs on any push to `main` branch. It comprises of 3 stages:
 - *build* - pulls the code from github, runs tests, transpiles the code to JS and runs audit to check for security veulnerabilities.
 - *publish-npm* - creates a npm package of the transpiled code and publishes a new version to github npm package manager.
 - *publish-docker* - uses a multi-stage build to create a executable docker image of the transpiled code.


### Docker
The built docker image is published to github container registry and tagged as per semver and with the git sha the image is built from. The image can be pulled and executed by `docker run -d --name version-app ghcr.io/venkatramachandran/version-app:latest`

### K8S
The kubernetes script is in the `k8s` directory, named `k8s.sh`. Running the script creates a new namespace and deploys 3 replicas of the `version-app` image into the same namespace and creates a service for it.

## Issues to be noted
 - The git sha is embedded into the docker image as an arg as we erase git information from the docker image at build time. The application name and version are pulled from the `package.json` of the current version.
 - The CI pipeline runs `npm audit` to scan the node code for any vulnerabilities but is missing docker image scanning. (*Fixed*)
 - `DOKCER_TOKEN` is a token referred to in the pipeline which is a GitHub Personal Access Token generated as defined [here](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). This is needed because the default `GITHUB_TOKEN` does not have enough permissions to publish to `ghcr.io`. *This is a manual step in the whole setup.*
 - The `deployment.yaml` is incomplete because it is missing the secret to pull from `ghcr.io` as the images are private by default. *(Fixed-the images are public now)*
 - The CI pipeline has an unnecessary step of publishing the artifact to npm. This can be removed and only the docker image be published to ghcr. *(Fixed)*
 - The pipeline can be split into 2, one doing the testing+creating a new release in git and the other building+publishing the docker image.

## TODO
See [here](TODO.md) for a list of things that are incomplete.
