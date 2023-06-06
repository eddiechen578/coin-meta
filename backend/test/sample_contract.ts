const Sample = artifacts.require("GameContract");

contract("GameContract", function (accounts) {
    it("...start test.", async function () {
        const simpleStorageInstance = await Sample.deployed();
        const accounts = await web3.eth.getAccounts();
        // Set value of 89
        // await simpleStorageInstance.set(89, {from: accounts[1]});

        // Get stored value
        // const storedData = await simpleStorageInstance.get();
        // @ts-ignore

        // await simpleStorageInstance.deposit({value: web3.utils.toWei("10", "ether" ), from: accounts[1]});
        //
        // const int = web3.utils.fromWei(await simpleStorageInstance.getBalance());
        // @ts-ignore
        // console.log(int)

        // @ts-ignore
        // await simpleStorageInstance.roll({from: accounts[0]})
        //     .then((res)=>{
        //         console.log(res)
        //     })


        // const tx = await simpleStorageInstance.roll({from: accounts[0]});
        // const result = await simpleStorageInstance.methods.roll().send({ from: accounts[0] });
        // console.log(result.events.BetResult.returnValues.currentBet);


        // await simpleStorageInstance.transferToOwner("0x3ffb58c4a612d2eee66e6e3e95d26affcab6a45b");
        // assert.equal(int.toString(), "10", "The value  was not equal.");
    });
});