import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  showLogin = true;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(async (url) => {
      this.showLogin = url[0].path === 'login';
      let data = await this.authService.getUserData();
      console.log(data);
    });
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
  }

  get dynamicText(): string {
    return this.showLogin
      ? 'Faça seu login para acessar cada perfil!'
      : 'Cadastre-se agora para aproveitar o melhor da plataforma!';
  }
}
