import { Toast, Modal } from 'antd-mobile';

const alert1 = Modal.alert;


export const alert = (title, content, Cancel, Ok) => {
    return new Promise((resolve, reject) => {
        return alert1(title, content, [
            { text: Cancel, onPress: () =>reject()  },
            {
                text: Ok,
                onPress: () =>resolve()

            },
        ])
    })
}
export const showToast = (content, duration, onClose, mask) => {
    return Toast.info(content, duration, onClose, mask);
}
export const successToast = (content, duration, onClose, mask) => {
    return Toast.success(content, duration, onClose, mask);
}

export const failToast = (content, duration, onClose, mask) => {
    return Toast.fail(content, duration, onClose, mask);
}

export const offline = (content, duration, onClose, mask) => {
    return Toast.offline(content, duration, onClose, mask);
}

export const loadingToast = (content, duration, onClose, mask) => {
    return Toast.loading(content, duration, onClose, mask);
}

