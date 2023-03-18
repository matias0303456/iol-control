import { useContext } from "react"
import UserContext from "../contexts/userContext"

export function useUser() {

    const API = import.meta.env.VITE_APP_API

    const { token, setToken } = useContext(UserContext)

    const login = data => {
        fetch(API + '/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                ...data,
                grant_type: 'password'
            })
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('token', data.access_token)
                setToken(data.access_token)
            })
    }

    return { login, token }

}