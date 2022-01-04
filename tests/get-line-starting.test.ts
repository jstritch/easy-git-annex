import * as anx from '../src/index';

const versionOutput = `git-annex version: 8.20211118-g23ee48898
build flags: Assistant Webapp Pairing Inotify DBus DesktopNotify TorrentParser MagicMime Feeds Testsuite S3 WebDAV
dependency versions: aws-0.22 bloomfilter-2.0.1.0 cryptonite-0.26 DAV-1.3.4 feed-1.3.0.1 ghc-8.8.4 http-client-0.6.4.1 persistent-sqlite-2.10.6.2 torrent-10000.1.1 uuid-1.3.13 yesod-1.6.1.0
key/value backends: SHA256E SHA256 SHA512E SHA512 SHA224E SHA224 SHA384E SHA384 SHA3_256E SHA3_256 SHA3_512E SHA3_512 SHA3_224E SHA3_224 SHA3_384E SHA3_384 SKEIN256E SKEIN256 SKEIN512E SKEIN512 BLAKE2B256E BLAKE2B256 BLAKE2B512E BLAKE2B512 BLAKE2B160E BLAKE2B160 BLAKE2B224E BLAKE2B224 BLAKE2B384E BLAKE2B384 BLAKE2BP512E BLAKE2BP512 BLAKE2S256E BLAKE2S256 BLAKE2S160E BLAKE2S160 BLAKE2S224E BLAKE2S224 BLAKE2SP256E BLAKE2SP256 BLAKE2SP224E BLAKE2SP224 SHA1E SHA1 MD5E MD5 WORM URL X*
remote types: git gcrypt p2p S3 bup directory rsync web bittorrent webdav adb tahoe glacier ddar git-lfs httpalso borg hook external
operating system: linux x86_64
supported repository versions: 8
upgrade supported from repository versions: 0 1 2 3 4 5 6 7`;

describe('getLineStarting', () => {

  test('returns the entire line', () => {
    expect(anx.getLineStarting(versionOutput, 'git-annex version: ', true)).toBe('git-annex version: 8.20211118-g23ee48898');
  });

  test('returns the entire line when nothing follows the prefix', () => {
    expect(anx.getLineStarting(versionOutput, 'git-annex version: 8.20211118-g23ee48898', true)).toBe('git-annex version: 8.20211118-g23ee48898');
  });

  test('removes the prefix', () => {
    expect(anx.getLineStarting(versionOutput, 'remote types: ', false)).toBe('git gcrypt p2p S3 bup directory rsync web bittorrent webdav adb tahoe glacier ddar git-lfs httpalso borg hook external');
  });

  test('returns an empty string when nothing follows the prefix', () => {
    expect(anx.getLineStarting(versionOutput, 'operating system: linux x86_64', false)).toBe('');
  });

  test('returns null when the prefix does not exist', () => {
    expect(anx.getLineStarting(versionOutput, 'REMOTE TYPES: ', false)).toBeNull();
  });

});

describe('getLineStartingAsArray', () => {

  test('returns the array', () => {
    expect(anx.getLineStartingAsArray(versionOutput, 'upgrade supported from repository versions: ')).toHaveLength(8);
  });

  test('returns an empty string[] when nothing follows the prefix', () => {
    expect(anx.getLineStartingAsArray(versionOutput, 'operating system: linux x86_64')).toHaveLength(0);
  });

  test('throws when the prefix does not exist', () => {
    expect(anx.getLineStartingAsArray(versionOutput, 'REMOTE TYPES: ')).toBeNull();
  });

});
