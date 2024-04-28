import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [
        '',
        [
          Validators.email,
          Validators.required,
          Validators.maxLength(64),
          Validators.minLength(5),
        ],
      ],
      firstName: [''],
      lastName: [''],
      password: ['', [Validators.minLength(8), Validators.maxLength(128)]],
      repeated_password: [''],
    });
  }

  public onSubmit(): void {
    this.authService
      .register(this.registerForm.value)
      .subscribe((authResponse: { token: string }) => {
        console.log(authResponse.token, 'User registered');
      });
  }
}
