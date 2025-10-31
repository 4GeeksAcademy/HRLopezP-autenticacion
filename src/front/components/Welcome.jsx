import useGlobalReducer from "../hooks/useGlobalReducer"
import "../styles/welcome.css"


export const Welcome = () => {

    const { store } = useGlobalReducer()
    const { user } = store


    return (
        <>
            {
                store.user != null &&
                <div className="container my-3 d-flex justify-content-around">
                    <p>Hola {`${user?.name}`}</p>
                    <div>
                        <img className="formato-imagen" src={user?.image} alt="avatarusuario" />
                    </div>
                    <p>Usuario {`${user?.username}`}</p>
                </div>
            }
        </>


    )
}