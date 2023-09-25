import { Fragment, useState } from "react";
import Image from "next/image";
import style from 'styles/header.module.css'
import Button from "../button/button";
import StateContext from "@/usecontext/stateContext";

export function navlist(){

    const { collapse } = StateContext()
    
    return (
        <ul className={ collapse ? style.collapsedNavList : style.navList}>
            <Button link='/' name='Cart'/>
            <Button link='/' name='Explore'/>
            <Button link='/' name='Search'/>
            <Button link='/' name='Contact'/>
            <Button link='/' name='Username'/>
        </ul>
    )
}

export default function Header(){

    const { setCollapse, collapse } = StateContext()

    return (
        <header className={style.header}>
            <nav className={style.nav}>
                <h1 className={style.logo}>BOBO</h1>
                <div className={style.navListDiv}>{navlist()}</div>
               
                <button 
                    className={style.collapseButton} 
                    onClick={() => setCollapse(!collapse)}
                >
                NAVLIST
                </button>
            </nav>
        </header>
    )
}