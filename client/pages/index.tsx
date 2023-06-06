import Image from 'next/image'
import {Inter} from 'next/font/google'
import React, {useEffect, useState} from "react";
import useI18n from "@/hook/useI18n";
import {useSelector} from "react-redux";
import Web3 from "web3";
import {AbiItem} from "web3-utils";
import {SampleContract} from "backend/types/web3-v1-contracts/SampleContract";
import Layout from "@/layout/Layout";
import Dice from "@/components/Dice/Dice";
import styles from "@/styles/animation.module.css"
import {AppState} from "@/store/rootStore";

const inter = Inter({subsets: ['latin']})
export default function Home() {

    const locales = useSelector((state: AppState) => state.localesReducer.locales);
    const {t} = useI18n({locales: locales});
    // useEffect(() => {
    //     const web3Init = async () => {
    //         if (window.ethereum) {
    //             const web3 = new Web3(window.ethereum);
    //             await window.ethereum.enable();
    //             const accounts = await web3.eth.getAccounts();
    //             const networkId = await web3.eth.net.getId();
    //             const deployedNetwork = (SampleContractCompiled.networks as any)[networkId];
    //
    //             const instance = new web3.eth.Contract(
    //                 SampleContractCompiled.abi as AbiItem[],
    //                 deployedNetwork?.address
    //             ) as unknown as SampleContract;
    //
    //             // @ts-ignore
    //             // await instance.methods.deposit().send({from: accounts[0], value: web3.utils.toWei("10", "ether" )});
    //
    //             const balance = await instance.methods.getBalance().call();
    //
    //         }
    //     }

    // web3Init().catch(console.log)
    // })

    return (
        <>
            <Layout>
                <div className="bg-gray-50">

                    <div className="text-center mt-10 h-32">
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            roll the dice and <p className="text-blue-600">WIN ETH!</p>
                        </h2>
                        <code className="font-mono font-bold">{t('home')}</code><br/>
                        <code className="font-mono font-bold">{t('content')}</code>
                    </div>
                    <div className="mt-10 ml-2 p-5 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
                       <div className="group mt-2 lg:ml-2 rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
                            <h2 className={`mb-3 text-2xl font-semibold`}>
                                Balance{' '}
                                <span
                                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            </span>
                            </h2>
                            <p className={`m-0 text-sm opacity-50`}>
                                {t('content1')}
                            </p>
                       </div>
                        <div className="group mt-2 lg:ml-2 rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
                            <h2 className={`mb-3 text-2xl font-semibold`}>
                                Bet{' '}
                                <span
                                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            </span>
                            </h2>
                            <p className={`m-0 text-sm opacity-50`}>
                                {t('content2')}
                            </p>
                        </div>

                        <div className="group mt-2 lg:ml-2 rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
                            <h2 className={`mb-3 text-2xl font-semibold`}>
                                Bonus{' '}
                                <span
                                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            </span>
                            </h2>
                            <p className={`m-0 text-sm opacity-50`}>
                                {t('content3')}
                            </p>
                        </div>

                        <div className="group mt-2 lg:ml-2 rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
                            <h2 className={`mb-3 text-2xl font-semibold`}>
                                Gas{' '}
                                <span
                                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            </span>
                            </h2>
                            <p className={`m-0 text-sm opacity-50`}>
                                {t('content4')}
                            </p>
                        </div>
                    </div>




                    {/*<div className="text-center mt-10 h-32">*/}

                    {/*    <div className={styles.bold_content}>*/}
                    {/*        {t('content1')}*/}
                    {/*    </div>*/}

                    {/*    <div className={styles.content}>*/}
                    {/*        {t('content2')}*/}
                    {/*    </div>*/}
                    {/*    <div className={styles.bold_content}>*/}
                    {/*        {t('content3')}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <Dice/>
                </div>
            </Layout>
        </>
    )
}
