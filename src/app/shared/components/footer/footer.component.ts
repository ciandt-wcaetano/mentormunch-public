import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterCompoonent {

  constructor(private readonly router: Router) { }

  goToFaleConosco(): void {
    this.router.navigate(['/fale-conosco']);
  }

}
