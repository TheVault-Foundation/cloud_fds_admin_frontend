# Fetch and checkout the latest code
echo "Fetch and checkout the lastest code on develop"
git fetch origin

git reset --hard origin/develop

# Instal dependencies
echo "Install dependencies"
yarn

# Build
echo "Build"
yarn build

# Deploy
echo "Deploy by PM2"
pm2 delete all
pm2 start