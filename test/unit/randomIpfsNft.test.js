const { assert } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Random IPFS NFT Unit Tests", () => {
          let vrfCoordinatorV2Mock, randomIpfsNft, deployer

          beforeEach(async () => {
              await deployments.fixture(["mocks", "randomipfs"]) // Deploys modules with the tags mocks and randomipfs
              deployer = (await ethers.getSigners()).at(0)
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
              randomIpfsNft = await ethers.getContract("RandomIpfsNft")
          })

          describe("Constructor", () => {
              it("When initialized the token counter should be 0", async () => {
                  const tokenCounter = (await randomIpfsNft.getTokenCounter()).toString()
                  assert.equal(tokenCounter, "0")
              })
          })
      })
