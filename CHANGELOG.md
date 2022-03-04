## vNext
* Add GitAnnexAPI methods
    * forEachRef
    * getTagNames
* Add generic functions to return application-defined JavaScript objects
    * getRefs
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
* Made RepositoryInfo.trustLevel optional

## v1.0.0 released 2022-02-08
* Initial command set

## v1.0.0-beta released 2022-02-04
* Initial command set
