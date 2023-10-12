import { Fragment, useState } from "react";
import Header from "./Header";
import { Inter } from 'next/font/google'
import Head from "next/head";
import { Navlist } from "./Header";
import StateContext from "@/usecontext/stateContext";
import style from 'styles/layout.module.css'
import Notification from "../Notification/Notification";
import Footer from "./footer";

const inter = Inter({ subsets: ['latin'] })


export default function Layout({children}){

    const { collapse, setCollapse, notification } = StateContext()

    return(
        <div className={inter.className}>
            <Head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            
            <Header/>
            {
                collapse && collapse ? 
                <div className={style.collapseDiv} onClick={() => setTimeout(() => {
                    setCollapse(false)
                }, 300)}> {Navlist()} </div> : 
                <div/>
            }
            {collapse ? <div/> : <section className={style.section}>{children}</section>}

            {notification.text && <Notification notificationMessage={notification.text} />}

            <Footer/>
        </div>
    )
}