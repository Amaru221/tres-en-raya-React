import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Casilla from './ComponenteCasilla';
import Boton from './ComponenteBoton';

class Tablero extends React.Component{

	constructor(props){
		super(props);
		
		this.state = {
			jugador: "X",
			ganador: null,
			jugando: "jugando...",
			movimientos: 0,
			arrayCasillas: Array(9).fill(""),
			arrayMovimientos: [],
			recuperado: false
		};
	}

	componentDidUpdate(){
		if(this.state.recuperado === true){
			for(let i = 1; this.state.arrayCasillas.length>=i; i++){
				let element = document.getElementById(i);
				if(element!= null)
				{
					element.value= "";
				}
			}
			for(let i = 0;this.state.arrayMovimientos.length>i;i++){
				let element = document.getElementById(this.state.arrayMovimientos[i]['posicion']);
				element.value = this.state.arrayMovimientos[i]['jugador'];
			}
		}
	}

	//Comparador del valor de las casillas para comprobar si ha ganado un jugador
	compararCasillas(a, b, c){		
		if(a['value'] === b['value'] && a['value'] === c['value']){
			console.log("a = "+a['value']+"; b = "+b['value']+"; c = "+c['value']);
			return a['value'];
		}else{
			return -1;
		}
	}

	//recibe el valor y objeto con datos del movimiento del componente casilla cuando es clickeado
	handler = (param, obj) => {
		const movimientos = this.state.movimientos;
		const arrayCasillas = this.state.arrayCasillas;
		const arrayMovimientos = this.state.arrayMovimientos;

		//capturamos los movimientos en un array
		arrayMovimientos.push(obj);

		//actualizamos estado con los parametros obtenidos de la casilla
	    this.setState({
	      jugador: param,
	      movimientos: movimientos+1,
	      arrayCasillas: arrayCasillas,
	      arrayMovimientos: arrayMovimientos,
	    })

	    let posicion = obj['posicion']-1;

	    arrayCasillas[posicion] = obj;

	    let ganador = undefined

	    //**********************comprobar Ganador************************
	    if(this.state.ganador != "X" && this.state.ganador != "O"){
		    //**comprobamos primera fila**
		    ganador = this.compararCasillas(arrayCasillas[0], arrayCasillas[1], arrayCasillas[2]);
		    //comprobamos segunda fila
		    if(ganador === -1){
		    	ganador = this.compararCasillas(arrayCasillas[3], arrayCasillas[4], arrayCasillas[5]);
		    }
		    //comprobamos tercera fila
		    if(ganador === -1){
		    	ganador = this.compararCasillas(arrayCasillas[6], arrayCasillas[7], arrayCasillas[8]);
		    }

		    //**comprobamos primera columna**
		    if(ganador === -1){
		    	ganador = this.compararCasillas(arrayCasillas[0], arrayCasillas[3], arrayCasillas[6]);
		    }
		   	//comprobamos segunda columna
		   	if(ganador === -1){
		   		ganador = this.compararCasillas(arrayCasillas[1], arrayCasillas[4], arrayCasillas[7]);
		   	}
		   	//comprobamos tercera columna
		   	if(ganador === -1){
		   		ganador = this.compararCasillas(arrayCasillas[2], arrayCasillas[5], arrayCasillas[8]);
		   	}
		    	//**commprobamos diagonal 1**
		   	if(ganador === -1){
		   		ganador = this.compararCasillas(arrayCasillas[0], arrayCasillas[4], arrayCasillas[8]);
		   	}
		   	//comprobamos diagonal 2
		   	if(ganador === -1){
		   		ganador = this.compararCasillas(arrayCasillas[2], arrayCasillas[4], arrayCasillas[6]);
		   	}

	   	}

	   	if(ganador !== -1 && ganador !== undefined)
	   	{
	   		this.setState({
	   			ganador: ganador,
	   			jugando: "****Partida Finalizada****",
	   		});
	   	}else if(arrayMovimientos.length === 9 && ganador === -1){
	   		this.setState({
	   			ganador: "EMPATE",
	   			jugando: "****Partida Finalizada: EMPATE****",
	   		});
	   	}
	}

	//refrescamos la pagina
	refreshPage(){
    	window.location.reload(false);
 	}

 	//capturamos el movimiento al que se pretende volver
 	controllerMovimientos = (movimiento, recuperado) => {
 		const arrayRecuperacion = this.state.arrayMovimientos;
 		const nuevoArrayCasillas = Array(9).fill("");

 		//ordenamos el array de movimientosRealizados por numero del movimiento, comparamos los elementos a y b => el menor de los dos irá antes
 		arrayRecuperacion.sort(function(a, b) {return a['movimiento'] - b['movimiento'];});
 		const objetoMovimiento = arrayRecuperacion[movimiento-1];
 		if(objetoMovimiento.jugador === "X"){
 			this.setState({jugador: "O"});
 		}else{
 			this.setState({jugador: "X"});
 		}

 		//borramos los elementos del array superiores al movimiento pasado por parametro
 		arrayRecuperacion.splice(movimiento, (arrayRecuperacion.length-movimiento));
 		for(let i = 0; arrayRecuperacion.length>i; i++){
 			nuevoArrayCasillas[arrayRecuperacion[i].posicion-1] = arrayRecuperacion[i];
 		}

 		//actualizamos el estado del tablero con los nuevos valores
 		this.setState({
 			arrayMovimientos: arrayRecuperacion,
 			movimientos: arrayRecuperacion.length,
 			recuperado: recuperado,
 			arrayCasillas: nuevoArrayCasillas,
 			jugando: "jugando...",
 			ganador: null,

 		});	
  	}

 	//renderizamos componenete casilla
	renderCasilla(i){
		return(
			<Casilla
				jugador= {this.state.jugador}
				posicion={i}
				handler={this.handler}
				value = {this.state.jugador}
				movimiento = {this.state.movimientos}
				ganador = {this.state.ganador}
				arrayMovimientos = {this.state.arrayMovimientos}
			/>			
		);
	}

	render(){
		return(
			<div className="tablero">		
				<div className="juego" align="center">
					<div className="status">Jugador: {this.state.jugador}</div>
					<div className="status">Movimientos: {this.state.movimientos}</div>
					<div className="tablero-fila">
						{this.renderCasilla(1)}
						{this.renderCasilla(2)}
						{this.renderCasilla(3)}
					</div>

					<div className="tablero-fila">
						{this.renderCasilla(4)}
						{this.renderCasilla(5)}
						{this.renderCasilla(6)}
					</div>
					<div className="tablero-fila">
						{this.renderCasilla(7)}
						{this.renderCasilla(8)}
						{this.renderCasilla(9)}
					</div>
					<div align="center">{this.state.jugando}</div>
				</div>
				<div className="informacion" id="informacion">
					<div className="status" id="restart">1. <button onClick={() => window.location.reload(false)}>Restart Game</button></div>
					{this.state.arrayMovimientos.map((movimiento,i) => <Boton key={i} movimiento={this.state.movimientos} controllerMovimientos={this.controllerMovimientos} /> ) }
				</div>			
			</div>
		);
	}
}

export default Tablero;