import { ethers } from "hardhat";
import { initialAddresses } from "../initialAddresses";

async function main () {
  const addressToken = '0x8aEc6Df1270Bd979666BFbDB1900784048887B6c';
  const token = await ethers.getContractAt("RollerToken", addressToken);
  await token.burn(10000);
  console.log(await token.balanceOf('0xc55292a49c871452e0Ad9B12940Fb61ed9fef09F'))
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });