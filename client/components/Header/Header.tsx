import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {request_change_locales} from "@/store/locales/LocalesAction";
import {AppState} from "@/store/rootStore";
import {AppActions} from "@/store/models/actions";
import useI18n from "@/hook/useI18n"
import {Injected} from '@/components/wallet/Connectors';
import {useWeb3React } from '@web3-react/core';

interface LinkStateProps {
    locales: string
}

interface LinkDispatchProps {
    requestChangeLocales: (lang: string) => void;
}

type LinkProps = LinkStateProps & LinkDispatchProps;

const mapStateToProps = (state: AppState): LinkStateProps => ({
    locales: state.localesReducer.locales
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, {}, AppActions>
) => ({
    requestChangeLocales: bindActionCreators(request_change_locales, dispatch),
});

const Header = (props: LinkProps) => {

    const {t} = useI18n({locales: props.locales});

    const {active, account, library, connector, activate, deactivate} = useWeb3React();

    async function connectToMetaMask() {

        try {
            await activate(Injected);
        } catch (ex) {
            console.log(ex);
        }
    }

    async function disconnectMetaMask() {
        try {
            await deactivate(); //calls the deactivate method provided by useWeb3React()
        } catch (ex) {
            console.log(ex);
        }
    }

    const changeLang = (lang: string) => {
        props.requestChangeLocales(lang)
    }

    return (
        <div className=" z-10 w-full max-w-5xl lg:items-center lg:justify-between font-mono text-sm lg:flex">
            <div className="flex-1">
                <img src="https://freeethereum.com/img/freeethereum/logo-main.png?v=3.0" alt=""/>
            </div>
            <div
                className="left-0 flex h-20 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">

                {
                    active ?
                        <div>
                            <div className="p-10">
                                <div className="dropdown inline-block relative">
                                    <button
                                        className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                                        <span className="mr-1 w-56 truncate" style={{"direction": "rtl"}}>{account}</span>
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                        </svg>
                                    </button>
                                    <ul className="dropdown-menu absolute right-0 hidden text-gray-700 pt-1">
                                        <li><a
                                            onClick={disconnectMetaMask}
                                            className="rounded-t bg-gray-200 hover:bg-gray-400 py-1 px-4 block whitespace-no-wrap"
                                            href="#">{`Disconnect`}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        :

                        <a href="#"
                           onClick={connectToMetaMask}
                           className="group rounded-lg border border-transparent px-5 py-4 transition-colors lg:hover:border-gray-300 lg:hover:bg-gray-100 lg:hover:dark:border-neutral-700 lg:hover:dark:bg-neutral-800/30">

                            <p className={`mb-3 text-2xl font-semibold`}>
                                {t('connetToMetaMask')}
                            </p>
                        </a>
                }
            </div>
            <div className="pl-1 eft-0 flex h-12 items-center justify-center">
                <select onChange={(e) => {
                    changeLang(e.target.value)
                }}>
                    <option value="en-US">English</option>
                    <option value="zh-TW">中文</option>
                </select>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);