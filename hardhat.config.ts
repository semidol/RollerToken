import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const ALCHEMY_API_KEY = "knWAzTKEvy6gXgl4LVgVvC6-Nwp1VwQu"; //А на этот ключ мне все равно :)
const SEPOLIA_PRIVATE_KEY = "Здесь был ключ";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  }
};

export default config;
