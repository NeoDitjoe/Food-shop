import { Button } from "./button/button"
import style from 'styles/overlay.module.css'


export default function Overlay({click, product, item, price}){
    return(
        <div className={style.overlay}>
        {

            <div>
                <h1>{product}</h1>
                <p>{item}</p>
                <p>R {price}</p>

                <div className={style.button} >
                    <Button 
                        name={'CLOSE'} 
                        click = {click}
                    />
                </div>
            </div>
        }
    </div>
    )
}