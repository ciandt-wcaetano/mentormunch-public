import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CoreModule } from '@app/core/core.module';
import { ComponentsModule } from '@app/shared/components/components.module';
import { TalentosComponent } from './talentos.component';
import { TalentosRoutingModule } from './talentos-routing.module';
import { TalentosTableComponent } from './components/talentos-table/talentos-table.component';

@NgModule({
  declarations: [TalentosComponent, TalentosTableComponent],
  imports: [
    CommonModule,
    CoreModule,
    TalentosRoutingModule,
    ComponentsModule,
    MatTabsModule,
  ],
  exports: [TalentosComponent],
})
export class TalentosModule {}
