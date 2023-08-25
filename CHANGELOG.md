## vNext
* Convert the package to an ECMAScript module from CommonJS
* Add GitAnnexAPI methods
    * addunused
    * assist
    * clean
    * configremote
    * expire
    * export
    * forget
    * getBranchName
    * getRepositoryInfo
    * grep
    * import
    * pullAnx
    * pushAnx
    * satisfy
    * submodule
* Add GitAnnexAPI property
    * repositoryPath
* Add generic functions to return application-defined JavaScript objects
    * listFiles
* Add helper functions
    * chmodR
    * pathExists
* Support Git 2.38.0 features
    * Add LsFilesOptions --format
* Support git-annex 10.20230321 features
    * Deprecate getStatusAnx, isStatusAnx, statusAnx, StatusAnx, and StatusAnxOptions (documentation change only)
* Support git-annex 10.20230626 features
    * Add ConfigAnxOptions --for-file and --show-origin
    * Add ConfigremoteOptions --json and --json-error-messages
    * Add DeadOptions --json and --json-error-messages
    * Add DescribeAnxOptions --json and --json-error-messages
    * Add DropunusedOptions --json and --json-error-messages
    * Add EnableremoteOptions --json and --json-error-messages
    * Add ExpireOptions --json and --json-error-messages
    * Add InitAnxOptions --json and --json-error-messages
    * Add InitremoteOptions --json and --json-error-messages
    * Add MergeAnxOptions --json and --json-error-messages
    * Add ReinitOptions --json and --json-error-messages
    * Add RenameremoteOptions --json and --json-error-messages
    * Add SemitrrustOptions --json and --json-error-messages
    * Add UnannexOptions --json and --json-error-messages
    * Add UninitOptions --json and --json-error-messages
    * Add UntrustOptions --json and --json-error-messages
    * Add UnusedOptions --json and --json-error-messages
* Support git-annex 10.20230802 features
    * Add AnnexOptions --explain
    * Add DropunusedOptions --jobs
* Make GitAnnexAPI.sync parameter remotes optional
* Make options the fourth generic function parameter
    * getFinds
    * getLogs
    * getShows
    * getWhereis
* The spawn error message includes environment variables only when env is supplied in ApiOptions

## v2.2.0 released 2022-10-04
* Add GitAnnexAPI methods
    * getFileNames
    * getVersionAnx
    * getVersionGit
    * lsFiles
* Add helper functions
    * getLineStartingAsString
    * sysPath
    * sysPaths
* Support git-annex 10.20220624 features
    * Add InfoOptions --autoenable
* Support git-annex 10.20220724 features
    * Move AnnexOptions --backend to AddAnxOptions and SyncOptions
* Support git-annex 10.20220822 features
    * Add AddAnxOptions --dry-run

## v2.1.0 released 2022-07-07
* Add GitAnnexAPI method getBuildFlags
* Support Git 2.36.0 features
    * Add BranchOptions --recurse-submodules
    * Add FetchCommonOptions --refetch
    * Add LogOptions --exclude-first-parent-only
* Support Git 2.37.0 features
    * Add RevertOptions --reference
* Support git-annex 10.20220624 features
    * Add InitAnxOptions --autoenable and --no-autoenable and prexisting --version

## v2.0.0 released 2022-04-06
* Add GitAnnexAPI methods
    * addGit
    * adjust
    * branch
    * checkout
    * cherryPick
    * copy
    * dead
    * diff
    * drop
    * dropunused
    * fetch
    * find
    * forEachRef
    * get
    * getBranchNames
    * getTagNames
    * log
    * mergeAnx
    * mergeGit
    * mincopies
    * move
    * numcopies
    * pull
    * push
    * rebase
    * required
    * reset
    * restore
    * revert
    * revParse
    * semitrust
    * show
    * stash
    * switch
    * unannex
    * untrust
    * unused
    * whereis
    * whereused
* Add generic functions to return application-defined JavaScript objects
    * getBranches
    * getFinds
    * getLogs
    * getRefs
    * getShows
    * getTags
    * getWhereis
* Add Parser interface and implementations
    * parseBigInt
    * parseNumber
    * parseOptionalString
    * parseUnixDate
* Add type predicates
    * isBigInt
    * isDate
    * isRepositoryInfo
    * isStatusGit
* Additional command options in
    * AddAnxOptions
    * CloneOptions
    * CommitOptions
    * InfoOptions
    * InitGitOptions
    * LockOptions
    * RmOptions
    * StatusAnxOptions
    * SyncOptions
    * TagOptions
    * UnlockOptions
* Add ApiOptions.noOp flag
* Rename GitAnnexAPI.describe to describeAnx
* Make RepositoryInfo.trustLevel optional

## v1.0.0 released 2022-02-08
* Initial command set

## v1.0.0-beta released 2022-02-04
* Initial command set
