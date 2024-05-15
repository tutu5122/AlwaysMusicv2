const formAgregarEstudiante = document.querySelector('#formAgregarEstudiante');

////////// buscar /////////
//// cada vez que se agrega un nuevo estudiante quedara en la pagina para verlo y se podra eliminar o modificar 
const consultarEstudiantes = async () => {
    try {

        const response = await axios.get('/consulta');
        const estudiantes = response.data;


        if (estudiantes.length > 0) {

            const tablaEstudiantes = document.getElementById('tablaEstudiantes');
            tablaEstudiantes.innerHTML = '';

            estudiantes.forEach(estudiante => {
                const nuevo = document.createElement('tr')
                nuevo.innerHTML = `<td class="whiteSpace">${estudiante.nombre}</td>
                                   <td class="whiteSpace">${estudiante.rut}</td>
                                   <td class="whiteSpace">${estudiante.curso}</td>
                                   <td class="whiteSpace">${estudiante.nivel}</td>
                                   <td class="whiteSpace"> 
                                       <button class="btnModificar" >Modificar</button>
                                       <button class="btnEliminar" data-nombre="${estudiante.nombre}" >Eliminar</button>
                                   </td>`;
                tablaEstudiantes.appendChild(nuevo);

                const btnEliminar = nuevo.querySelector('.btnEliminar');
                btnEliminar.addEventListener('click', () => eliminar(estudiante.nombre));

                const btnModificar = nuevo.querySelector('.btnModificar');
                btnModificar.addEventListener('click', () => ModificarEstudiante(estudiante));
            });
        } else {
            console.log('No se encontraron estudiantes en la base de datos.');
        }
    } catch (error) {
        console.error('Error al obtener estudiantes desde la base de datos:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    consultarEstudiantes();
});

/////////// eliminar /////
const eliminar = async (nombre) => {
    try {
        await axios.delete(`/eliminar/${nombre}`);
        console.log('Estudiante eliminado correctamente:', nombre);

        /// no logre elimnar el td de la consultarEstudiantes en la pagina, pero si se elimina en la base de dato el estudiante al revisar y al cargar la pagina de nuevo no aparece 
        const filaAEliminar = document.querySelector(`tr[data-nombre="${nombre}"]`);
        if (filaAEliminar) {
            filaAEliminar.remove();
            console.log('Fila eliminada de la tabla:', nombre);
        }
    } catch (error) {
        console.error('Error al eliminar estudiante:', error);
    }
}

/////// modificar //////////
//// no logre que mostrara el cambio en ESTUDIANTES INGRESADOS, pero si se busca por rut si parace la modificacion 
const guardarCambios = async (nombre) => {
    const estudianteModificado = {
        nombre: document.getElementById('nombreEditar').value,
        rut: document.getElementById('rutEditar').value,
        curso: document.getElementById('cursoEditar').value,
        nivel: document.getElementById('nivelEditar').value
    };

    try {
        const response = await axios.put(`/modificar/${nombre}`, estudianteModificado);
        console.log('Estudiante modificado correctamente:', response.data);
    } catch (error) {
        console.error('Error al modificar estudiante:', error);
    }
};


const ModificarEstudiante = (estudiante) => {
    const detallesEstudiante = document.getElementById('detallesEstudiante');
    detallesEstudiante.innerHTML = `
        <label>Nombre:</label>
        <input type="text" class="form-control" id="nombreEditar" value="${estudiante.nombre}">
        <br>
        <label>Rut:</label>
        <input type="text" class="form-control" id="rutEditar" value="${estudiante.rut}">
        <br>
        <label>Curso:</label>
        <input type="text" class="form-control" id="cursoEditar" value="${estudiante.curso}">
        <br>
        <label>Nivel:</label>
        <input type="text" class="form-control" id="nivelEditar" value="${estudiante.nivel}">
        <br>
        <button class=" btn btn-primary btnGuardarCambios">Guardar cambios</button>
    `;

    const btnGuardarCambios = document.querySelector('.btnGuardarCambios');
    btnGuardarCambios.addEventListener('click', () => guardarCambios(estudiante.nombre));
};



////////// buscar por rut //////
const buscarEstudiantePorRut = async () => {
    const rut = document.getElementById('inputRut').value;

    try {
        const response = await axios.get(`/buscar/${rut}`);

        const estudiante = response.data;

        if (estudiante.length > 0) {
            let detallesHtml = ''; 
            
            estudiante.forEach(estudiante => {
                detallesHtml += `
                    <p>Nombre: ${estudiante.nombre}</p>
                    <p>Rut: ${estudiante.rut}</p>
                    <p>Curso: ${estudiante.curso}</p>
                    <p>Nivel: ${estudiante.nivel}</p>
                    <hr> <!-- Separador entre cada estudiante -->
                `;
            });

            document.getElementById('detallesRut').innerHTML = detallesHtml;
        } else {
            document.getElementById('detallesRut').innerHTML = '<p>No se encontró ningún estudiante con el Rut especificado.</p>';
        }
    } catch (error) {
        console.error('Error al buscar estudiante por Rut:', error);
    }
};

///// Agregue evento de clic al botón "Buscar"
document.getElementById("btnBuscar").addEventListener("click", buscarEstudiantePorRut);





///// formulario  ///////////
formAgregarEstudiante.addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.querySelector('#nombreAgregar').value;
    const rut = document.querySelector('#rutAgregar').value;
    const curso = document.querySelector('#cursoAgregar').value;
    const nivel = document.querySelector('#nivelAgregar').value;

    const nuevoEstudiante = {
        nombre: nombre,
        rut: rut,
        curso: curso,
        nivel: nivel
    };

    try {
        const response = await axios.post('/agregar', nuevoEstudiante);

        if (response.status === 201) {
            console.log('Estudiante agregado correctamente:', response.data);
            consultarEstudiantes([nuevoEstudiante]);
        }
    } catch (error) {
        console.error('Error al agregar estudiante:', error);
    }

    formAgregarEstudiante.reset();
});

