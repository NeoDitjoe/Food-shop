import AddToMenuForm from "@/Dashboard/AddToMenuForm";
import UpdateMenuForm from "@/Dashboard/updateMenuForm";
import { Fragment } from "react";
import style from 'styles/dashboard.module.css'
import { FormsGrid } from "@/components/grid";

export default function Dashboard(){

    return(            
    
        <div className={style.main}>
            <FormsGrid 
                addMenu = {<AddToMenuForm />}
                updateMenu = {<UpdateMenuForm/>}
            />
        </div>
    )
}