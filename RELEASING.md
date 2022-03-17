# Releasing

## Release Process

In order to release a new version of `actions-utils`, you will need to release a new npm package. The following steps will walk you through the process.

1. Bump the version in `package.json` as needed, e.g. - `0.0.1` -> `0.0.2`
2. Run `npm install` to update the package-lock file
3. Run `npm run build` to build compiled Typescript
4. Run `npm run docs` to update the documentation
5. Commit your changes and push with a meaningful release message, e.g. - `release 0.0.2`
6. Create a Pull Request and get it merged into `main`
7. For Googlers, follow the process at [go/npm-publish](http://go/npm-publish) to release the package to npm

## Updating Actions

To update the actions repositories you will need to update each repository with the lastest `actions-utils` version. To do this, you can use a tool like [ncu](https://www.npmjs.com/package/npm-check-updates) or manually update the package version for each repository. Follow the release process in each repository to create a new release.

Additionally, you can create an issue in the desired repo to bump the package version and mark it as blocking release.
