import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../styles/home.css"


export const Home = () => {
	return (
		<div className="container sin-scroll">
			<div className="row">
				<div className="col-12 vh-100 d-flex flex-column justify-content-center text-center">
					<h1>Hola Mundo</h1>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repudiandae similique dolore enim magni beatae dicta ullam incidunt ut, iste officia architecto magnam explicabo fugit aut porro optio minus tenetur?</p>

				</div>
			</div>
		</div>
	);
}; 