// We import Chai to use its asserting functions here.
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { initialAddresses } from "../initialAddresses";

describe("GLDToken", function () {
    const maxTotalSupply = 1000000;
    const initialMint = 100000;

    async function deployRollerTokenFixture() {

      const [owner, otherAccount] = await ethers.getSigners();

      const RollerToken = await ethers.getContractFactory("RollerToken");
      const token = await RollerToken.deploy(initialAddresses);

      return { token, owner, otherAccount };
    }

    describe("Deployment", function () {
      it("Should assign the initial supply of tokens to the addresses", async function () {
        const { token, owner } = await loadFixture(deployRollerTokenFixture);
        const initialSupply = (await token.totalSupply())/BigInt(initialAddresses.length);
        initialAddresses.map(async (item) => {
          expect(initialSupply).to.equal(await token.balanceOf(item));
        })
      });
    });

    describe('Mint', function () {
      it('Should mint', async function() {
        const { token, otherAccount } = await loadFixture(deployRollerTokenFixture);
        const mintValue = 10000n;
        const balance = await token.balanceOf(otherAccount.address);
        await token.mint(otherAccount.address, mintValue);
        expect(mintValue * 10n ** 18n + balance).to.equal(await token.balanceOf(otherAccount.address));
      });
      it(`Should not mint if total supply is more than ${maxTotalSupply}`, async function() {
        const { token, otherAccount } = await loadFixture(deployRollerTokenFixture);
        const mintValue = maxTotalSupply - initialMint * initialAddresses.length + 1;
        const balance = await token.balanceOf(otherAccount.address);
        await token.mint(otherAccount.address, mintValue);
        expect(balance).to.equal(await token.balanceOf(otherAccount.address));
      });
      it(`Should not mint if calling not by owner`, async function() {
        const { token, otherAccount } = await loadFixture(deployRollerTokenFixture);
        const mintValue = maxTotalSupply - initialMint * initialAddresses.length + 1;
        const balance = await token.balanceOf(otherAccount.address);
        try {
          await token.connect(otherAccount).mint(otherAccount.address, mintValue);
        } catch(e) {}
        expect(balance).to.equal(await token.balanceOf(otherAccount.address));
      });
    })

    describe('Burn', function () {
      it('Should burn from calling address', async function() {
        const { token, owner, otherAccount } = await loadFixture(deployRollerTokenFixture);

        const mintValue = 10000n;
        const ownerBalance = await token.balanceOf(owner.address);
        const otherAccBalance = await token.balanceOf(otherAccount.address);

        await token.mint(owner.address, mintValue);
        await token.mint(otherAccount.address, mintValue);

        await token.burn(mintValue);
        await token.connect(otherAccount).burn(mintValue);

        expect(ownerBalance).to.equal(await token.balanceOf(owner.address));
        expect(otherAccBalance).to.equal(await token.balanceOf(otherAccount.address));
      });
    })
});