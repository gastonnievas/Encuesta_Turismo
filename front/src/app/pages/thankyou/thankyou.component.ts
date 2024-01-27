import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule,
    FormsModule, ReactiveFormsModule, CommonModule],
  animations:[
    trigger('enterState', [
      state('void', style({
        transform: 'translateY(100%)',
        opacity:0
      })),
      transition(':enter', [
        animate(500, style({
          transform: 'translateY(0)',
          opacity:1
        }))
      ])
    ])
  ]
})
export class ThankyouComponent implements OnInit {
  emailForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });
  isSubscribed: boolean = false; 
  enviando: boolean = false;

  constructor(
    private route: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  button(){
    this.route.navigate(['/home'])
  }

  get email() {
    return this.emailForm.controls['email'];
  }

  async newsletter() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;
      const formData = { email };
      this.enviando = true;

      this.http.post('http://localhost:4001/newsletter', formData).subscribe(
        (response) => {
          console.log(response);
          this.isSubscribed = true;
          this.enviando = false;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.emailForm.markAllAsTouched();
    }
  }
}