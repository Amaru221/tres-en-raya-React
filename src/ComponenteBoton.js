import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Boton extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			numeroBoton: this.props.movimiento+1,
			movimiento: this.props.movimiento
		}
	}

	onClick(evt){
		const movimiento = this.state.movimiento;
		this.props.controllerMovimientos(movimiento, true);

		for(let i = 1; i<=9; i++){
			const element = document.getElementById(i);
			if(element != null)
			{
				element.className = "casilla";
			}

		}
	}

	render(){
		const status= this.state.numeroBoton+".";
		return(
			<div className = "caja_boton">
			<p className = "status">{status}</p><button onClick={this.onClick.bind(this)} >Volver al movimiento {this.state.movimiento}</button>
			</div>

		);

	}

}

export default Boton;