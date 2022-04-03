Here are some suggestions to help you get started.

# Code

1. Please read .github/PULL_REQUEST_TEMPLATE.md before you begin.
1. Start your work on a new branch.
1. The linter, `npm run lint`, is your friend.
1. When you're done, submit a pull request.
1. I'll work with you to prepare for release.

# Tests

1. Update the tests as necessary.
1. The script `npm run test` runs all tests.
1. The script `npm run test:ci` skips the git-annex tests.
1. To view test coverage, use the command `npm run test:coverage`.

# Documentation

1. To regenerate the documentation, use the command `npm run typedoc`.

# How to add a command

1. Add an empty entry for the foo command in the appropriate src/helpers/command-options.ts map.
1. If the foo command has options, add interface FooOptions stub in src/interfaces/FooOptions.ts and export the interface in src/index.ts.
1. Add the foo method signature to src/interfaces/git-annex-api.ts.
1. Create the necessary stub test file(s) under tests/commands-*.
1. Implement the foo method in src/git-annex-accessor.ts.
1. One at a time, add any command options to FooOptions.ts, command-options.ts, and foo.test.ts (in the ApiOptions.noOp list).
1. Write tests to demonstrate the other parameters are correctly connected to the actual foo command.

# Testing easy-git-annex changes in your application

1. [Yalc](https://www.npmjs.com/package/yalc) may be installed globally to test your easy-git-annex changes in your application.
1. After building easy-git-annex wit the `npm run build` command, use the command `npm run yalc` to push the build.
1. Run `yalc add easy-git-annex` in your dependent project.
1. Rebuild your application and test normally.

# License

The easy-git-annex package uses the MIT license in LICENSE.md.
Your contribution is included as described by the
Contributor License Agreement in CLA.md.

# Help

You may contact me by e-mail, if desired.
Please use the address in package.json.
