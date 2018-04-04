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




$("#tasks").click(function() {
  $('#dashboard').empty();
  $('#dashboard').append(`
    <div class="row">
    <div class="container-canvas">
        <canvas id="personalRoutes"></canvas>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-6" id="choferes">
      <h3 class="text-center bolder">TOP 10</h3>
      <table class="table" id="myTable">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
          </tr>
        </thead>
        <tbody id="nombre">
        </tbody>
      </table>
    </div>
    <div class="col-xl-6" id="choferes2">
    <h3 class="text-center bolder">LOWEST 10</h3>
      <table class="table" id="myTable2">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
          </tr>
        </thead>
        <tbody id="nombre2">
        </tbody>
      </table>
    </div>
  </div>`)
  totalTrucks();
  for (let i = 0; i < camiones.length; i++) {
    if (camiones[i].top) {
      $('#nombre').append(`
        <tr>
        <td>${camiones[i].top}</td>
        <td>${camiones[i].chofer}</td>
        </tr>        
            `);
    }
  }
  for (let i = 19; i < camiones.length; i--) {
    if (camiones[i].top) {
      $('#nombre2').append(`
        <tr>
        <td>${camiones[i].top}</td>
        <td>${camiones[i].chofer}</td>
        </tr>        
            `);
    }
  }
});

$(document).ready(function() {
  loadDashboard();
});

$('#submenu1').click(function() {
  $('#dashboard').empty();
  loadDashboard();
})

$('#submenu2').click(function() {
  $('#dashboard').empty();
  $('#dashboard').append(`
  <div class="row">
  <div class="container-canvas">
      <canvas id="personalRoutes"></canvas>
    </div>
  </div>`)
  drawChart2();

})

function drawChart2() {
 // GRAFICO DE BARRAS
 var personalRoutes = document.getElementById("personalRoutes");
 var barChart = new Chart(personalRoutes, {
   type: "bar",
   data: {
     datasets: [{
         label: "Real",
         data: [5, 7, 7, 5],
         backgroundColor: "#212529",
       },
       {
         label: "Proyectado",
         data: [5, 6, 8, 3, 3, 13, 5, 12, 23, 23, 25, 30],
         backgroundColor: "#7cc142",
       }
     ],
     labels: ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"],
   },
   options: {
     responsive: true,
     title: {
       display: true,
       text: `Camiones Empleados`,
     }
   },
 });
}
function loadDashboard() {
  $('#dashboard').append(`
      <div class="row">
        <div class="col"
          <div class="card">
            <div class="card-header">
              <strong><h3 class="text-center">Datos en tiempo real</h3></strong>
            </div>
          </div>
        </div>
      </div>
      <div class="row totalWorkers">
        <div class="col">
          <div class="card">
            <div class="card-header">
              Total de Trabajadores
            </div>
            <div class="card-body">
              <p>20</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-header">
              Trabajadores Disponibles
            </div>
            <div class="card-body">
              <p>3</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-header">
              Total de Entregas
            </div>
            <div class="card-body">
              <p>267</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-header">
              Total de Conflictos
            </div>
            <div class="card-body">
              <p>3</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6">
          <div class="card">
            <div class="card-header">
              Estatus de Productos
            </div>
            <div class="card-body">
              <div id="donut_single" style=""></div>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="card">
            <div class="card-header">
              Problemas en Entregas
            </div>
            <div class="card-body">
              <div class="" id="Problemas">
              </div>
            </div>
          </div>
        </div>
      </div>
      `);
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
  <div class="noPadding col-5 progress">
  <div class="progress-bar bg-success" role="progressbar" style="width:${gps/totalProblemas*100}%" aria-valuenow="${gps}" aria-valuemin="0" aria-valuemax="${totalProblemas}"></div>
  </div><div class="col-2">${Math.round(gps/totalProblemas*100)}%</div>
  <div>GPS no funciona</div></div>
  <div class="row">
  <div class="noPadding col-5 progress">
  <div class="progress-bar bg-info" role="progressbar" style="width:${direccion/totalProblemas*100}%" aria-valuenow="${direccion}" aria-valuemin="0" aria-valuemax="${totalProblemas}"></div>
  </div><div class="col-2">${Math.round(direccion/totalProblemas*100)}%</div><div>Dirección no encontrada</div>
  </div>
  <div class="row">
  <div class="noPadding col-5 progress">
  <div class="progress-bar bg-warning" role="progressbar" style="width: ${tecnica/totalProblemas*100}%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
  </div><div class="col-2">${Math.round(tecnica/totalProblemas*100)}%</div><div>Falla Técnica</div>
  </div>
  <div class="row">
  <div class="noPadding col-5 progress">
  <div class="progress-bar bg-danger" role="progressbar" style="width: ${trafico/totalProblemas*100}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
  </div><div class="col-2">${Math.round(trafico/totalProblemas*100)}%</div><div>Alto Tráfico</div></div>
  <div class="row">
  <div class="noPadding col-5 progress">
  <div class="progress-bar bg-danger" role="progressbar" style="width: ${personal/totalProblemas*100}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
  </div><div class="col-2">${Math.round(personal/totalProblemas*100)}%</div><div>Personal</div></div>
  `)
}

Chart.defaults.scale.ticks.beginAtZero = true;


function totalTrucks() {
  // GRAFICO DE BARRAS
  var personalRoutes = document.getElementById("personalRoutes");
  var barChart = new Chart(personalRoutes, {
    type: "bar",
    data: {
      datasets: [{
          label: "T. Definido",
          data: [2, 3, 7, 8, 3, 7, 8, 2, 9, 21],
          backgroundColor: "#212529",
        },
        {
          label: "T. Real",
          data: [5, 6, 8, 3, 3, 13, 5, 12, 23, 2],
          backgroundColor: "#7cc142",
        }
      ],
      labels: ["FGH679", "DFAS21", "JKLÑ12", "DFAS21", "JKLÑ12", "DFAS21", "JKLÑ12", "FGH679", "DFAS21", "JKLÑ12"],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: `Cumplimiento total de Camiones`,
      }
    },
  });
}