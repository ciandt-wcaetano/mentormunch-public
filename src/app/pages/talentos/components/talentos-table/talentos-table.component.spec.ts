import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentosTableComponent } from './talentos-table.component';

describe('TalentosTableComponent', () => {
  let component: TalentosTableComponent;
  let fixture: ComponentFixture<TalentosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TalentosTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalentosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
