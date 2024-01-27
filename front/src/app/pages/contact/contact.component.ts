import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ContactService } from 'src/app/services/contact.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [MatOptionModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule, CommonModule]

})
export class ContactComponent implements OnInit {
  enviando: boolean = false;
  isSubscribed: boolean = false; 

  constructor(private fb: FormBuilder, private contactService: ContactService) {
   }

      formulario: FormGroup = this.fb.group({
      Name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      messageType: ['Consulta', Validators.required]
    });

    Form = new FormGroup({
      Name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      message: new FormControl("", Validators.required)
    })

  ngOnInit(): void {
  }

  get email(){
    return this.formulario.controls['email'];
  }
  get Name(){
    return this.formulario.controls['Name'];
  }
  get message(){
    return this.formulario.controls['message'];
  }
    
  onSubmit(data) {
    const contact = {
      Name: data.Name,
      email: data.email,
      message: data.message
    }

    const jsonForm = JSON.stringify(contact);
      if(this.formulario.valid){
        this.enviando = true;
        this.contactService.enviarFormulario(jsonForm).subscribe({
          next: (jsonForm) => {
            console.log('Formulario enviado con éxito', jsonForm);
            this.isSubscribed = true;
            this.enviando = false;
          }, error: (error) => {
            console.log(error)
          }
        })
      }else{
        this.formulario.markAllAsTouched()
        console.log('No se pudo enviar el formulario por que faltaron datos')
      }
    
  }
}
  


