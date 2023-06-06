import Layout from "@/layout/Layout";
import React, {useState, useEffect, useMemo} from "react";

import {useWeb3React} from '@web3-react/core';
import GameContractCompiled from "backend/build/contracts/GameContract.json";
import {AbiItem} from "web3-utils";
import Web3 from "web3";
import {GameContract} from "meta-coin/types/web3-v1-contracts";

let PageSize = 9;
export default function Home() {

    const {active, account, library, connector, activate, deactivate} = useWeb3React();
    const [web3, setWeb3] = useState<any>(null);
    const [address, setAddress] = useState<string>("");
    const [contractInstance, setContractInstance] = useState<any>(null);
    const [ownerBalance, setOwnerBalance] = useState<number>(0);
    const [owner, setOwner] = useState<boolean>(false);
    const [coin, setCoin] = useState<string>("");
    const [withDraw, setWithDraw] = useState<string>("");
    const [events, setEvents] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const gasPrice = '1000000000'
    const gasLimit = '100000'

    useEffect(() => {

        if (library) {
            initContractInstance();
        }

    }, [library])


    useEffect(() => {

        if (contractInstance) {
            getOwnerInit();
        }

    }, [contractInstance, account])

    useEffect(() => {

        async function getOwnerBalance() {
            contractInstance.methods.getOwnerBalance().call({from: account})
                .then((balance: number) => {
                    setOwnerBalance(balance)
                });


            contractInstance.events.OwnerBalanceEvent().on('data', (event: any) => {
                const newBalance = event.returnValues.balance;
                setOwnerBalance(newBalance)
            })

        }

        if (owner) {
            getOwnerBalance();
        }

    }, [owner])


    const currentEvents: any = useMemo(() => {

        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return events.slice(firstPageIndex, lastPageIndex);
    }, [events, currentPage])

    async function initContractInstance() {
        if (window.ethereum) {

            const web3 = new Web3(window.ethereum);
            setWeb3(web3);
            await window.ethereum.enable();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = (GameContractCompiled.networks as any)[networkId];

            const instance = new web3.eth.Contract(
                GameContractCompiled.abi as AbiItem[],
                deployedNetwork?.address
            ) as unknown as GameContract;

            setAddress(deployedNetwork?.address);

            setContractInstance(instance)


        }
    }

    async function getOwnerInit() {

        await contractInstance.methods.isOwner().call({from: account})
            .then((res: any) => {
                setOwner(res)
            })
    }

    async function ownerDeposit() {
        await contractInstance.methods.ownerDeposit().send({
            from: account,
            gasPrice: gasPrice,
            gas: gasLimit,
            value: web3.utils.toWei(coin, "finney")}
        );
    }

    async function ownerWithdraw() {
        await contractInstance.methods.ownerWithdraw(web3.utils.toWei(withDraw, "finney")).send({
            from: account,
            gasPrice: gasPrice,
            gas: gasLimit
        });
    }

    async function deleteContract(){
        let y = confirm('確定要刪除');

        if(y){
            await contractInstance.methods.deleteContract().send({from: account});
        }else{
            return;
        }
    }

    async function historyEvents() {
        const filterOptions = {
            address: address,
            fromBlock: 0,
            toBlock: 'latest',
        };

        contractInstance.getPastEvents('GameResult', filterOptions, function (error: any, pastEvents: any) {

            setEvents(pastEvents.reverse());
        })
    }

    function handlePrev() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function handleNext() {

        const totalPageCount = Math.ceil(events.length / PageSize);
        if (currentPage !== totalPageCount) {
            setCurrentPage(currentPage + 1)
        }
    }

    function convert(num: number){
        return (num / 1000000000000000000).toFixed(3);
    }

    if (!owner) {
        return (
            <>
                <Layout>

                </Layout>
            </>
        )
    }

    return (
        <>
            <Layout>
                <div
                    className=" p-10 text-center w-full flex-col flex">
                    <div className="text-white bg-green-700 z-10 lg:group border border-neutral-700 px-5 py-4 ">
                        <div className="bg-green-950 shadow-md rounded-md p-4 mb-3">
                            <header className=" border-b-2 border-gray-200 mb-4 pb-4">
                                <h2 className="text-xs font-semibold text-white lg:text-lg">
                                    {`${convert(ownerBalance)} ETH`}
                                </h2>
                            </header>
                            <div className=" border-b-2 p-1 lg:justify-between lg:flex lg:p-5">
                                <div className="text-white pb-3 lg:pb-0">
                                </div>
                                <div className="pb-3 pr-1 lg:pb-0">
                                    <input type="number"
                                           onChange={(e) => {
                                               setCoin(e.target.value)
                                           }}
                                           className="appearance-none w-44 bg-green-700 border-2 rounded-md text-white px-2 py-0"/>
                                </div>
                                <span
                                    onClick={ownerDeposit}
                                    className="cursor-pointer bg-yellow-300 text-gray-700 py-1 px-2 text-sm font-medium">
                                    存入
                                </span>

                            </div>
                            <div className=" border-b-2 p-1 lg:justify-between lg:flex lg:p-5">
                                <div className="text-white pb-3 lg:pb-0">
                                </div>
                                <div className="pb-3 pr-1 lg:pb-0">
                                    <input type="number"
                                           onChange={(e) => {
                                               setWithDraw(e.target.value)
                                           }}
                                           className="appearance-none w-44 bg-green-700 border-2 rounded-md text-white px-2 py-0"/>
                                </div>
                                <span
                                    onClick={ownerWithdraw}
                                    className="cursor-pointer bg-yellow-300 text-gray-700 py-1 px-2 text-sm font-medium">
                                    提取
                                </span>
                            </div>
                            <div className=" border-b-2 p-1 lg:justify-center lg:flex lg:p-5">
                                <span
                                    onClick={deleteContract}
                                    className="cursor-pointer bg-yellow-300 text-gray-700 py-1 px-2 text-sm font-medium">
                                    刪除合約
                                </span>
                            </div>
                        </div>
                        <div className="bg-green-950 shadow-md rounded-md p-4 mb-3">
                            <div className="flex justify-between">
                             <span onClick={handlePrev}
                                   className="cursor-pointer bg-yellow-300 text-gray-700 py-1 px-2 text-sm font-medium">
                                  Prev
                             </span>
                                <span
                                    onClick={historyEvents}
                                    className="cursor-pointer bg-yellow-300 text-gray-700 py-1 px-2 text-sm font-medium">
                                   歷史事件紀錄
                             </span>
                                <span onClick={handleNext}
                                      className="cursor-pointer bg-yellow-300 text-gray-700 py-1 px-2 text-sm font-medium">
                                 Next
                             </span>
                            </div>
                            <header className="grid grid-cols-4 gap-4 lg:flex lg:justify-between border-b-2 border-gray-200 mb-4 pb-4 ">
                                <h2 className="text-xs lg:text-lg font-semibold text-white">
                                    Account
                                </h2>
                                <h2 className="text-xs lg:text-lg font-semibold text-white">
                                    Wager
                                </h2>

                                <h2 className="text-xs lg:text-lg font-semibold text-white">
                                    Bet
                                </h2>
                                <h2 className="text-xs lg:text-lg font-semibold text-white">
                                    Destiny
                                </h2>
                                <h2 className="text-xs lg:text-lg font-semibold text-white">
                                    Result
                                </h2>
                                <h2 className="text-xs lg:text-lg font-semibold text-white">
                                    Is_bonus
                                </h2>
                                <h2 className="text-xs lg:text-lg font-semibold text-white">
                                    Bonus
                                </h2>
                                <h2 className="text-xs lg:text-lg font-semibold text-white">
                                    Bonus_res
                                </h2>

                                <h2 className="text-xs lg:text-lg font-semibold text-white">
                                    Date
                                </h2>
                                <h2 className="text-xs lg:text-lg font-semibold text-white">
                                    Summary
                                </h2>
                            </header>
                            {
                                currentEvents.length > 0 ?
                                    currentEvents.map((data: any, key: number) => {
                                        const date = new Date(data.returnValues[9] * 1000);
                                        const year = date.getFullYear();
                                        const month = String(date.getMonth() + 1).padStart(2, '0');
                                        const day = String(date.getDate()).padStart(2, '0');
                                        let summary: number = 0;
                                        let div;
                                        if(data.returnValues[5] == 0){
                                            summary += Number(convert(data.returnValues[1]));
                                            div = (
                                                <div className="white_line w-56 lg:w-24">
                                                    {summary}
                                                </div>
                                            )
                                        }else {
                                            summary -= Number(convert(data.returnValues[1]));
                                            div = (
                                                <div className="text-red-500 white_line w-56 lg:w-24">
                                                    {summary}
                                                </div>
                                            )
                                        }
                                        return (
                                            <div className="flex-grow text-white" key={key}>
                                                <div className="pb-5 grid grid-cols-4 gap-4 lg:grid-cols-10 lg:gap-10">
                                                    <div className="mr-1 w-auto lg:w-32 truncate " style={{"direction": "rtl"}}>
                                                        {data.returnValues[0]}
                                                    </div>

                                                    <div>
                                                        {convert(data.returnValues[1])}
                                                    </div>

                                                    <div>
                                                        {data.returnValues[2]}
                                                    </div>
                                                    <div>
                                                        {data.returnValues[3]}
                                                    </div>
                                                    <div>
                                                        {data.returnValues[5]}
                                                    </div>
                                                    <div>
                                                        {data.returnValues[6]}
                                                    </div>
                                                    <div>
                                                        {convert(data.returnValues[7])}
                                                    </div>
                                                    <div>
                                                        {data.returnValues[8]}
                                                    </div>

                                                    <div className="white_line w-40 lg:w-24">
                                                        {`${year}/${month}/${day}`}
                                                    </div>

                                                    <div className=" w-56 lg:w-24">
                                                        {div}
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })
                                    : ""
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}