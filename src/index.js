import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Tablero from './ComponenteTablero';


class Juego extends React.Component{
	render(){
		return(
			<div className="juego">
				<div className="juego-tablero">
					<Tablero/>
				</div>
				<div className="juego-info">
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Juego/>,
	document.getElementById("root"));