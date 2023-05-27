/**
 * TrustLevel defines the possible trust levels for a repository.
 */
export enum TrustLevel {

  /**
   * The repository is not trusted and could lose content at any time.
   */
  Untrusted = 'untrusted',

  /**
   * The default trust state.
   */
  Semitrusted = 'semitrusted',

  /**
   * The repository is trusted to not unexpectedly lose content. Use with care.
   */
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
