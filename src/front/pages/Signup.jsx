import { json } from "react-router-dom"
import "../styles/home.css"
import { useState, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Toaster, toast } from "sonner"
import "../styles/signup.css"

const initialUserState = {
    name: "",
    username: "",
    email: "",
    avatar: null,
    password: "",
    confirmPassword: ""
}

const urlBase = import.meta.env.VITE_BACKEND_URL

const Signup = () => {
    const [user, setUser] = useState(initialUserState)
    const fileInputRef = useRef(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const navigate = useNavigate()

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setUser({
            ...user,
            avatar: file
        })
    }


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        if (user.password !== user.confirmPassword) {
            toast.error("Las contraseñas no coinciden. Por favor, revísalas.");
            return;
        }

        const formData = new FormData()
        formData.append("name", user.name)
        formData.append("email", user.email)
        formData.append("password", user.password)
        formData.append("avatar", user.avatar)
        formData.append("username", user.username)

        try {
            const response = await fetch(`${urlBase}/register`, {
                method: "POST",
                body: formData
            })

            if (response.ok) {
                toast.success("¡Registro exitoso! Felicitaciones");
                setUser(initialUserState)
                if (fileInputRef.current) {
                    fileInputRef.current.value = null
                }
                setTimeout(() => {
                    navigate("/login")
                }, 1000)
            } else if (response.status === 409) {
                toast.error("El usuario ya existe. Intenta con otro nombre o correo.");
            } else {
                toast.error("Error al registrar usuario, intenta nuevamente")
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            toast.error("Error de conexión con el servidor. Intenta de nuevo más tarde.");
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
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="******************"
                                        className="form-control"
                                        id="btnPassword"
                                        name="password"
                                        onChange={handleChange}
                                        value={user.password} />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <i class="fa-solid fa-eye-slash"></i>
                                        ) : (
                                            <i class="fa-solid fa-eye"></i>
                                        )}   

                                    </button>
                                </div>
                            </div>
                            <div className="form-group my-4">
                                <label htmlFor="btnConfirmPassword" className="mb-2"><b>Confirmar Contraseña:</b> </label>
                                <div className="input-group">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="******************"
                                        className="form-control"
                                        id="btnConfirmPassword"
                                        name="confirmPassword"
                                        onChange={handleChange}
                                        value={user.confirmPassword}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {showConfirmPassword ? (
                                            <i className="fa-solid fa-eye-slash"></i>
                                        ) : (
                                            <i className="fa-solid fa-eye"></i>
                                        )}
                                    </button>
                                </div>
                                {user.confirmPassword && user.password && user.password !== user.confirmPassword && (
                                    <p className="text-danger mt-2">¡Las contraseñas no coinciden!</p>
                                )}
                            </div>

                            <button
                                className="btn btn-outline-primary w-100 mt-4"
                                disabled={!user.name || !user.email || !user.username || !user.password || user.password !== user.confirmPassword}
                            >
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