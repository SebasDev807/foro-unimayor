
//notificación.js
export function notificarRespuesta(name, comentario) {

    Notification.requestPermission()
        .then(result => {
            console.log(result);
        })

    if (Notification.permission === 'granted') {
        return new Notification(`${name} ha respondido: `, {
            icon: `https://media.licdn.com/dms/image/C510BAQFK6VtHHO8c2w/company-logo_200_200/0/1631398549121?e=2147483647&v=beta&t=k-9XpVo_k65OMmLjhFZlpvdHD8XEAXOila_52Egj5Ho`,
            body: comentario,
        })
    }
}