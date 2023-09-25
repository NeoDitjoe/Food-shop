import { Fragment, useState } from "react";
import style from 'styles/header.module.css'
import LinkButton, { Button } from "../button/button";
import StateContext from "@/usecontext/stateContext";
import { FaCartArrowDown } from "react-icons/fa";
import { CgProfile } from "react-icons/Cg";
import { AiFillPhone } from "react-icons/Ai";
import { BiSearchAlt } from "react-icons/Bi";
import { BsFillRocketTakeoffFill } from "react-icons/Bs";

export function navlist(){

    const { collapse } = StateContext()
    
    return (
        <ul className={ collapse ? style.collapseNavList : style.navList}>
            <LinkButton link='/' name={ <FaCartArrowDown/>} text='cart'/>
            <LinkButton link='/' name={ <BsFillRocketTakeoffFill/>} text='Explore' />
            <LinkButton link='/' name={ <BiSearchAlt/>} text='Search' />
            <LinkButton link='/' name={ <AiFillPhone/>} text='Contact' />
            <LinkButton link='/' name={ <CgProfile/>} text='Username' />
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
               
                <div className={style.collapseButton}>
                    <Button  
                        click={() => setCollapse(!collapse)}
                        name={'Menu'}
                    />
                </div>
            </nav>
        </header>
    )
}