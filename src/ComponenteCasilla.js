import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Casilla extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value : "",
			posicion: null,
			jugador: null,
			movimiento: null,
		};
	}

	componentDidUpdate(){
		if(this.props.ganador === this.state.value)
		{
			for(let i = 0; i<this.props.arrayMovimientos.length; i++)
			{
				if(this.state.posicion === this.props.arrayMovimientos[i].posicion){
				const element = document.getElementById(this.state.posicion)
				element.className = "casilla ganador";
				//console.log("casilla "+this.state.posicion+"-> valor "+this.state.value)
				}
			}		
		}		
	}

	onClick(evt){
		if(evt.target.value === ""){
			const posicion = this.props.posicion;
			const jugador = this.props.jugador;
			const value = this.props.value;
			let movimiento = this.props.movimiento;
			movimiento = movimiento+1;

			if(this.props.value === "X"){
				this.setState({value: "X"});
				this.setState({jugador: "X"});
				this.setState({posicion: posicion});

				const obj = {
					jugador: jugador,
					value: value,
					posicion: posicion,
					movimiento: movimiento
				}
				this.props.handler("O", obj);
			}
			if(this.props.value === "O"){
				this.setState({value: "O"});
				this.setState({jugador: "O"});
				this.setState({posicion: posicion});

				const obj = {
					jugador: jugador,
					value: value,
					posicion: posicion,
					movimiento: movimiento
				}
				this.props.handler("X", obj);
			}
		}
	}

	render(){
		return(
			<input type="button" className="casilla"
			id={this.state.posicion}
			value={this.state.value}
			onClick={this.onClick.bind(this)}
			/>
		);	
	}
}

export default Casilla;