import useGlobalReducer from "../hooks/useGlobalReducer"


export const Welcome = () => {

    const { store } = useGlobalReducer()
    const {user} = store


    return (
        <>
            {
                store.token != null &&
                <div className="container my-3">
                    <p>Hola {`${user.name}`}</p>
                </div>
            }
        </>


    )
}