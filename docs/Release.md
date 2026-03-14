# How to release

This is documenting the release process.

We're using [calendar versioning](https://calver.org/) where `YYYY.MM.DD` should be set accordingly.

```sh
VERSION=YYYY.MM.DD
```

## Update package.json and tag

Update the [package.json](../package.json) `version` to match the new release version.

```sh
sed --regexp-extended 's/"version": "(.+)"/"version": "'$VERSION'"/' --in-place package.json
```

Then commit and tag:

```sh
git commit -a -m ":bookmark: $VERSION"
git tag -a $VERSION -m ":bookmark: $VERSION"
```

Push everything including tags:

```sh
git push
git push --tags
```

## Publish to GitHub Pages

Deployment happens automatically on push to `main`, but can also be triggered manually via:

```sh
yarn deploy
```
