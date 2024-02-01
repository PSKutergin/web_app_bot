import { useTelegram } from "./useTelegram"

const user = () => {
    const { user } = useTelegram()
    const userContainer = document.querySelector('.username')

    userContainer.innerText = user?.username
}

export default user