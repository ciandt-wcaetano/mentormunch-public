import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'mentorias',
    loadChildren: () =>
      import('./pages/mentorias/mentorias.module').then(
        (m) => m.MentoriasModule
      ),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./pages/perfil/perfil.module').then((m) => m.PerfilModule),
  },
  {
    path: 'fale-conosco',
    loadComponent: () =>
      import('./pages/fale-conosco/fale-conosco.component').then(
        (m) => m.FaleConoscoComponent
      ),
  },
  {
    path: 'talentos',
    loadChildren: () =>
      import('./pages/talentos/talentos.module').then((m) => m.TalentosModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
