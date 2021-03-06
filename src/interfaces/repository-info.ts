/**
 * TrustLevel defines the possible trust levels for a repository.
 */
export enum TrustLevel {
  Untrusted = 'untrusted',
  Semitrusted = 'semitrusted',
  Trusted = 'trusted',
}

/**
 * RepositoryInfo describes a repository.
 * @category Returned Objects
 */
export interface RepositoryInfo {

  /**
   * The unique identifier of the repository.
   */
  uuid: string;

  /**
   * The repository description.
   */
  description: string;

  /**
   * Current repository indicator.
   */
  here: boolean;

  /**
   * The repository trust level.
   */
  trustLevel?: TrustLevel;
}
