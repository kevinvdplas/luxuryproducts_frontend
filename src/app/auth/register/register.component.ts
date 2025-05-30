import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

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
    if (this.registerForm.get('password').value == this.registerForm.get('repeated_password').value) {
      this.authService.register(this.registerForm.value).subscribe((authResponse: { token: string }) => {
        this.router.navigate(['']);
        console.log(authResponse.token, 'User registered');
      });
    } else {
      alert('Passwords do not match')
    }
  }
}
