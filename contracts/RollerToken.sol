// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RollerToken is ERC20, Ownable {
  uint constant maxTotalSupply = 1000000;
  uint constant initialMint = 100000;

  constructor(address[] memory initialAddresses)
      ERC20("RollerToken", "RTK")
      Ownable(msg.sender)
  {
    {
      for (uint i=0; i<initialAddresses.length; i++) {
        if ((maxTotalSupply / initialMint) > (i + 1))
          _mint(initialAddresses[i], 100000 * 10 ** decimals());
      }
    }
  }

  function mint(address to, uint256 amount) public onlyOwner() {
    if (amount * 10 ** decimals() + totalSupply() <= maxTotalSupply * 10 ** decimals()) {
      _mint(to, amount * 10 ** decimals());
    }
  }

  function burn(uint256 value) public {
    _burn(msg.sender, value * 10 ** decimals());
  }
}