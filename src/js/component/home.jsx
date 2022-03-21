import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	//hooks
	const [tareas, setTareas] = useState("");
	const [listatareas, setListareas] = useState([]); // listatareas, arreglo debe inicializarse en un arreglo vacio

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify(listatareas);

	var requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: raw,
		redirect: "follow"
	};

	fetch(
		"https://assets.breatheco.de/apis/fake/todos/user/shalo",
		requestOptions
	)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log("error", error));
	//}

	function addTareas() {
		setListareas([...listatareas, { label: tareas, done: false }]);
		console.log(listatareas);
	}
	function deleteTareas(item) {
		const newList = listatareas.filter(key => key !== item);
		setListareas(newList);
		console.log(newList);
	}

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/shalo")
			.then(respuesta => respuesta.json())
			.then(respuesta => {
				setListareas(respuesta);
				console.log(respuesta);
			})
			.catch(error => console.log("Ocurre un error...", error));
	}, []);

	// funcion que valida que el campo  tarea no este vacio y vaya llenanod el arreglo lista tareas
	const validatetareas = () => {
		// === COMPARACIÓN ESTRICTA
		if (tareas === "") {
			console.log("El campo tarea no debe estar vacio");
		} else {
			console.log("perfect!");
		}
	};

	return (
		<>
			<div className="text-center mt-5">
				<h1>TO DO LIST</h1>
				<p></p>
				<a href="#" className="btn btn-success">
					@shalo{" "}
				</a>
				<p>Pendientes</p>
				<input
					type="text"
					placeholder="Tipea la tarea por hacer"
					onChange={e => setTareas(e.target.value)}
					value={tareas}
				/>
				<button
					className="btn btn-success"
					type="button"
					onClick={() => {
						validatetareas();
						addTareas();
						//actualizarListaApi();
					}}>
					<i className="fas fa-chevron-circle-down"></i>
				</button>
				<div className="container ">
					<ul className="list-group list-group-flush ">
						{listatareas.map((item, index) => {
							return (
								<li
									className="alert alert-info justify-content-between d-flex w-100"
									key={index}>
									{item.label}
									<button
										className="btn btn-light"
										type="button"
										onClick={() => {
											deleteTareas(item);
											console.log("hola");
											//console.log(entrada)
										}}>
										<i className="fas fa-trash-alt"></i>
									</button>
								</li>
							);
						})}
					</ul>
					<p total de tareas paraclassName="fw-light text-right">
						{listatareas.length}
					</p>
				</div>
			</div>
		</>
	);
};

export default Home;
