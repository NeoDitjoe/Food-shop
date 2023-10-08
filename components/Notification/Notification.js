import style from 'styles/notification.module.css'
import StateContext from '@/usecontext/stateContext'

export default function Notification({notificationMessage}){

    const { notification } = StateContext()

    return (
        <h4 className={`${notification.background} ${style.notification}`} >{notificationMessage}</h4>
    )
}

export function notificationTimer(notification){
        setTimeout(() => {
            notification.setText(null)
            notification.setBackground(null)
        }, [2000]);
}