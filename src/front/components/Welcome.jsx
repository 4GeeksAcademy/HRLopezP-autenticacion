import useGlobalReducer from "../hooks/useGlobalReducer"
import "../styles/welcome.css"


export const Welcome = () => {

    const { store } = useGlobalReducer()
    const { user } = store


    return (
        <>
            {
                store.user != null &&
                <div className="container my-3">
                    <p>Hola {`${user?.name}`}</p>
                    <p>Mi correo es {`${user?.email}`}</p>
                    <div>
                        <img className="formato-imagen" src={user?.image} alt="avatarusuario" />
                    </div>
                </div>
            }
        </>


    )
}