import { ethers } from "hardhat";

const addressesString = ['0xc55292a49c871452e0Ad9B12940Fb61ed9fef09F'];
const initialAddresses = addressesString.map((item) => ethers.getAddress(item));

export {initialAddresses}