import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Authservice } from '../authservice';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

    constructor(
    private formBuilder: FormBuilder,
    private authService: Authservice,
    private router: Router,private snackBar:MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }




  ngOnInit(): void {
        this.errorMessage='';
    this.successMessage='';
    
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }


  

  onSumbit():void{
  this.errorMessage='';
  this.successMessage='';
  this.loading=true;

 if (this.loginForm.valid) {

      console.log(this.loginForm.value);
      const dataLogin = this.loginForm.value;

      this.authService.login(dataLogin).subscribe({

        next: (response) => {
          this.authService.saveUserData(response);
          // this.snackBar.open('login successful','close',{duration:4000});
          // this.router.navigate(['/parkings']);

          this.authService.saveToken(response.token);
          this.authService.saveRole(response.user.role);
         console.log('FULL LOGIN RESPONSE:', response.user);
          
          console.log('saved token : ', response.token);
          console.log('user  is:', response.user);
             this.snackBar.open('Login successfully', 'Close', {duration: 3000});
           switch(response.user.role) {
          case 'ADMIN':
            this.router.navigate(['/admin-dashboard']);
            break;
          
          case 'CUSTOMER':
            this.router.navigate(['/customer-Dash']);
            break;
          default:
            this.router.navigate(['/']);
        }
      },
        error: (err)=>{
          this.errorMessage = typeof err === 'string' ? err : 'Login failed';
        }
      })
    }
  


}


goToSignup(){
      this.router.navigate(['/signup']);

}
}
