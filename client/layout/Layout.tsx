import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import React from 'react';
interface IProps {
    children: React.ReactNode
}

const Layout = (props: IProps) => {

    return (
        <>
            <main className={`flex min-h-screen flex-col items-center`}>
            <Header/>
                {props.children}

            </main>
            {/*<Footer/>*/}
        </>

    )
}

export default Layout;