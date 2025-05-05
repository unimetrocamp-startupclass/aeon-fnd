import {
    Component,
    AfterViewInit,
    ElementRef,
    QueryList,
    ViewChild,
    ViewChildren,
    inject,
    DestroyRef,
    ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { filter, startWith, map, shareReplay } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ThemeService, Theme } from '@core/services/theme/theme.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, ThemeToggleComponent],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {
    private router = inject(Router);
    private destroyRef = inject(DestroyRef);
    readonly themeService = inject(ThemeService);

    navItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Layout', path: '/layout' },
        { name: 'Tutorial', path: '/tutorial' },
    ];

    logo$ = this.themeService.theme$.pipe(
        map((t): string => {
            const darkMode = t === 'system'
                ? window.matchMedia('(prefers-color-scheme: dark)').matches
                : t === 'dark';
            return darkMode
                ? '/logo_aeon_whitemode.svg'
                : '/logo_aeon_darkmode.svg';
        }),
        startWith('/logo_aeon_darkmode.svg'),
        shareReplay(1)
    );

    @ViewChild('nav', { static: true }) navEl!: ElementRef<HTMLElement>;
    @ViewChildren('link', { read: ElementRef }) links!: QueryList<ElementRef<HTMLAnchorElement>>;

    // CSS properties
    xCss = '0px';
    wCss = '0px';

    ngAfterViewInit(): void {
        const navEnd$ = this.router.events.pipe(filter(e => e instanceof NavigationEnd));
        const resize$ = fromEvent(window, 'resize');
        const linksChange$ = this.links.changes.pipe(startWith(this.links));

        merge(navEnd$, resize$, linksChange$)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.alignToActive());
    }

    onActiveChange(isActive: boolean, el: HTMLAnchorElement): void {
        if (isActive) {
            this.updateIndicator(el.offsetLeft, el.offsetWidth);
        }
    }

    private alignToActive(): void {
        const active = this.links.find(l => l.nativeElement.classList.contains('active'));
        if (active) {
            const el = active.nativeElement;
            this.updateIndicator(el.offsetLeft, el.offsetWidth);
        }
    }

    private updateIndicator(left: number, width: number): void {
        this.xCss = `${left}px`;
        this.wCss = `${width}px`;
    }
}
