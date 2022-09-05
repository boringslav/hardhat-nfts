const { assert, expect } = require("chai")
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
              it("Sets starting values correctly", async () => {
                  const tokenCounter = (await randomIpfsNft.getTokenCounter()).toString()
                  const dogTokenUriFirst = (await randomIpfsNft.getDogTokenUris(0)).toString()
                  assert(dogTokenUriFirst.includes("ipfs://"))
                  assert.equal(tokenCounter, "0")
              })
          })
          describe("requestNft", () => {
              it("fails if payment isn't sent with the request", async function () {
                  await expect(randomIpfsNft.requestNft()).to.be.revertedWith("NeedMoreETHSent")
              })
              it("emits an event and kicks off a random word request", async function () {
                  const fee = await randomIpfsNft.getMintFee()
                  await expect(randomIpfsNft.requestNft({ value: fee.toString() })).to.emit(
                      randomIpfsNft,
                      "NftRequested"
                  )
              })
          })
      })
