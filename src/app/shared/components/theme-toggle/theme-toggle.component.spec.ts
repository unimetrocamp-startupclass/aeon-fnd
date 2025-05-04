import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService, Theme } from '@core/services/theme/theme.service';
import { BehaviorSubject } from 'rxjs';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

// Mock ThemeService
class ThemeServiceMock {
    private subj = new BehaviorSubject<Theme>('light');
    theme$ = this.subj.asObservable();
    get theme() { return this.subj.value; }
    setTheme(theme: Theme) { this.subj.next(theme); }
}

beforeAll(() => {
    if (!window.matchMedia) {
        window.matchMedia = () => ({
            matches: false,
            media: '',
            onchange: null,
            addEventListener: () => { },
            removeEventListener: () => { },
            addListener: () => { },
            removeListener: () => { },
            dispatchEvent: () => false,
        } as unknown as MediaQueryList);
    }
});

describe('ThemeToggleComponent', () => {
    let fixture: ComponentFixture<ThemeToggleComponent>;
    let mock: ThemeServiceMock;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                ThemeToggleComponent,
                LucideAngularModule.pick({ Moon, Sun }),
            ],
            providers: [{ provide: ThemeService, useClass: ThemeServiceMock }],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(ThemeToggleComponent);
                mock = TestBed.inject(ThemeService) as unknown as ThemeServiceMock;
                fixture.detectChanges();
            });
    }));

    function queryMoon() {
        return fixture.nativeElement.querySelector('lucide-icon[name="moon"]');
    }
    function querySun() {
        return fixture.nativeElement.querySelector('lucide-icon[name="sun"]');
    }

    it('should show moon icon when theme is light', () => {
        expect(queryMoon()).toBeTruthy();
        expect(querySun()).toBeFalsy();
    });

    it('should toggle to dark on click', () => {
        spyOn(mock, 'setTheme').and.callThrough();

        fixture.nativeElement.querySelector('button').click();
        fixture.detectChanges();

        expect(mock.setTheme).toHaveBeenCalledWith('dark');
        expect(querySun()).toBeTruthy();
    });

    it('should toggle back to light on second click', () => {
        fixture.nativeElement.querySelector('button').click(); // dark
        fixture.detectChanges();

        fixture.nativeElement.querySelector('button').click(); // light
        fixture.detectChanges();

        expect(mock.theme).toBe('light');
        expect(queryMoon()).toBeTruthy();
    });
});
