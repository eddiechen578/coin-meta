import React, {useState, useEffect} from "react";
import useI18n from "@/hook/useI18n";
import {useSelector} from "react-redux";
import {AppState} from "@/store/rootStore";
import {useWeb3React} from '@web3-react/core';
import GameContractCompiled from "backend/build/contracts/GameContract.json";
import {AbiItem} from "web3-utils";
import Web3 from "web3";
import BigNumber from 'bignumber.js';
import {GameContract} from "meta-coin/types/web3-v1-contracts";
import DiceRoll from "@/components/DiceRoll/DiceRoll";

const Dice = () => {

    const {active, account, library, connector, activate, deactivate} = useWeb3React();
    const [playerBalance, setPlayerBalance] = useState<number>(0);
    const [web3, setWeb3] = useState<any>(null);
    const [contractInstance, setContractInstance] = useState<any>(null);
    const [coin, setCoin] = useState<string>("");
    const [wager, setWager] = useState<number>(1000000000000000);
    const [bet, setBet] = useState<number>(0);
    const [game, setGame] = useState([]);
    const [destiny, setDestiny] = useState<number>(0);
    const [jackpot, setJackpot] = useState<number>(0);
    const [msg, setMsg] = useState<string>("");
    const [bonusmsg, setBonusmsg] = useState<string>("");
    const [trigger, setTrigger] = useState<boolean>(false)
    const locales = useSelector((state: AppState) => state.localesReducer.locales);
    const {t} = useI18n({locales: locales});

    const gasPrice = '1000000000'
    const gasLimit = '100000'
    const gasRoll = '500000'

    // const wagerValue = [10000, 1000000, 10000000]
    useEffect(() => {

        if (library) {
            initContractInstance();
        }else{
            setPlayerBalance(0)
        }


    }, [library])


    useEffect(() => {

        async function getplayBalance() {

            contractInstance.methods.getBalance().call({from: account}).then((balance: number) => {

                setPlayerBalance(balance)
            });

            contractInstance.methods.getGame().call({from: account})
                .then((res: any) => {

                    setGame(res)
                })

            contractInstance.events.BalanceEvent().on('data', (event: any) => {
                const newBalance = event.returnValues.balance;
                setPlayerBalance(newBalance)
            })

            contractInstance.events.NewGameEvent().on('data', (event: any) => {
                const newGame = event.returnValues.game;

                setGame(newGame);
            })

            contractInstance.events.GameResult().on('data', (event: any) => {

                const destiny = event.returnValues.destiny;
                const wager = parseInt(event.returnValues.wager);
                const return_bet = parseInt(event.returnValues.bet);
                const balance = parseInt(event.returnValues.balance);
                const bonus = parseInt(event.returnValues.bonus);
                const is_bonus = parseInt(event.returnValues.is_bonus);
                const trigger = event.returnValues.trigger;

                setDestiny(destiny);
                setTrigger(trigger);
                setPlayerBalance(balance)
                const b = return_bet ? "Hi" : "Lo";

                setBonusmsg("");
                setMsg("");
                let timer = setTimeout(() => {
                    if (event.returnValues.result === "0") {
                        setMsg(`You Bet ${b} so you lose -${convert(wager)} Eth`)

                    } else {
                        setMsg(`You Bet ${b} so you win +${convert(wager)} Eth`)
                    }
                    if (is_bonus) {
                        if (event.returnValues.bonus_res == "0") {
                            setBonusmsg("Sorry, you did not win the jackpot.")
                        } else {
                            setBonusmsg(`Congrat, you  win the jackpot +${convert(bonus)}.`)
                        }
                    }
                }, 1000)

            })
        }

        if (contractInstance) {
            getplayBalance();
        }
    }, [contractInstance])

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

            setContractInstance(instance)

        }
    }

    async function deposit() {

        try{
            await contractInstance.methods.deposit().send({
                    gasPrice: gasPrice,
                    gas: gasLimit,
                    from: account, value: web3.utils.toWei(coin, "finney")
                }
            ).then((res: any)=>{
                setBonusmsg("")
            })
        }catch (error: any){
            setBonusmsg("invalid number value.")
        }

    }

    async function withdraw() {
        await contractInstance.methods.withdraw().send({
            from: account,
            gasPrice: gasPrice,
            gas: gasLimit
        })
    }



    function changeWager(method: string) {
        if (method == 'divide') {
            if (wager > 1000000000000000) {

                const newWager = Math.floor(wager / 2);

                setWager(newWager)
            }
        }

        if (method == 'multip') {
            const newWager = wager * 2;

            if (newWager < playerBalance) {
                setWager(newWager)
            }
        }

        if (method == 'max') {
            const firstDigit = parseInt(playerBalance.toString().charAt(0));
            const newWager = firstDigit * Math.pow(10, Math.floor(Math.log10(playerBalance)));

            setWager(newWager)
        }

    }

    function promiseBet(bet: number){
        return new Promise((resolve, reject)=>{

            setBet(bet);

            resolve(bet);
        })
    }

    async function betLo() {

        promiseBet(0).then((result: any)=>{

            const bigNumberValue = new BigNumber(wager);

            contractInstance.methods.roll(jackpot, result, bigNumberValue.toString(), trigger).send({
                from: account,
                gasPrice: gasPrice,
                gas: gasRoll
            })
                .then()
                .catch((err: any) => {
                    console.log(err)
                })
        })

    }

    async function betHi(){

        const bigNumberValue = new BigNumber(wager);
        promiseBet(1).then((result: any)=>{
            contractInstance.methods.roll(jackpot, result, bigNumberValue.toString(), trigger).send({
                from: account,
                gasPrice: gasPrice,
                gas: gasRoll
            })
                .then()
                .catch((err: any) => {
                    console.log(err)
                })
        })
    }


    function convert(num: number) {
        return (num / 1000000000000000000).toFixed(3);
    }

    return (
        <div
            className=" p-10 text-center w-full flex-col-reverse flex lg:grid lg:grid-cols-3 lg:mt-12 lg:text-left">
            <div className="text-white bg-green-700 z-10 lg:group border border-neutral-700 px-5 py-4 ">
                <div className="bg-green-950 shadow-md rounded-md p-4 mb-3">
                    <header className=" border-b-2 border-gray-200 mb-4 pb-4">
                        <h2 className="text-xs font-semibold text-white lg:text-lg">
                            {`${t('balance')}: ${convert(playerBalance)} ETH`}
                        </h2>
                    </header>
                    <div className=" border-b-2 p-1 lg:justify-between lg:flex lg:p-5">
                        <div className="text-white pb-3 lg:pb-0">
                            {`${t('deposit')}:`}
                        </div>
                        <div className="pb-3 pr-1 lg:pb-0">
                            <input type="number"
                                   onChange={(e) => {
                                       setCoin(e.target.value)
                                   }}
                                   className="appearance-none w-44 bg-green-700 border-2 rounded-md text-white px-2 py-0"/>
                        </div>
                        <span onClick={deposit}
                              className="cursor-pointer bg-yellow-300 text-gray-700 py-1 px-3 text-sm font-medium">
                                         {`${t('confirm')}`}
                        </span>

                    </div>
                    <div className="mt-3">
                                 <span
                                     onClick={withdraw}
                                     className="cursor-pointer bg-yellow-300 text-gray-700 py-1 px-2  text-sm font-medium">
                                       {`${t('withdraw')}`}
                                </span>
                    </div>
                </div>
                <div className="bg-green-950 shadow-md rounded-md p-4 mb-3">
                    <header className="lg:flex lg:justify-between border-b-2 border-gray-200 mb-4 pb-4 ">
                        <h2 className="flex text-xs lg:text-lg font-semibold text-white">
                            {t('wager')}
                        </h2>
                        <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
                                    <span onClick={() => {
                                        changeWager('divide')
                                    }}
                                          className="cursor-pointer bg-yellow-300 text-gray-700 py-1 px-2  text-sm font-medium">
                                         {t('/2')}
                                    </span>
                            <span onClick={() => {
                                changeWager('multip')
                            }}
                                  className="cursor-pointer bg-yellow-300 text-gray-700 py-1 px-2  text-sm font-medium">
                                       {t('*2')}
                                    </span>
                            <span onClick={() => setWager(1000000000000000)}
                                  className="cursor-pointer bg-yellow-300 text-gray-700 py-1 px-2  text-sm font-medium">
                                       {t('min')}
                                    </span>
                            <span onClick={() => changeWager('max')}
                                  className="cursor-pointer bg-yellow-300 text-gray-700 py-1 px-2  text-sm font-medium">
                                       {t('max')}
                                    </span>
                        </div>
                    </header>
                    <div className="text-white">
                        <p>{convert(wager)}</p>
                    </div>
                </div>
                <div className="bg-green-950 shadow-md rounded-md p-4">

                    <div className="text-center mb-2">
                        <p>
                            ({t('bet')})
                        </p>
                    </div>

                </div>

            </div>
            <div className="lg:group bg-green-700 border  border-gray-400 px-5 py-4">
                <div className="bg-green-950 shadow-md rounded-md p-4 mb-3">
                    <header className="border-b-2 border-gray-200 mb-4 pb-4 ">
                        <h2 className="text-xs lg:text-lg font-semibold text-white">
                            {/*{`${t('wager')}: 0.000001`}*/}
                            {
                                game[2] ? `${t('wager')}: ${convert(game[1])}` : ``
                            }
                        </h2>
                    </header>
                    <div className="text-white">
                        {/*<p>{`${t('betLo')}`}</p>*/}
                        <p>
                            {
                                game[2] ? game[0] === "1" ? `${t('betHi')}` : `${t('betLo')}` : ''
                            }
                        </p>
                    </div>
                </div>
                <div className="flex flex-col h-80 justify-items-start">
                    {
                        msg !== "" ?
                            <div className="flex items-center justify-center flex-1 bg-green-300">
                                <p className="font-bold text-black">
                                    {msg}
                                </p>
                            </div> :
                            ""
                    }
                    {
                        bonusmsg != "" ?
                            <div className="flex items-center justify-center flex-1 bg-gray-200">
                                <p className="font-bold text-red-500">
                                    {bonusmsg}
                                </p>
                            </div> :
                            ""
                    }
                    <div className="flex items-center justify-center flex-1">
                        <p className="font-bold text-gray-50">
                            {
                                `${t('result')}:`
                            }
                        </p>
                        <DiceRoll trigger={trigger} num={destiny}/>
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                                     <span onClick={betLo}
                                           className="cursor-pointer  bg-yellow-300 h-20 w-28 text-center text-gray-700 py-7 px-2 text-lg font-semibold font-bold">
                                                {t('betLo')}
                                    </span>
                        <span onClick={betHi}
                              className="cursor-pointer  bg-yellow-300 h-20 w-28 text-center text-gray-700 py-7 px-2 text-lg font-semibold font-bold">
                                                {t('betHi')}
                                    </span>
                    </div>
                </div>
            </div>

            <div className="lg:group bg-green-700 border flex-col border-gray-400 px-3 py-4">
                <div className="text-center text-gray-50">
                    {t('jackpot')}
                </div>
                <div className="bg-green-950 shadow-md rounded-md p-4 mb-3">
                    <header className="flex justify-between border-b-2 border-gray-200 mb-4 pb-4 ">
                        <h2 className="text-xs lg:text-lg font-semibold text-white">
                            {t('jackpot_option')}
                        </h2>
                        <h2 className="text-xs lg:text-lg font-semibold text-white">
                            {t('jackpot_prize')}
                        </h2>
                        <h2 className="text-xs lg:text-lg font-semibold text-white">
                            {t('jackpot_cost')}
                        </h2>
                    </header>
                    <div className="text-white">
                        <ul className="flex justify-between">
                            <li>
                                <input
                                    checked={jackpot === 1}
                                    onChange={(e) => {
                                        setJackpot((prevState) =>
                                            prevState == 1 ? 0 : 1
                                        )
                                    }}
                                    type="checkbox"/>
                            </li>
                            <li>
                                {`${convert(5000000000000000)}`}
                            </li>
                            <li>
                                {`${convert(1000000000000000)}`}
                            </li>
                        </ul>
                    </div>
                    <div className="text-white">
                        <ul className="flex justify-between">
                            <li>
                                <input
                                    checked={jackpot === 2}
                                    onChange={(e) => {
                                        setJackpot((prevState) =>
                                            prevState == 2 ? 0 : 2
                                        )
                                    }}
                                    type="checkbox"/>
                            </li>
                            <li>
                                {`${convert(50000000000000000)}`}
                            </li>
                            <li>
                                {`${convert(10000000000000000)}`}
                            </li>
                        </ul>
                    </div>
                    <div className="text-white">
                        <ul className="flex justify-between">
                            <li>
                                <input
                                    checked={jackpot === 3}
                                    onChange={(e) => {
                                        setJackpot((prevState) =>
                                            prevState == 3 ? 0 : 3
                                        )
                                    }}
                                    type="checkbox"/>
                            </li>
                            <li>
                                {`${convert(500000000000000000)}`}
                            </li>
                            <li>
                                {`${convert(100000000000000000)}`}
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dice;