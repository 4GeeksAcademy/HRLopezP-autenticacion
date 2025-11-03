import { useState } from "react"

const urlBase = import.meta.env.VITE_BACKEND_URL

export const ResetPass = () => {
    const [email, setEmail] = useState({
        email: ""
    })

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (email.email.trim() == "") {
            alert("Debe colocar un correo válido")
            return
        }
        try {
            const response = await fetch(`${urlBase}/reset-password`, {
                methods: ["POST"],
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(email)
            })

            if (response.ok) {
                console.log("Vemos qué hacer", response)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1>Recuperación de contraseña</h1>
                <div className="col-12 col-md-6 border py-4">
                    <form
                        sonSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="btnRecoveryPassword">Correo electrónico</label>
                            <input type="email"
                                className="form-control"
                                placeholder="ejemplo@gmail.com"
                                id="btnRecoveryPassword"
                                name="email"
                                value={email.email}
                                onChange={(target) => setEmail({ email: target.value })}
                            />
                        </div>
                        <button
                            className="btn btn-success w-100">
                            Recuperar contraseña</button>
                    </form>
                </div>
            </div>
        </div>
    )
}