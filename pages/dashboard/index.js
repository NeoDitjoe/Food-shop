import AddToMenuForm from "@/Dashboard/AddToMenuForm";
import UpdateMenuForm from "@/Dashboard/updateMenuForm";
import { Fragment } from "react";
import style from 'styles/dashboard.module.css'
import { FormsGrid } from "@/components/grid";
import LinkButton from "@/components/button/button";

export default function Dashboard(){

    return(            
    
        <div>
            <button className={style.button}>
                <LinkButton link={'dashboard/orders'} text='View Orders' />
            </button>
            
            <div className={style.main}>
                
                <FormsGrid 
                    addMenu = {<AddToMenuForm />}
                    updateMenu = {<UpdateMenuForm/>}
                />
            </div>
        </div>
    )
}