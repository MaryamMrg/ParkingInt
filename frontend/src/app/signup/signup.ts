import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup , FormBuilder,Validators,ReactiveFormsModule } from '@angular/forms';
import { Authservice ,RegisterRequest} from '../authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup implements OnInit{

  registerForm : FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
 
    constructor(private formBuilder: FormBuilder,
    private authService: Authservice,
    private router: Router){
      this.registerForm= this.formBuilder.group({
        name:['',[Validators.required]],
        email:['',[Validators.required]],
        password:['',[Validators.required]],
        role:['',[Validators.required]]
      });


  }
  ngOnInit(): void {
    this.errorMessage='';
    this.successMessage='';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      const data :  RegisterRequest= this.registerForm.value;
      this.authService.register(data).subscribe({
        next : (response) =>{
          this.successMessage = 'Registration successful';

          console.log('user:',response)
          this.errorMessage = '';
          this.registerForm.reset();
         
          setTimeout(()=> this.router.navigate(['/login']),1500);
        },
        error: err=>{
          this.errorMessage = err || 'Registration failed';
          this.successMessage='';
        }
      });

    }
  }

}
