// Hide submenus
$("#body-row .collapse").collapse("hide");

// Collapse/Expand icon
$("#collapse-icon").addClass("fa-angle-double-left");

// Collapse click
$("[data-toggle=sidebar-colapse]").click(function() {
  SidebarCollapse();
});

function SidebarCollapse() {
  $(".menu-collapsed").toggleClass("d-none");
  $(".sidebar-submenu").toggleClass("d-none");
  $(".submenu-icon").toggleClass("d-none");
  $("#sidebar-container").toggleClass("sidebar-expanded sidebar-collapsed");

  // Treating d-flex/d-none on separators with title
  var SeparatorTitle = $(".sidebar-separator-title");
  if (SeparatorTitle.hasClass("d-flex")) {
    SeparatorTitle.removeClass("d-flex");
  } else {
    SeparatorTitle.addClass("d-flex");
  }

  // Collapse/Expand icon
  $("#collapse-icon").toggleClass("fa-angle-double-left fa-angle-double-right");
}
$(document).ready(function() {});
console.log(routes);
let contadorTrue = 0;
let contadorFalse = 0;
let gps = 0;
let direccion = 0;
let tecnica = 0;
let trafico = 0;
let personal = 0;
let totalProblemas = 0;
for (let i = 0; i < routes.length; i++) {
  if (routes[i].Realizacion === true) {
    contadorTrue++;
  } else {
    contadorFalse++;
  }
  if (routes[i].Problemas) {
    for (let k = 0; k < routes[i].Problemas.length; k++) {
      totalProblemas++
      if (routes[i].Problemas[k].Tipo === "GPS no funciona") {
        gps++;
      } else if (routes[i].Problemas[k].Tipo === "Direccion no encontrada") {
        direccion++;
      } else if (routes[i].Problemas[k].Tipo === "Falla Técnica") {
        tecnica++;
      } else if (routes[i].Problemas[k].Tipo === "Alto tráfico") {
        trafico++;
      } else {
        personal++;
      }
    }
  }
}
porcentajeTrue = contadorTrue / routes.length * 100;
console.log(gps, 'gps');
console.log(direccion, 'direccion');
console.log(tecnica, 'tecnica');
console.log(trafico, 'trafico');
console.log(personal, 'personal');


google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Productos", "Porcentaje"],
    ["Entregados", porcentajeTrue],
    ["Pendiente", 100 - porcentajeTrue]
  ]);

  var options = {
    pieHole: 0.4,
    colors: ['#7cc142', 'rgb(20, 45, 60)']
  };

  var chart = new google.visualization.PieChart(document.getElementById('donut_single'));
  chart.draw(data, options);
}

$("#Problemas").append(`
<div class="row">
<div class=" col-5 progress">
<div class="progress-bar bg-success" role="progressbar" style="width:${gps/totalProblemas*100}%" aria-valuenow="${gps}" aria-valuemin="0" aria-valuemax="${totalProblemas}"></div>
</div><div class="col-2">${Math.round(gps/totalProblemas*100)}%</div>
<div>GPS no funciona</div></div>
<div class="row">
<div class=" col-5 progress">
<div class="progress-bar bg-info" role="progressbar" style="width:${direccion/totalProblemas*100}%" aria-valuenow="${direccion}" aria-valuemin="0" aria-valuemax="${totalProblemas}"></div>
</div><div class="col-2">${Math.round(direccion/totalProblemas*100)}%</div><div>Direcc no encontrada</div>
</div>
<div class="row">
<div class="col-5 progress">
<div class="progress-bar bg-warning" role="progressbar" style="width: ${tecnica/totalProblemas*100}%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
</div><div class="col-2">${Math.round(tecnica/totalProblemas*100)}%</div><div>Falla Técnica</div>
</div>
<div class="row">
<div class="col-5 progress">
<div class="progress-bar bg-danger" role="progressbar" style="width: ${trafico/totalProblemas*100}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
</div><div class="col-2">${Math.round(trafico/totalProblemas*100)}%</div><div>Alto Tráfico</div></div>
<div class="row">
<div class="col-5 progress">
<div class="progress-bar bg-danger" role="progressbar" style="width: ${personal/totalProblemas*100}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
</div><div class="col-2">${Math.round(personal/totalProblemas*100)}%</div><div>Personal</div></div>
`)

$('#nTrabajadores').append(`<div> <p>${data.camiones.length}</p> </div>`)