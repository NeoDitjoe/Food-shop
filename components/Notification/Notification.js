import style from 'styles/notification.module.css'
import StateContext from '@/usecontext/stateContext'
import { Alert } from "@mui/material";

export default function Notification({notificationMessage}){

    const { notification } = StateContext()

    return (
        <div className={style.notification}>
            <Alert severity={notification.severity}>{notificationMessage}!</Alert>
        </div>
    )
}

export function notificationTimer(notification){
        setTimeout(() => {
            notification.setText(null)
            notification.setSeverity(null)
        }, [2300]);
}