import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
  // imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message = '';

  redirectUrl: string = '/home';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const container = document.getElementById('container') as HTMLElement;
    const registerBtn = document.getElementById('register') as HTMLButtonElement;
    const loginBtn = document.getElementById('login') as HTMLButtonElement;

    if (registerBtn && container) {
      registerBtn.addEventListener('click', () => {
        container.classList.add('active');
      });
    }

    if (loginBtn && container) {
      loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
      });
    }

    this.route.queryParams.subscribe(params => {
      this.redirectUrl = params['redirect'] || '/home';
    });
  }

  onLoginSuccess(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.userService.getCustomers().subscribe((user: User[]) => {
      const matchedUser = user.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        this.message = 'Login successful!';
        this.authService.login(matchedUser);
        this.router.navigate([this.redirectUrl]);this.cartService.loadCart();
      } else {
        this.message = 'Invalid email or password.';
        this.loginForm.get('email')?.setErrors({ invalid: true });
        this.loginForm.get('password')?.setErrors({ invalid: true });
      }
    });
  }
}
