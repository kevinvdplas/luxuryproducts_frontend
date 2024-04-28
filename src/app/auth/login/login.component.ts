import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthRequest } from '../auth-request.model';
import { AuthResponse } from '../auth-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.maxLength(64), Validators.minLength(5)]],
      password: ['', [Validators.minLength(8), Validators.maxLength(128)]]
    });
  }

  public onSubmit(): void {
    this.authService
      .login(this.loginForm.value)
      .subscribe((authReponse: AuthResponse) => {
        console.log('AuthResponse: ', authReponse);
        this.router.navigate(['']);
      });
  }
}
