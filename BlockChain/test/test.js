const { expect } = require("chai");

describe("SimpleStorage", function () {
  it("Should return the new value once it's changed", async function () {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.deployed();

    await simpleStorage.set(42);
    expect(await simpleStorage.get()).to.equal(42);
  });
});
