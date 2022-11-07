let genero = document.getElementById("generar");

let contenido = document.getElementById("contenido");
let eliminar = document.getElementById("eliminar");
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

function generar() {
  let nomPa = document.getElementById("nombrePaciente").value;
  let hora = document.getElementById("hora").value;
  let comentario = document.getElementById("comentario").value;
  let tratamiento = document.getElementById("tratamiento").value;
  let obra = document.getElementById("obra").checked;
  let costo = parseFloat(document.getElementById("costo").value);
  let dia = document.getElementById("dia").value;
  costo=obra ? ((costo = (costo * 0.6).toFixed(2))) : (costo = costo);
  (nomPa==""||hora==""||tratamiento==""||costo==""||dia=="")?alert("Ingrese todos los datos solicitados"):
  (localStorage.getItem("turnos", JSON.stringify(tablaturno)),
  tablaturno.push(
    new turno(nomPa, hora, comentario, tratamiento, obra, costo, dia)
  ),
  localStorage.setItem("turnos", JSON.stringify(tablaturno)),
  document.getElementById("nombrePaciente").value = "",
  document.getElementById("hora").value = "",
  document.getElementById("comentario").value = "",
  document.getElementById("tratamiento").value = "",
  document.getElementById("obra").checked=false,
  document.getElementById("costo").value = "",
  document.getElementById("dia").value = "",
  Swal.fire({
    position: "center",
    icon: "success",
    title: "El turno se ha generado exitosamente!",
    showConfirmButton: false,
    timer: 3000,
  }));
  /* console.log(tablaturno); */
}



function eliminoTurno(e) {
  let div = document.getElementById("turnosGenerados");
  let turnos = JSON.parse(localStorage.getItem("turnos"));
  Swal.fire({
    title: "Está seguro de eliminar el turno?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, seguro",
    cancelButtonText: "No, no quiero",
  }).then((result) => {
    if (result.isConfirmed) {
      //logica para eleminar del carrito
      console.log(turnos.nomPa);
      
      
      /* const borrar = turnos.find( ,id) => id=idx; */
      /* turnos.splice(0,1); */

      div.innerHTML="";
      Swal.fire({
        title: "Borrado!",
        icon: "success",
        text: "El turno ha sido eliminado",
      });
    }
  });
} 
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
    }, 8000);
  // /* Hago función que recolecte los datos y en otra función genero la card */


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
  <button class="eliminar btn btn-light text-bg-secondary" id="${idx}" onclick="eliminoTurno()"> Eliminar Turno </button>
  </div>
  `;
  turnosGenerados.append(div);       
} 
);}

  muestro();