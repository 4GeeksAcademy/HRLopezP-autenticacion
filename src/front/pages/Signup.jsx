import { json } from "react-router-dom"
import "../styles/home.css"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "sonner"
import "../styles/signup.css"

const initialUserState = {
    name: "",
    username: "",
    email: "",
    avatar: null,
    password: ""
}

const urlBase = import.meta.env.VITE_BACKEND_URL

const Signup = () => {
    const [user, setUser] = useState(initialUserState)
    const fileInputRef = useRef(null)

    const navigate = useNavigate()

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setUser({
            ...user,
            avatar: file
        })
    }


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
            fileInputRef.current.value = null
            setTimeout(() => {
                navigate("/login")
            }, 500)


        } else if (response.status == 409) {
            toast.error("El usuario ya existe")
        } else {
            toast.error("Error al registrar usuario, intenta nuevamente")
        }
    }


    return (
        <div className="container">
            <Toaster position="top-center" richColors />
            <div className="d-flex flex-column">
                <div className="row justify-content-center my-4">
                    <div className="col-7 mb-4">
                        <h1 className="text-center bg-warning-subtle mx-5 p-4">Regístrate en ActívaT</h1>
                    </div>
                    <div className="col-12 col-md-6">
                        <form
                            className="border border-secundary p-5 bg-azul"
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group mb-3">
                                <label htmlFor="txtNAme" className="mb-2"><b>Nombre completo:</b></label>
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
                            <div className="form-group my-4">
                                <label htmlFor="txtEmail" className="mb-2"><b>Correo:</b></label>
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
                            <div className="form-group my-4">
                                <label htmlFor="txtUsername" className="mb-2"><b>Nombre de ususario:</b></label>
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
                            <div className="form-group my-4">
                                <label htmlFor="txtAvatar" className="mb-2"><b>Avatar:</b></label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control"
                                    id="txtAvatar"
                                    name="avatar"
                                    ref={fileInputRef}
                                    // onChange={(event) => {
                                    //     setUser({ ...user, avatar: event.target.files[0] })
                                    // }}
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="form-group my-4">
                                <label htmlFor="btnPassword" className="mb-2"><b>Contraseña:</b> </label>
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

export default Signup;