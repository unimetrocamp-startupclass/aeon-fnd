import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatePanelComponent } from './simulate-panel.component';

describe('SimulatePanelComponent', () => {
  let component: SimulatePanelComponent;
  let fixture: ComponentFixture<SimulatePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulatePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
