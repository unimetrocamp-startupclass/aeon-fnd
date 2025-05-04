import {
    Inject,
    Injectable,
    OnDestroy,
    PLATFORM_ID,
    Renderer2,
    RendererFactory2,
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
    private renderer: Renderer2;
    private mediaQueryList: MediaQueryList | null = null;
    private mediaSub?: Subscription;

    private themeSubject = new BehaviorSubject<Theme>(this.getInitialTheme());
    theme$ = this.themeSubject.asObservable();

    get theme(): Theme {
        return this.themeSubject.value;
    }

    constructor(
        rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private doc: Document,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.applyTheme(this.theme);

        if (isPlatformBrowser(this.platformId)) {
            this.startWatchingSystemTheme();
        }
    }

    setTheme(theme: Theme): void {
        this.themeSubject.next(theme);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('theme', theme);
        }
        this.applyTheme(theme);
    }

    ngOnDestroy(): void {
        this.mediaQueryList?.removeEventListener('change', this.handleSystemChange);
    }

    private getInitialTheme(): Theme {
        if (isPlatformBrowser(this.platformId)) {
            const saved = localStorage.getItem('theme') as Theme | null;
            return saved ?? 'system';
        }
        return 'light';
    }

    private applyTheme(theme: Theme): void {
        const effective: 'light' | 'dark' =
            theme === 'system'
                ? window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light'
                : theme;

        this.renderer.removeClass(this.doc.documentElement, 'light');
        this.renderer.removeClass(this.doc.documentElement, 'dark');
        this.renderer.addClass(this.doc.documentElement, effective);
    }

    private startWatchingSystemTheme(): void {
        this.mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        this.mediaQueryList.addEventListener('change', this.handleSystemChange);
    }

    private handleSystemChange = () => {
        if (this.theme === 'system') {
            this.applyTheme('system');
        }
    };
}
