import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TalentosComponent } from './talentos.component';
import { TalentosTableComponent } from './components/talentos-table/talentos-table.component';

const routes: Routes = [
  {
    path: '',
    component: TalentosComponent,
    children: [
      { path: 'table', component: TalentosTableComponent },
      { path: '', redirectTo: 'table', pathMatch: 'full' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TalentosRoutingModule {}
