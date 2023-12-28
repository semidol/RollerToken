import { ethers } from "hardhat";
import { initialAddresses } from "../initialAddresses";

async function main () {
  const RollerToken = await ethers.getContractFactory('RollerToken');
  console.log('Deploying token...');
  const rollerToken = await RollerToken.deploy(initialAddresses);
  const addres = await rollerToken.getAddress();
  console.log('Token deployed to:', addres);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });