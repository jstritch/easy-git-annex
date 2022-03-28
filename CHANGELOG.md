## vNext
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
