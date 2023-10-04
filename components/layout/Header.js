import { Fragment, useState } from "react";
import style from 'styles/header.module.css'
import LinkButton, { Button } from "../button/button";
import StateContext from "@/usecontext/stateContext";
import { FaCartArrowDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiFillPhone } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import Link from "next/link";
import { useSession } from "next-auth/react"

export function Navlist(){

    const { collapse } = StateContext()
    const { data: session, status } = useSession()

    console.log(session && session.user)
    console.log(status)
    
    return (
        <ul className={ collapse ? style.collapseNavList : style.navList}>
            <LinkButton link='/' name={ <FaCartArrowDown/>} text='cart'/>
            <LinkButton link='/' name={ <BsFillRocketTakeoffFill/>} text='Explore' />
            <LinkButton link='/' name={ <BiSearchAlt/>} text='Search' />
            <LinkButton link='/' name={ <AiFillPhone/>} text='Contact' />
            <LinkButton link='/dashboard' name={ <CgProfile/>} text={session ? session.user.email[1] : 'Login' } />
        </ul>
    )
}

export default function Header(){

    const { setCollapse, collapse } = StateContext()

    return (
        <header className={style.header}>
            <nav className={style.nav}>
                
                <h1 className={style.logo}><Link href={'/'}>BOBO</Link></h1>
                <div className={style.navListDiv}>{Navlist()}</div>
               
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