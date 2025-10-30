import "../styles/home.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"

const initialUserState = {
    username: "",
    password: "",
}

const urlBase = import.meta.env.VITE_BACKEND_URL

const Login = () => {
    const [user, setUser] = useState(initialUserState)

    const { dispatch } = useGlobalReducer()
    const navigate = useNavigate()


    const handleChange = ({ target }) => {
        const { name, value } = target
        setUser({
            ...user,
            [name]: value
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${urlBase}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const data = await response.json()
            if (response.ok) {
                dispatch({ type: "SET_TOKEN", payload: data.token })

                const responseUser = await fetch(`${urlBase}/me`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${data.token}`
                    }
                })

                const dataUser = await responseUser.json()
                dispatch({
                    type: "SET_USER",
                    payload: dataUser.user
                })
                localStorage.setItem("token", data.token)
                localStorage.setItem("user", JSON.stringify(dataUser.user))

                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container vh-100 d-flex flex-column justify-content-center sin-scroll">
            <div className="row justify-content-center">
                <h1 className="text-center">Ingresa a nuestra plataforma</h1>
                <div className="col-12 col-md-6 py-4">
                    <form
                        onSubmit={handleSubmit}
                        className="border border-secundary p-5"
                    >
                        <div className="form-group mb-3">
                            <label htmlFor="btnUsername">Username: </label>
                            <input
                                type="text"
                                placeholder="nombre de usuario"
                                className="form-control"
                                id="btnUsername"
                                name="username"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="btnPassword">Contraseña: </label>
                            <input
                                type="password"
                                placeholder="******************"
                                className="form-control"
                                id="btnPassword"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            className="btn btn-outline-primary w-100">
                            Iniciar Sesión</button>
                    </form>
                </div>
                <div className="w-100"></div>
                <div className="col-12 col-md-6 d-flex justify-content-between my-1">
                    <Link to="/register">
                        Registrarme
                    </Link>
                    <Link>
                        Olvidó contraseña
                    </Link>

                </div>

            </div>
        </div>
    )
}


export default Login