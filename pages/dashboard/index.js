import AddToMenuForm from "@/Dashboard/AddToMenuForm";
import UpdateDataForm from "@/Dashboard/updateMenuForm";
import { Fragment } from "react";
import style from 'styles/dashboard.module.css'

export default function Dashboard(){

    return(
        <div className={style.main}>
            <AddToMenuForm />
            <UpdateDataForm/>
        </div>
    )
}