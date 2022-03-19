## vNext
* Add GitAnnexAPI methods
    * addGit
    * branch
    * checkout
    * cherryPick
    * diff
    * fetch
    * forEachRef
    * getBranchNames
    * getTagNames
    * log
    * merge
    * pull
    * push
    * rebase
    * reset
    * restore
    * revert
    * revParse
    * show
    * stash
    * switch
* Add generic functions to return application-defined JavaScript objects
    * getBranches
    * getLogs
    * getRefs
    * getShows
    * getTags
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
