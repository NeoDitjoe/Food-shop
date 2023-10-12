import style from 'styles/footer.module.css'

export default function Footer(){
    return(
        <div className={style.footer}>
            <p>Copyright © 2023 BOBO. All rights reserved.</p>
            <br/>
            <p>The content of this website is intended for personal and non-commercial use. Any unauthorized use, distribution, or reproduction of this material is strictly prohibited.</p>
            <br/>
            <p>For inquiries regarding the use or distribution of our content, please contact us at [Your Contact Email Address].</p>
        </div>
    )
}