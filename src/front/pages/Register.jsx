import { json } from "react-router-dom"
import "../styles/home.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "sonner"

const initialUserState = {
    name: "",
    username: "",
    email: "",
    avatar: "",
    password: ""
}

const urlBase = import.meta.env.VITE_BACKEND_URL

const Register = () => {
    const [user, setUser] = useState(initialUserState)
    const navigate = useNavigate()


    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault()


        const formData = new FormData()
        formData.append("name", user.name)
        formData.append("email", user.email)
        formData.append("password", user.password)
        formData.append("avatar", user.avatar)
        formData.append("username", user.username)

        const response = await fetch(`${urlBase}/register`, {
            method: "POST",
            body: formData
        })
        
        if (response.ok) {
            setUser(initialUserState)
            setTimeout(() => {
                navigate("/login")
            }, 1000)


        } else if (response.status == 409) {
            toast.error("El usuario ya existe")
        } else {
            toast.error("Error al registrar usuario, intenta nuevamente")
        }
    }


    return (
        <div className="container">
            <Toaster position="top-center" richColors />
            <div className="vh-100 d-flex flex-column">
                <div className="row justify-content-center my-5">
                    <h2 className="text-center py-3">Regístrate en nuestra página</h2>
                    <div className="col-12 col-md-6">
                        <form
                            className="border border-secundary p-5"
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group mb-3">
                                <label htmlFor="txtNAme">Nombre completo</label>
                                <input
                                    type="text"
                                    placeholder="Jhon Doe"
                                    className="form-control"
                                    id="txtNAme"
                                    name="name"
                                    onChange={handleChange}
                                    value={user.name}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="txtEmail">Correo</label>
                                <input
                                    type="email"
                                    placeholder="ejmeplo@email.com"
                                    className="form-control"
                                    id="txtEmail"
                                    name="email"
                                    onChange={handleChange}
                                    value={user.email}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="txtUsername">Nombre de ususario</label>
                                <input
                                    type="text"
                                    placeholder="usuario"
                                    className="form-control"
                                    id="txtUsername"
                                    name="username"
                                    onChange={handleChange}
                                    value={user.username}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="txtAvatar">Avatar</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control"
                                    id="txtAvatar"
                                    name="avatar"
                                    onChange={(event) => {
                                        setUser({ ...user, avatar: event.target.files[0] })
                                    }}
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
                                    value={user.password} />
                            </div>
                            <button
                                className="btn btn-outline-primary w-100">
                                Guardar
                            </button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register