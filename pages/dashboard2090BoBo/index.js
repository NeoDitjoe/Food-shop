import AddToMenuForm from "@/Dashboard/AddToMenuForm";
import UpdateMenuForm from "@/Dashboard/updateMenuForm";
import style from 'styles/dashboard.module.css'
import { FormsGrid } from "@/components/grid";
import LinkButton from "@/components/button/button";

export default function Dashboard(){

    return(            
    
        <div>
            <button className={style.button}>
                <LinkButton link={'dashboard2090BoBo/orders'} text='View Orders' />
            </button>
            
            <div className={style.main}>
                
                <FormsGrid 
                    addMenu = {<AddToMenuForm collection = 'menu' />}
                    updateMenu = {<UpdateMenuForm collection = 'menu'/>}
                />
                
                <FormsGrid 
                    addMenu = {<AddToMenuForm collection = 'specials' />}
                    updateMenu = {<UpdateMenuForm collection= 'specials' />}
                />
            </div>
        </div>
    )
}