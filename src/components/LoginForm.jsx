import { useState } from "react"
import { useUser } from "../hooks/useUser"

export function LoginForm() {

    const { login } = useUser()

    const [user, setUser] = useState({})

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        login(user)
    }

    return (
        <form className="loginForm" onChange={handleChange} onSubmit={handleSubmit}>
            <label htmlFor="username">Usuario (email)</label>
            <input type="email" name="username" />
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" />
            <input type="submit" value="Enviar" />
        </form>
    )

}