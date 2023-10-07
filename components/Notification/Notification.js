import style from 'styles/notification.module.css'
import StateContext from '@/usecontext/stateContext'

export default function Notification({notificationMessage}){

    const { notification } = StateContext()

    return (
        <h4 className={`${notification.background} ${style.notification}`} >{notificationMessage}</h4>
    )
}