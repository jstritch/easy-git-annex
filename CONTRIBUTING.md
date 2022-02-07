# Code

Read .github/PULL_REQUEST_TEMPLATE.md before you begin.
Start your work on a new branch.
Run the linter, `npm run lint`, frequently.
When you're done, submit a pull request.
I'll work with you to prepare for release.

# Tests

Update the tests as necessary.
The script `npm run test:ci` skips the git-annex tests.
To view test coverage, use the command
`npm run test:coverage`.

# Documentation

Running typedoc identifies missing exports.
To run typedoc, use the command
`npm run typedoc`.

# Yalc

[Yalc](https://www.npmjs.com/package/yalc)
may be installed globally to test your changes in your application.
After building easy-git-annex, use the command
`npm run yalc` to push the build.
Then rebuild your application.

# License

The easy-git-annex package uses the MIT license in LICENSE.md.
Your contribution is included as described by the
Contributor License Agreement in CLA.md.

# Help

You may contact me by e-mail, if desired.
Please use the address in package.json.
