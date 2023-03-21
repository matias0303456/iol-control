import { useForm } from 'react-hook-form'
import { useUser } from "../hooks/useUser"

export function LoginForm() {

    const { login } = useUser()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        login(data)
    }

    return (
        <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Usuario (email)</label>
            <input type="email" {...register("username", {
                required: true
            })}
            />
            {errors.username && <small>* Este campo es requerido.</small>}
            <label htmlFor="password">Contraseña</label>
            <input type="password" {...register("password", {
                required: true
            })}
            />
            {errors.password && <small>* Este campo es requerido.</small>}
            <input type="submit" value="Enviar" />
        </form>
    )

}