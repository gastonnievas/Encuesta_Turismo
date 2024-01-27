import {  Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {CommonModule ,JsonPipe, NgFor, NgIf} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule, MatStepper } from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker'; //SPRINT 3
import {MatNativeDateModule} from '@angular/material/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormService } from '../../services/form.service';
import { ErrorService } from 'src/app/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

/** @title Checkboxes with reactive forms */
@Component({
  selector: 'form-app',
  templateUrl: './form.component.html',
  styleUrls: ['form.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatCheckboxModule, JsonPipe,
    MatCardModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatFormFieldModule, MatStepperModule, MatRadioModule, NgFor, NgIf],
})
export class FormComponent implements OnInit, OnDestroy{

  @ViewChild(MatStepper) stepper: MatStepper;


  turista = this._formBuilder.group({
    edad: ['', Validators.required],
    sexo: ['', Validators.required],
    procedencia: ['', Validators.required],
    acompaniantes: ['', Validators.required],
    ingreso: new FormControl(<Date | null>(null), Validators.required), // SPRINT 3
    salida: new FormControl(<Date | null>(null), Validators.required) // SPRINT 3
  });

  difusion = this._formBuilder.group({
    television: false,
    pagina: false,
    radio: false,
    graficos: false,
    facebook: false,
    recomendacion: false,
    otros: '',
  });

  motivo = this._formBuilder.group({
    conocia: false,
    recomendacion: false,
    promocion: false,
    tranquilidad: false,
    paisajes: false,
    eventos: false,
    amabilidad: false,
    otros: "",
  });

  reserva = this._formBuilder.group({
    reserva: ['', Validators.required],
    medioReserva: "",
  });

  tipo_hospedaje = this._formBuilder.group({
    tipo_hospedaje: ['', Validators.required],
    // otrosHospedajes: ""
  });

  calificacion_hospedaje = this._formBuilder.group({
    calificacion_hospedaje: ['', Validators.required],
  });

  material_informativo = this._formBuilder.group({
    recibioMaterial: ['', Validators.required],
  });

 
  oficina = new FormGroup({
    oficinaOption: new FormControl("", Validators.required)})

  tipo_inform = new FormGroup({
      hospedaje: new FormControl(false, Validators.required),
      paseos: new FormControl(false, Validators.required),
      eventos: new FormControl(false, Validators.required),
      gastronomia: new FormControl(false, Validators.required),
      turismo_aventura: new FormControl(false, Validators.required),
      servicios: new FormControl(false, Validators.required),
      rutas: new FormControl(false, Validators.required),
      otros: new FormControl("", Validators.required),
  })

    medio_informacion = new FormGroup({
      personalmente: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      facebook: new FormControl("", Validators.required),
      telefonica: new FormControl("", Validators.required),
      otros: new FormControl("", Validators.required)
    })


    tipo_material = new FormGroup({
      folletos: new FormControl("", Validators.required),
     revistas: new FormControl("", Validators.required),
     planos: new FormControl("", Validators.required),
     calcomanias: new FormControl("", Validators.required),
    guias: new FormControl("", Validators.required)
    })

    calificacion_informacion = new FormGroup({ calificacion: new FormControl('', Validators.required)})

    otra_informacion = new FormGroup({informacion: new FormControl('', Validators.required)})

    que_informacion = new FormGroup({
      espectaculos_MC: new FormControl(false, Validators.required),
     espectaculos_cercanos: new FormControl(false, Validators.required),
     recreacion: new FormControl(false, Validators.required),
     deportivas: new FormControl(false, Validators.required),
     aventuras: new FormControl(false, Validators.required),
     paseos: new FormControl(false, Validators.required),
     otros: new FormControl("", Validators.required),
    })

  get oficinaOption(){
    return this.oficina.controls['oficinaOption'];
  }

  get tipo_inform_controls(){
    const todo_dentro = {
      hospedaje: this.tipo_inform.controls['hospedaje'],
      paseos: this.tipo_inform.controls['paseos'],
      eventos: this.tipo_inform.controls['eventos'],
      gastronomia: this.tipo_inform.controls['gastronomia'],
      turismo_aventura: this.tipo_inform.controls['turismo_aventura'],
      servicios: this.tipo_inform.controls['servicios'],
      rutas: this.tipo_inform.controls['rutas'],
      otros: this.tipo_inform.controls['otros'],};

    return todo_dentro;
  }

  get medio_informacion_controls(){
    const todo_dentro = {
      personalmente: this.medio_informacion.controls['personalmente'],
      email: this.medio_informacion.controls['email'],
      facebook: this.medio_informacion.controls['facebook'],
      telefonica: this.medio_informacion.controls['telefonica'],
      otros: this.medio_informacion.controls['otros'],};

    return todo_dentro;
  }

  get tipo_material_controls(){
    const todo_dentro = {
      folletos: this.tipo_material.controls['folletos'],
      revistas: this.tipo_material.controls['revistas'],
      planos: this.tipo_material.controls['planos'],
      calcomanias: this.tipo_material.controls['calcomanias'],
      guias: this.tipo_material.controls['guias']};

    return todo_dentro;
  }

  get calificacion_informacion_controls(){
    return this.calificacion_informacion.controls['calificacion'];
  }

  get otra_informacion_controls(){
    return this.otra_informacion.controls['informacion'];
  }

  get que_informacion_controls(){
    const todo_dentro = {
      espectaculos_MC: this.que_informacion.controls['espectaculos_MC'],
      espectaculos_cercanos: this.que_informacion.controls['espectaculos_cercanos'],
      recreacion: this.que_informacion.controls['recreacion'],
      deportivas: this.que_informacion.controls['deportivas'],
      aventuras: this.que_informacion.controls['aventuras'],
      paseos: this.que_informacion.controls['paseos'],
      otros: this.que_informacion.controls['otros']};

    return todo_dentro;
  }


  subscriptionOficina?: Subscription;

  ngOnInit(): void {
        this.subscriptionOficina = this.oficinaOption.valueChanges.subscribe((tipo_inform_controls) =>
        tipo_inform_controls === "No" ? this.tipo_inform.disable() : this.tipo_inform.enable())

        this.subscriptionOficina = this.oficinaOption.valueChanges.subscribe((medio_informacion_controls) =>
        medio_informacion_controls === "No" ? this.medio_informacion.disable() : this.medio_informacion.enable())

        this.subscriptionOficina = this.oficinaOption.valueChanges.subscribe((tipo_material_controls) =>
        tipo_material_controls === "No" ? this.tipo_material.disable() : this.tipo_material.enable())

        this.subscriptionOficina = this.oficinaOption.valueChanges.subscribe((calificacion_informacion_controls) =>
        calificacion_informacion_controls === "No" ? this.calificacion_informacion.disable() : this.calificacion_informacion.enable())

        this.subscriptionOficina = this.oficinaOption.valueChanges.subscribe((otra_informacion_controls) =>
        otra_informacion_controls === "No" ? this.otra_informacion.disable() : this.otra_informacion.enable())

        this.subscriptionOficina = this.oficinaOption.valueChanges.subscribe((que_informacion_controls) =>
        que_informacion_controls === "No" ? this.que_informacion.disable() : this.que_informacion.enable())
  }

  ngOnDestroy(): void {
      this.subscriptionOficina?.unsubscribe;
  }

   calificacion_MC = this._formBuilder.group({
    calificacion_MC: ['', Validators.required],
    porque: ""
   });

   recomendaria = this._formBuilder.group({
    recomendaria: ['', Validators.required],
    porque: ""
  });

  
  constructor(private _formBuilder: FormBuilder, private route: Router, private formService: FormService, private _errorService: ErrorService) {

  }
  
  atLeastOneCheckboxSelected(stepIndex: number): boolean {
      switch (stepIndex) {
      case 1: 
        const difusionForm = this.difusion.controls; 
        return (
          difusionForm.television.value ||
          difusionForm.pagina.value ||
          difusionForm.radio.value ||
          difusionForm.graficos.value ||
          difusionForm.facebook.value ||
          difusionForm.recomendacion.value ||
          (difusionForm.otros.value && difusionForm.otros.value.trim() !== '')
        );
        break;
      case 2:
        const motivoForm = this.motivo.controls;
        return (
          motivoForm.conocia.value ||
          motivoForm.recomendacion.value ||
          motivoForm.promocion.value ||
          motivoForm.tranquilidad.value ||
          motivoForm.paisajes.value ||
          motivoForm.eventos.value ||
          motivoForm.amabilidad.value ||
          (motivoForm.otros.value && motivoForm.otros.value.trim() !== '')
        );
        break;
      default:
        return true; 
    }
  }

  submitForm(data1:Object, data2:Object, data3:Object, data4:Object, data5:Object, data6:Object, data7:Object, data8:Object, data9:Object, data10:Object, data11:Object, data12:Object, data13:Object, data14:Object, data15:Object, data16:Object){
    
    const opData2 = Object.keys(this.difusion.controls).filter(opcion => this.difusion.get(opcion)?.value);
    const filter2: { [key: string]: boolean } = {};

    opData2.forEach(opcion => {
      filter2[opcion] === true ;
    });

    const opData3 = Object.keys(this.motivo.controls).filter(opcion => this.motivo.get(opcion)?.value);
    const filter3: { [key: string]: boolean } = {};

    opData3.forEach(opcion => {
      filter3[opcion] === true || String;
    });

    const opData9 = Object.keys(this.tipo_inform.controls);
    const control9 = opData9.filter(controlName => this.tipo_inform.get(controlName)?.value === true);

    const filter9: { [key: string]: boolean } = {};
    control9.forEach(controlName => {
      filter9[controlName] === true || String;
    });

    const opData10 = Object.keys(this.medio_informacion.controls);
    const control10 = opData10.filter(controlName => this.medio_informacion.get(controlName)?.value === true);

    const filter10: { [key: string]: boolean } = {};
    control10.forEach(controlName => {
      filter10[controlName] === true || String;
    });


    const opData11 = Object.keys(this.tipo_material.controls);
    const control11 = opData11.filter(controlName => this.tipo_material.get(controlName)?.value === true);

    const filter11: { [key: string]: boolean } = {};
    control11.forEach(controlName => {
      filter11[controlName] === true || String;
    });

    const opData14 = Object.keys(this.que_informacion.controls);
    const control14 = opData14.filter(controlName => this.que_informacion.get(controlName)?.value === true);

    const filter14: { [key: string]: boolean } = {};
    control14.forEach(controlName => {
      filter14[controlName] === true || String;
    });


    const data = {
      turista: data1,
      difusion: data2,
      motivo: data3,
      reserva: data4,
      tipo_hospedaje: data5,
      calificacion_hospedaje: data6,
      material_informativo: data7,
      oficina: data8,
      tipo_informacion: data9,
      medio_informacion: data10,
      tipo_material: data11,
      calificacion_informacion: data12, 
      otra_informacion: data13, 
      que_informacion: data14, 
      calificacion_MC: data15, 
      recomendaria: data16}

      const jsonForm = JSON.stringify(data);  

      this.formService.enviarFormulario(jsonForm).subscribe({
        next: (jsonForm) => {
          console.log(jsonForm)
          this.route.navigate(['/thankyou'])
        },
        error: (e: HttpErrorResponse) => {
          this._errorService.msjError(e);
        }
      })
  }
}