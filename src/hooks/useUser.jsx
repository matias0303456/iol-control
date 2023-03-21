import { useContext } from "react"
import { toast } from "react-toastify"
import UserContext from "../contexts/UserContext"
import { API } from "../utils/config"

export function useUser() {

    const { token, setToken } = useContext(UserContext)

    const login = async user => {
        try {
            const res = await fetch(API + '/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    ...user,
                    grant_type: 'password'
                })
            })
            const data = await res.json()
            localStorage.setItem('token', data.access_token)
            setToken(data.access_token)
        } catch (err) {
            toast.error('Usuario o contraseña inválidos.')
        }
    }

    return { login, token }

}