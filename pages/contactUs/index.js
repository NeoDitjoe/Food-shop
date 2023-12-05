import style from 'styles/contactUs.module.css'
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt, FaFacebook  } from "react-icons/fa";

export default function ContactUs(){

    return(
        <div className={style.main} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', padding:'10px'}}>
            <h2>Contact Us</h2>
            <br/>
            <div className={style.section}>
                <button className={style.icon}>
                    <FaLocationDot />
                </button>
                <div>
                    <h6>Address</h6>
                    742 Phiring Section<br/>
                    Ga-Luka <br/>
                </div>
            </div>
            <br/>
            <div className={style.section}>
                <button className={style.icon}>
                    <FaPhoneAlt />
                </button>
                <div>
                    <h6>Phone</h6>
                    072 554 8562
                </div>
            </div>
            <br/>
            <div className={style.section}>
                <button className={style.icon}>
                    <FaFacebook />
                </button>
                <div>
                    <h6>Facebook</h6>
                    Martin's Gen Dealer-KwaBobo 
                </div>
            </div>
        </div>
    )
}