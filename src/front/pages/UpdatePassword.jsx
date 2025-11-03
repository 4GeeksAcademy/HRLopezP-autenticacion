import { useState } from "react"
import { useSearchParams } from "react-router-dom"

const urlBase = import.meta.env.VITE_BACKEND_URL

export const UpdatePassword = () => {
    const [newPasword, setNewPassword] = useState("")

    const [searchParams, _] = useSearchParams()



    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`${urlBase}/update-password`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${searchParams.get("token")}`,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(newPasword)
            })

            console.log(response)

        } catch (error) {
            console.log("error")
        }

    }


    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1> Actualizar contraseña</h1>
                <div className="col-12 col-md-6 border py-4">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group mb-3">
                            <label htmlFor="btnUpdatePassword">Nueva contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="*********************"
                                id="btnUpdatePassword"
                                name="password"
                                value={newPasword}
                                onChange={({ target }) => setNewPassword(target.value)}
                            />
                        </div>
                        <button
                            className="btn btn-secondary w-100"
                        >Actualizar Contraseña</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


