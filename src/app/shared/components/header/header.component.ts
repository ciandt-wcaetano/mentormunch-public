import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenHelper } from '@app/shared/helpers/token.helper';
import { SessionService } from '@core/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() userState: UserState;

  isMenuOpen = false;
  isAluno = false;
  isProfessor = false;
  isEmpresa = false;

  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getState();
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.getState();
      }
    });
  }

  async getState() {
    let dataString = await this.sessionService.getUserData();
    this.userState = TokenHelper.parseUserData(dataString).perfil as UserState;

    typeof this.userState === 'string' &&
      (this.isAluno = this.userState === 'aluno');
    typeof this.userState === 'string' &&
      (this.isProfessor = this.userState === 'professor');
    typeof this.userState === 'string' &&
      (this.isEmpresa = this.userState === 'empresa');
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToMentorias(): void {
    this.router.navigate(['/mentorias']);
  }

  goToPerfil(): void {
    this.router.navigate(['/perfil']);
  }

  goToBancoTalentos(): void {
    this.router.navigate(['/talentos']);
  }

  signOut(): void {
    this.sessionService.removeSessionData();
    this.userState = null;
    this.isAluno = false;
    this.isProfessor = false;
    this.isEmpresa = false;
    this.router.navigate(['/login']);
  }
}

export type UserState = 'aluno' | 'professor' | 'empresa';
