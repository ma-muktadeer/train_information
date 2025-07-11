import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private readonly _apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      mobile_number: ['', [Validators.required, Validators.pattern('[0-9]{11,}')]],
      password: ['', Validators.required]
    });
  }
  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { mobile_number, password } = this.loginForm.value;

      // এখানে আপনার অথেন্টিকেশন সার্ভিস কল করুন
      console.log('Login attempt with:', { mobile_number, password });

      // সিমুলেটেড রেস্পন্স
      // setTimeout(() => {
      //   this.isLoading = false;
      //   localStorage.setItem('auth_token', 'simulated_token');
      //   localStorage.setItem('user_data', JSON.stringify({ mobile_number, name: 'User' }));

      //   this.snackBar.open('লগইন সফল!', 'ঠিক আছে', { duration: 3000 });
      //   this.router.navigate(['/dashboard']);
      // }, 1500);

      try {
        const res = await this._apiService.login({mobile_number, password});
        console.log('getting login response', res);
        this.router.navigate(['/train-matrix']);
      } catch (error) {
        this.isLoading = false;
        console.error('Login failed:', error);
        this.snackBar.open('লগইন ব্যর্থ! দয়া করে আবার চেষ্টা করুন।', 'বন্ধ করুন', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn'],
        });
      }


    }
  }
}
