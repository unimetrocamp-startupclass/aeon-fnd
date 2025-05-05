import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';

import { HeaderComponent } from './header.component';
import { ThemeService, Theme } from '@core/services/theme/theme.service';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

class MockThemeService {
  private subj = new BehaviorSubject<Theme>('light');
  theme$ = this.subj.asObservable();
  setTheme(theme: Theme) { this.subj.next(theme); }
}

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture:   ComponentFixture<HeaderComponent>;
  let themeSvc:  MockThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule.withRoutes([]),
        LucideAngularModule.pick({ Moon, Sun }),
      ],
      providers: [
        { provide: ThemeService, useClass: MockThemeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    themeSvc  = TestBed.inject(ThemeService) as unknown as MockThemeService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial xCss and wCss are "0px"', () => {
    expect(component.xCss).toBe('0px');
    expect(component.wCss).toBe('0px');
  });

  it('updateIndicator should ajusts xCss and wCss correctly', () => {
    component['updateIndicator'](15, 80);
    expect(component.xCss).toBe('15px');
    expect(component.wCss).toBe('80px');
  });

  it('logo$ outputs correct URL according to the theme', fakeAsync(() => {
    let logoUrl: string|undefined;
    component.logo$.subscribe(url => logoUrl = url);

    expect(logoUrl).toContain('logo_aeon_darkmode.svg');

    themeSvc.setTheme('dark');
    tick();
    expect(logoUrl).toContain('logo_aeon_whitemode.svg');
  }));
});
