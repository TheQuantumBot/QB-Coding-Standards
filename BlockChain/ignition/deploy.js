// ignition/deploy.js
const { deployment } = require('@nomicfoundation/hardhat-ignition');

deployment('SimpleStorage Deployment', async ({ ethers, deployments }) => {
  // Get the contract factory for SimpleStorage
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");

  // Deploy the SimpleStorage contract
  const simpleStorage = await SimpleStorage.deploy();

  // Wait for the deployment to be mined
  await simpleStorage.deployed();

  console.log("SimpleStorage deployed to:", simpleStorage.address);

  // Store the deployment address for later use
  await deployments.save('SimpleStorage', {
    address: simpleStorage.address,
    abi: SimpleStorage.interface.format('json'),
  });
});
