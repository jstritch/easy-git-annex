## vNext
* Support git-annex 10.20220624 features
    * Add InfoOptions --autoenable
* Support git-annex 10.20220724 features
    * Move AnnexOptions --backend to AddAnxOptions and SyncOptions

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
