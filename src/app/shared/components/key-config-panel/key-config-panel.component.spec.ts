import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyConfigPanelComponent } from './key-config-panel.component';

describe('KeyConfigPanelComponent', () => {
  let component: KeyConfigPanelComponent;
  let fixture: ComponentFixture<KeyConfigPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyConfigPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyConfigPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
