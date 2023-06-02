echo Downloading git-annex
curl --max-time 120 --silent --output git-annex-standalone-amd64.tar.gz https://downloads.kitenet.net/git-annex/linux/current/git-annex-standalone-amd64.tar.gz

echo Installing git-annex
mkdir -p "$(systemd-path user-binaries)"
tar --extract --gzip --strip-components 1 --file=git-annex-standalone-amd64.tar.gz --directory "$(systemd-path user-binaries)"

echo Removing download
rm git-annex-standalone-amd64.tar.gz

echo installing easy-git-annex
npm ci
