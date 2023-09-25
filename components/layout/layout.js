import { Fragment, useState } from "react";
import Header from "./Header";
import { Inter } from 'next/font/google'
import Head from "next/head";
import { navlist } from "./Header";
import StateContext from "@/usecontext/stateContext";
import style from 'styles/layout.module.css'

const inter = Inter({ subsets: ['latin'] })


export default function Layout({children}){

    const { collapse } = StateContext()

    return(
        <div className={inter.className}>
            <Head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            
            <Header/>
            {
                collapse && collapse ? 
                <div className={style.collapseDiv}>{navlist()}</div> : 
                ''
            }
            {collapse ? " " : <section>{children}</section>}
        </div>
    )
}