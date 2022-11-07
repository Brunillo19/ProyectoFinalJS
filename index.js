let genero = document.getElementById("generar");
let prueba= document.getElementById("prueba");
let contenido = document.getElementById("contenido");
let limpiar = document.getElementById("limpiar");
let turnoNuevo = document.getElementById("turnoNuevo");
let tablaturno = [] && JSON.parse(localStorage.getItem("turnos"));

class turno {
  constructor(nomPa, hora, comentario, tratamiento, obra, costo, dia, id) {
    this.nomPa = nomPa;
    this.hora = hora;
    this.comentario = comentario;
    this.tratamiento = tratamiento;
    this.obra = obra;
    this.costo = costo;
    this.dia = dia;
    this.id = id;
  }
}
/* Turnos genéricos con FETCH */


const MuestraTurno = async () => {

  const response = await fetch("./turnosPrueba.json");
  const turnos = await response.json();
  let turnosGenerados = document.getElementById("turnosGenerados");
  let divprueba = document.createElement("div");
  divprueba.className="turnoPrueba";
  turnos.forEach(item => {
    divprueba.innerHTML += `
    <div class="turnoPruebas card-body text-bg-secondary">
    <h6 class="card-subtitle mb-2 ">Horario del turno: ${item.hora}</h6>
    <p>Nombre Paciente: ${item.nomPa}</p>
    <p>Día del turno: ${item.dia}</p>
    <p>Comentario Adicional: ${item.comentario}</p>
    <p>Tratamiento: ${item.tratamiento}</p>
    <p>Costo final: ${item.costo}</p>
    <button class="eliminar btn btn-light text-bg-secondary" onclick="eliminoTurno()"> Eliminar Turno </button>
    </div>
    `;
    turnosGenerados.append(divprueba); 

  })
  setTimeout(() => {

    divprueba.parentNode.removeChild(divprueba);
  }, 2000);

}

/*  */




prueba && prueba.addEventListener("click",(e) => {
  e.preventDefault();
  MuestraTurno();

}, false);

function generar() {
  let nomPa = document.getElementById("nombrePaciente").value;
  let hora = document.getElementById("hora").value;
  let comentario = document.getElementById("comentario").value;
  let tratamiento = document.getElementById("tratamiento").value;
  let obra = document.getElementById("obra").checked;
  let costo = parseFloat(document.getElementById("costo").value);
  let dia = document.getElementById("dia").value;
  costo=obra ? ((costo = (costo * 0.6).toFixed(2))) : (costo = costo);
  if(nomPa==""||hora==""||tratamiento==""||costo==""||dia==""){alert("Ingrese todos los datos solicitados");}
  else {
  localStorage.getItem("turnos", JSON.stringify(tablaturno));
  tablaturno.push(
    new turno(nomPa, hora, comentario, tratamiento, obra, costo, dia)
  );
  localStorage.setItem("turnos", JSON.stringify(tablaturno));
  document.getElementById("nombrePaciente").value = "";
  document.getElementById("hora").value = "";
  document.getElementById("comentario").value = "";
  document.getElementById("tratamiento").value = "";
  document.getElementById("obra").checked=false;
  document.getElementById("costo").value = "";
  document.getElementById("dia").value = "";
  Swal.fire({
    position: "center",
    icon: "success",
    title: "El turno se ha generado exitosamente!",
    showConfirmButton: false,
    timer: 3000,
  })};

}


/* Función para eliminar turno en específico */
function eliminoTurno(id) {
  let turnos = JSON.parse(localStorage.getItem("turnos"));
  let li = id;
  console.log(li);
  
  Swal.fire({
    title: "Está seguro de eliminar el turno?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, seguro",
    cancelButtonText: "No, no quiero",
  }).then((result) => {
    if (result.isConfirmed) {
      //logica para eleminar del carrito
      
    
  
      Swal.fire({
        title: "Borrado!",
        icon: "success",
        text: "El turno ha sido eliminado",
      });
      turnos.splice(li,1); 
      localStorage.setItem("turnos", JSON.stringify(turnos)); 
      location.reload();
    }
  });
} 
/* Función paras borrar todos lo turnos */
function eliminoLista() {
  let div = document.getElementById("turnosGenerados");
  let turnos = JSON.parse(localStorage.getItem("turnos"));
  Swal.fire({
    title: "Está seguro de eliminar todos los turnos?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, seguro",
    cancelButtonText: "No, no quiero",
  }).then((result) => {
    if (result.isConfirmed) {
      //logica para eleminar del carrito
      console.log(turnos);
      turnos.splice(0);
      localStorage.setItem("turnos", JSON.stringify(turnos));
      div.innerHTML="";
      Swal.fire({
        title: "Borrado!",
        icon: "success",
        text: "Los turnos han sido eliminados",
      });
    }
  });
};
limpiar && limpiar.addEventListener("click", () => {
  eliminoLista();});

genero && genero.addEventListener("click", (e) => {
  e.preventDefault();

  generar();
    setTimeout(() => {
      location.href="./index.html";
    }, 4000);



});




/* Genero una varible para mostrar los turnos en la página inicial */


const muestro = async () =>{
let base = JSON.parse(localStorage.getItem("turnos"));
let div = document.createElement("div");
let turnosGenerados = document.getElementById("turnosGenerados");
div.className="turnos";
base.forEach((turno,idx) => {
  div.innerHTML += `
  <div class="turnoSingular card-body text-bg-secondary">
  <h6 class="card-subtitle mb-2 ">Horario del turno: ${turno.hora}</h6>
  <p>Nombre Paciente: ${turno.nomPa}</p>
  <p>Día del turno: ${turno.dia}</p>
  <p>Comentario Adicional: ${turno.comentario}</p>
  <p>Tratamiento: ${turno.tratamiento}</p>
  <p>Costo final: ${turno.costo}</p>
  <button class="eliminar btn btn-light text-bg-secondary" id="${idx}" onclick="eliminoTurno(${idx})"> Eliminar Turno </button>
  </div>
  `;
  turnosGenerados.append(div);       
} 
);}
  muestro();


