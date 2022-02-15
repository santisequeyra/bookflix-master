echo "node --version"
node --version
echo "npm --version" 
npm --version
echo "Installing client dependencies..."
cd bookflix-client/
npm install
echo "Installing server dependencies..."
cd ../bookflix-server/
npm install
echo "Done!"
