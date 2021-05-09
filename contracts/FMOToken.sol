//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FMOToken is ERC20 {
  constructor(uint256 initialSupply) ERC20("Filipe Oliveira Token", "FMO") {
    _mint(msg.sender, initialSupply * (10 ** 18));
  }
}
