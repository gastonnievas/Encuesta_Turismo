import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions} from 'chart.js'
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  standalone: true,
  imports: [NgChartsModule,NgIf, NgFor, MatSelectModule,MatFormFieldModule,MatInputModule,FormsModule]
})
export class ChartComponent implements OnInit {
  selectedChartName: string;
  chartNames: string[] = ['-', 'Turista', 'Medios', 'Motivo', 'Hospedaje', 'Oficina', 'Recomendaria'];
  
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false, 
  };

  public chartOptionsBar: ChartOptions<'bar'> = {
    responsive: true
  };

  // CHART GENERO
  masculino = 0;
  femenino = 0;


  public pieChartLabels = [['Masculino'], ['Femenino']];
  public pieChartDatasets = [ { data: [this.masculino,this.femenino], backgroundColor: [
    'rgb(54, 162, 235)',
          'rgb(255, 99, 132)'], hoverBackgroundColor: ['rgb(54, 162, 235)',
          'rgb(255, 99, 132)'] } ];
  public pieChartType = 'pie';

  // CHART EDAD PIE
mayoresDe18 = 0;
mayoresDe25 = 0;
mayoresDe40 = 0;
mayoresDe55 = 0;

  public pieChartLabelsEdad = [['Mayores de 18'], ['Mayores de 25'], ['Mayores de 40'], ['Mayores de 55'], ];
  public pieChartDatasetsEdad = [{ data: [this.mayoresDe18, this.mayoresDe25, this.mayoresDe40, this.mayoresDe55]}]

    // CHART PROCEDENCIA BAR
cordoba = 0;
otraLocalidad = 0;
otraProvincia = 0;
otroPais = 0;


  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ ['Ciudad de Córdoba'], ['Otra localidad'], ['Otra provincia'], ['Otro país'] ],
    datasets: [
      { data: [this.cordoba, this.otraLocalidad, this.otraProvincia, this.otroPais], backgroundColor: [
        'rgb(68, 155, 201)',
        'rgb(138, 96, 168)',
        'rgb(123, 186, 110)',
        'rgb(214, 125, 92)']}

    ]
  };

    // CHART DIFUSION PIE

    television = 0;
    pagina = 0;
    radio = 0;
    graficos = 0;
    facebook = 0;
    recomendacion = 0;
    otrosD = 0;

    public pieChartLabelsDifusion = [['Television'],['Pagina'],['Radio'],['Gráficos'],['Facebook'],['Recomendacion'],['Otros'], ];
    public pieChartDatasetsDifusion = [{ data: [this.television, this.pagina, this.radio, this.graficos, this.facebook, this.recomendacion, this.otrosD]}]


    // CHART MOTIVO BAR

    conocia = 0;
    recomendacionM = 0;
    promocion = 0;
    tranquilidad = 0;
    paisajes = 0;
    eventos = 0;
    amabilidad = 0;
    otrosM = 0;

    public barChartDataMotivo: ChartConfiguration<'bar'>['data'] = {
      labels: [ ['Conocia'], ['Recomendación'], ['Promoción'], ['Tranquilidad'],['Paisajes'], ['Eventos'], ['Amabilidad'], ['Otros'] ],
      datasets: [
        { data: [this.conocia, this.recomendacionM, this.promocion, this.tranquilidad,this.paisajes,this.eventos,this.amabilidad,this.otrosM,], backgroundColor: [
          'rgb(68, 155, 201)',
          'rgb(138, 96, 168)',
          'rgb(123, 186, 110)',
          'rgb(214, 125, 92)',
          'rgb(236, 324, 23)',
          'rgb(138, 73, 103)',
          'rgb(8, 186, 100)',
          'rgb(214, 125, 212)']}
  
      ]
    };

    // CHART RESERVA PIE

    conReserva = 0;
    sinReserva = 0;


  public pieChartLabelsReserva = [['Con Reserva'], ['Sin Reserva']];
  public pieChartDatasetsReserva = [ { data: [this.conReserva,this.sinReserva]}];

    // CHART TIPO HOSPEDAJE BAR
    
    hotel = 0;
    cabana = 0;
    hosteria = 0;
    camping = 0;
    casaDeAlquiler = 0;
    otroH = 0;

    public barChartDataTipoHospedaje: ChartConfiguration<'bar'>['data'] = {
      labels: [ ['Hotel'], ['Cabaña'], ['Hosteria'], ['Camping'],['Casa de alquiler'], ['Otro Hospedaje'] ],
      datasets: [
        { data: [this.hotel, this.cabana, this.hosteria, this.camping,this.casaDeAlquiler,this.otroH,], backgroundColor: [
          'rgb(68, 155, 201)',
          'rgb(138, 96, 168)',
          'rgb(123, 186, 110)',
          'rgb(214, 125, 92)',
          'rgb(36, 324, 23)',
          'rgb(138, 73, 103)']}
      ]
    };

    // CHART CALIFICACION HOSPEDAJE PIE

    excelenteH = 0;
    muyBuenaH = 0;
    buenaH = 0;
    regularH = 0;
    malaH = 0;
    muyMalaH = 0;
    pesimaH = 0;

    public pieChartLabelsCalificacionH = [['Excelente'],['Muy buena'],['Buena'],['Regular'],['Mala'],['Muy Mala'],['Pesima'], ];
    public pieChartDatasetsCalificacionH = [{ data: [this.excelenteH, this.muyBuenaH, this.buenaH, this.regularH, this.malaH, this.muyMalaH, this.pesimaH]}]


    // CHART OFICINA OPTION PIE 

    sinInfo = 0;
    rotonda = 0;
    merlo = 0;
    terminal = 0;

    public pieChartLabelsOficinaOption = [['Sin informacion'],['Oficina de la Rotonda de Ingreso'],['Oficina de Plazoleta Merlo'],['Oficina de la Terminal'] ];
    public pieChartDatasetsOficinaOption = [{ data: [this.sinInfo, this.rotonda, this.merlo, this.terminal]}]

    // CHART TIPO INFORMACION PIE

    hospedaje = 0;
    paseos = 0;
    eventosO = 0;
    gastronomia = 0;
    turismo_aventura = 0;
    servicios = 0;
    rutas = 0;
    otrosT = 0;

    public barChartDataTipoInformacion: ChartConfiguration<'bar'>['data'] = {
      labels: [ ['Hospedaje'], ['Paseos'], ['Eventos'], ['Gastronomia'],['Turismo Aventura'], ['Servicios'], ['Rutas'], ['Otros'] ],
      datasets: [
        { data: [this.hospedaje, this.paseos, this.eventosO, this.gastronomia, this.turismo_aventura,this.servicios, this.rutas, this.otrosT], backgroundColor: [
          'rgb(68, 155, 201)',
          'rgb(138, 96, 168)',
          'rgb(123, 186, 110)',
          'rgb(214, 125, 92)',
          'rgb(36, 324, 23)',
          'rgb(138, 73, 103)',
          'rgb(141, 314, 23)',
          'rgb(8, 73, 203)']}
      ]
    };

    // CHART CALIFICACION INFORMACION PIE

    excelenteI = 0;
    muyBuenaI = 0;
    buenaI = 0;
    regularI = 0;
    malaI = 0;
    muyMalaI = 0;
    pesimaI = 0;

    public pieChartLabelsCalificacionI = [['Excelente'],['Muy buena'],['Buena'],['Regular'],['Mala'],['Muy Mala'],['Pesima'], ];
    public pieChartDatasetsCalificacionI = [{ data: [this.excelenteI, this.muyBuenaI, this.buenaI, this.regularI, this.malaI, this.muyMalaI, this.pesimaI]}]


    // CHART CALIFICACION MINA CLAVERO PIE

    siMC = 0;
    noMC = 0;


  public pieChartLabelsCalificacionMC = [['Si'], ['No']];
  public pieChartDatasetsCalificacionMC = [ { data: [this.siMC,this.noMC], backgroundColor: [
    'rgb(4, 162, 235)',
          'rgb(25, 99, 132)'], hoverBackgroundColor: ['rgb(54, 162, 235)',
          'rgb(255, 99, 132)'] } ];


    // CHART RECOMENDARIA PIE
    
    siR = 0;
    noR = 0;

    public pieChartLabelRecomendaria = [['Si recomendaria'], ['No recomendaria']];
    public pieChartDatasetsRecomendaria = [ { data: [this.siR,this.noR], backgroundColor: [
      'rgb(4, 162, 235)',
            'rgb(25, 99, 132)'], hoverBackgroundColor: ['rgb(54, 162, 235)',
            'rgb(255, 99, 132)'] } ];

    // mes?

    enero = 0;
    febrero = 0;
    marzo = 0;
    abril = 0;
    mayo = 0;
    junio = 0;
    julio = 0;
    agosto = 0;
    septiembre = 0;
    octubre = 0;
    noviembre = 0;
    diciembre = 0;

    public barChartDataMes: ChartConfiguration<'bar'>['data'] = {
      labels: [ ['Enero'], ['Febrero'], ['Marzo'], ['Abril'],['Mayo'], ['Junio'], ['Julio'], ['Agosto'], ['Septiembre'],['Octubre'], ['Noviembre'], ['Diciembre'] ],
      datasets: [
        { data: [this.enero, this.febrero, this.marzo, this.abril,this.mayo,this.junio,this.julio,this.agosto,this.septiembre,this.octubre,this.noviembre,this.diciembre]}
      ]
    };

  constructor(private http: HttpClient) { 
    this.selectedChartName = this.chartNames[0];
  }  
   ngOnInit() {

    this.http.get<any>('http://localhost:4001/getall').subscribe(data => {

      // INGRESO POR GÉNERO
      const ingresoPorGenero = data.map(item => {
        return {
          ingreso: new Date(item.Turista.ingreso)
        };
      });
  
      ingresoPorGenero.forEach(item => {
        const month = item.ingreso.getMonth();
        // Incrementa el contador de ingresos por mes
        // Sin importar el género
        if(month === 0){
          this.enero++;
        } else if(month === 1){
          this.febrero++;
        } else if(month === 2){
          this.marzo++;
        } else if(month === 3){
          this.abril++;
        } else if(month === 4){
          this.mayo++;
        } else if(month === 5){
          this.junio++;
        } else if(month === 6){
          this.julio++;
        } else if(month === 7){
          this.agosto++;
        } else if(month === 8){
          this.septiembre++;
        } else if(month === 9){
          this.octubre++;
        } else if(month === 10){
          this.noviembre++;
        } else if(month === 11){
          this.diciembre++;
        } 
        
      });
      this.barChartDataMes = {
        labels: [ ['Enero'], ['Febrero'], ['Marzo'], ['Abril'],['Mayo'], ['Junio'], ['Julio'], ['Agosto'], ['Septiembre'],['Octubre'], ['Noviembre'], ['Diciembre'] ],
        datasets: [
          { data: [this.enero, this.febrero, this.marzo, this.abril,this.mayo,this.junio,this.julio,this.agosto,this.septiembre,this.octubre,this.noviembre,this.diciembre]}
        ]
      };
  
  
    
  // GENERO
    const genero = data.map(item => item.Turista.sexo);

      genero.forEach(genero => {
        if (genero === "Masculino") {
          this.masculino++;
        } else if (genero === "Femenino") {
          this.femenino++;
        }
      });

      // Configura el gráfico después de procesar los datos
      this.pieChartDatasets = [
        { data: [this.masculino, this.femenino], backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)'], hoverBackgroundColor: ['rgb(54, 162, 235)',
          'rgb(255, 99, 132)'] 
        }, 
      ];
      
// EDAD

      const edad = data.map(item => item.Turista.edad);

      edad.forEach(edad =>{
        if(edad <= 25 && edad > 18){
          this.mayoresDe18++;
        } else if(edad >= 25 && edad < 40){
          this.mayoresDe25++;
        } else if(edad >= 40 && edad < 55){
          this.mayoresDe40++;
        } else if(edad >= 55){
          this.mayoresDe55++;
        }
        
      });
      // Configuracion gráfico de EDAD
      this.pieChartDatasetsEdad = [{ data: [this.mayoresDe18, this.mayoresDe25, this.mayoresDe40, this.mayoresDe55]}]

      // PROCEDENCIA
      const procedencia = data.map(item => item.Turista.procedencia);

      procedencia.forEach(procedencia =>{
        if(procedencia === "Ciudad De Córdoba"){
          this.cordoba++;
        } else if (procedencia === "Otra localidad de Córdoba"){
          this.otraLocalidad++;
        } else if(procedencia === "Otra provincia"){
          this.otraProvincia++;
        } else if(procedencia ==="Otro país"){
          this.otroPais++;
        }
      })
       // Configuracion gráfico de PROCEDENCIA
      this.barChartData = {
        labels: [ ['Ciudad de Córdoba'], ['Otra localidad'], ['Otra provincia'], ['Otro país'] ],
        datasets: [
          { data: [this.cordoba, this.otraLocalidad, this.otraProvincia, this.otroPais], backgroundColor: [
            'rgb(68, 155, 201)',
            'rgb(138, 96, 168)',
            'rgb(123, 186, 110)',
            'rgb(214, 125, 92)']}
        ]
      }

      // DIFUSION
      const difusion = data.map(item => item.Difusion);

      difusion.forEach(item =>{
        if(item.television === true){
          this.television++;
        }else if(item.pagina === true){
          this.pagina++
        }else if(item.radio === true){
          this.radio++
        }else if(item.graficos === true){
          this.graficos++
        }else if(item.facebook === true){
          this.facebook++
        }else if(item.recomendacion === true){
          this.recomendacion++
        }else if(item.otros === true){
          this.otrosD++
        }
      })
      //Configuracion gráfico de DIFUSION
      this.pieChartDatasetsDifusion = [{ data: [this.television, this.pagina, this.radio, this.graficos, this.facebook, this.recomendacion, this.otrosD]}]

      // MOTIVO

      const motivo = data.map(item => item.Motivo);

      motivo.forEach(item =>{
        if(item.conocia){
          this.conocia++
        }else if(item.recomendacion){
          this.recomendacionM++
        }else if(item.promocion){
          this.promocion++
        }else if(item.tranquilidad){
          this.tranquilidad++
        }else if(item.paisajes){
          this.paisajes++
        }else if(item.eventos){
          this.eventos++
        }else if(item.amabilidad){
          this.amabilidad++
        }else if(item.otros){
          this.otrosM++
        }
      })
      //Configuración gráfico de MOTIVO
      this.barChartDataMotivo = {
        labels: [ ['Conocia'], ['Recomendación'], ['Promoción'], ['Tranquilidad'],['Paisajes'], ['Eventos'], ['Amabilidad'], ['Otros'] ],
        datasets: [
          { data: [this.conocia, this.recomendacionM, this.promocion, this.tranquilidad,this.paisajes,this.eventos,this.amabilidad,this.otrosM,], backgroundColor: [
            'rgb(68, 155, 201)',
            'rgb(138, 96, 168)',
            'rgb(123, 186, 110)',
            'rgb(214, 125, 92)',
            'rgb(19, 100, 201)',
            'rgb(138, 73, 103)',
            'rgb(8, 186, 100)',
            'rgb(214, 125, 212)']}
    
        ]
      };

      // RESERVA

      const reserva = data.map(item => item.Reserva);

      reserva.forEach(item =>{
        if(item.reserva === "Con reserva"){
          this.conReserva++;
        }else if(item.reserva === "Sin reserva"){
          this.sinReserva++
        }
        
      })

      this.pieChartLabelsReserva = [['Con Reserva'], ['Sin Reserva']];
      this.pieChartDatasetsReserva = [ { data: [this.conReserva,this.sinReserva] } ];

      // TIPO HOSPEDAJE

      const tipo_Hospedaje = data.map(item => item.Tipo_Hospedaje.tipo_hospedaje);

      tipo_Hospedaje.forEach(item => {
        if(item === "Hotel"){
          this.hotel++
        }else if (item === "Cabana"){
          this.cabana++
        }else if (item === "Hosteria"){
          this.hosteria++
        }else if (item === "Camping"){
          this.camping++
        }else if (item === "Casa_de_alquiler"){
          this.casaDeAlquiler++
        }else if (item === "Otro_hospedaje"){
          this.otroH++
        }
        
      })
      this.barChartDataTipoHospedaje = {
        labels: [ ['Hotel'], ['Cabaña'], ['Hosteria'], ['Camping'],['Casa de alquiler'], ['Otro Hospedaje'] ],
        datasets: [
          { data: [this.hotel, this.cabana, this.hosteria, this.camping,this.casaDeAlquiler,this.otroH,], backgroundColor: [
            'rgb(68, 155, 201)',
            'rgb(138, 96, 168)',
            'rgb(123, 186, 110)',
            'rgb(214, 125, 92)',
            'rgb(185, 324, 203)',
            'rgb(138, 73, 103)']}
        ]
      };

      // CALIFICACION HOSPEDAJE

      const calificacionHospedaje = data.map(item => item.Calificacion_Hospedaje.calificacion_hospedaje);

      calificacionHospedaje.forEach(item =>{
        if(item === "Excelente"){
          this.excelenteH++
        } else if(item === "Muy_buena"){
          this.muyBuenaH++
        }else if(item === "Buena"){
          this.buenaH++
        }else if(item === "Regular"){
          this.regularH++
        }else if(item === "Mala"){
          this.malaH++
        }else if(item === "Muy_mala"){
          this.muyMalaH++
        }else if(item === "Pesima"){
          this.pesimaH++
        }
        
      })
      this.pieChartDatasetsCalificacionH = [{ data: [this.excelenteH, this.muyBuenaH, this.buenaH, this.regularH, this.malaH, this.muyMalaH, this.pesimaH]}];

      // OFICINA OPTION 

      const oficinaOp = data.map(item => item.Oficina.oficinaOption);

      oficinaOp.forEach(item =>{
        if(item === "No"){
          this.sinInfo++
        }else if(item === "Rotonda_ingreso"){
          this.rotonda++
        }else if(item === "Merlo"){
          this.merlo++
        }else if(item === "Terminal"){
          this.terminal++
        }
      })

      this.pieChartDatasetsOficinaOption = [{ data: [this.sinInfo, this.rotonda, this.merlo, this.terminal]}]

      // TIPO INFORMACION

      const tipoInformacion = data.map(item => item.Tipo_Informacion)

      tipoInformacion.forEach(item =>{
        if(item.hospedaje){
          this.hospedaje++
        }else if(item.paseos){
          this.paseos++
        }else if(item.eventos){
          this.eventosO++
        }else if(item.gastronomia){
          this.gastronomia++
        }else if(item.turismo_aventura){
          this.turismo_aventura++
        }else if(item.servicios){
          this.servicios++
        }else if(item.rutas){
          this.rutas++
        }else if(item.otros){
          this.otrosT++
        }
      })

      this.barChartDataTipoInformacion = {
        labels: [ ['Hospedaje'], ['Paseos'], ['Eventos'], ['Gastronomia'],['Turismo Aventura'], ['Servicios'], ['Rutas'], ['Otros'] ],
        datasets: [
          { data: [this.hospedaje, this.paseos, this.eventosO, this.gastronomia, this.turismo_aventura,this.servicios, this.rutas, this.otrosT], backgroundColor: [
            'rgb(68, 155, 201)',
            'rgb(138, 96, 168)',
            'rgb(123, 186, 110)',
            'rgb(214, 125, 92)',
            'rgb(19, 100, 201)',
            'rgb(138, 73, 103)',
            'rgb(141, 314, 23)',
            'rgb(8, 73, 203)']}
        ]
      };

      // CALIFICACION INFORMACION 

      const calificacionInformacion = data.map(item => item.Calificacion_Informacion.calificacion);

      calificacionInformacion.forEach(item =>{
        if(item === "Excelente"){
          this.excelenteI++
        } else if(item === "Muy_buena"){
          this.muyBuenaI++
        }else if(item === "Buena"){
          this.buenaI++
        }else if(item === "Regular"){
          this.regularI++
        }else if(item === "Mala"){
          this.malaI++
        }else if(item === "Muy_mala"){
          this.muyMalaI++
        }else if(item === "Pesima"){
          this.pesimaI++
        }
        
      })
      
      this.pieChartDatasetsCalificacionI = [{ data: [this.excelenteI, this.muyBuenaI, this.buenaI, this.regularI, this.malaI, this.muyMalaI, this.pesimaI]}]

      // CALIFICACION MINA CLAVERO

      const QMC = data.map(item => item.Calificacion_MC.calificacion_MC);

      QMC.forEach(item => {
        if (item === "Si") {
          this.siMC++;
        } else if (item === "No") {
          this.noMC++;
        }
      });

      this.pieChartDatasetsCalificacionMC = [ { data: [this.siMC,this.noMC], backgroundColor: [
        'rgb(4, 162, 235)',
              'rgb(25, 99, 132)'], hoverBackgroundColor: ['rgb(54, 162, 235)',
              'rgb(255, 99, 132)'] } ];

      // RECOMENDARIA?

      const recomendaria = data.map(item => item.Recomendaria.recomendaria);

      recomendaria.forEach(item => {
        if(item === "Si"){
          this.siR++
        }else if(item === "No"){
          this.noR++
        }
      })

      this.pieChartDatasetsRecomendaria = [ { data: [this.siR,this.noR], backgroundColor: [
        'rgb(4, 162, 235)',
              'rgb(25, 99, 132)'], hoverBackgroundColor: ['rgb(54, 162, 235)',
              'rgb(255, 99, 132)'] } ];

    });
  }
  
}