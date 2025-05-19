import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@core/services/theme/theme.service';
import { startWith, map, shareReplay } from 'rxjs/operators';
import { themeLogo } from '@shared/utils/theme.utils';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        LucideAngularModule,
        CommonModule,
        RouterModule,
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    readonly year = new Date().getFullYear();
    readonly themeService = inject(ThemeService)

    logo$ = this.themeService.theme$.pipe(
        map(themeLogo),
        startWith(themeLogo('dark')),
        shareReplay(1)
    );
}
