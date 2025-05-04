import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { NgIf } from "@angular/common";
import { ThemeService, Theme } from "@core/services/theme/theme.service";
import { LucideAngularModule } from 'lucide-angular';


@Component({
    selector: "app-theme-toggle",
    standalone: true,
    imports: [
        NgIf,
        LucideAngularModule,
    ],
    templateUrl: "./theme-toggle.component.html",
    styleUrls: ["./theme-toggle.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
    private theme = inject(ThemeService);

    curent = signal<Theme>(this.theme.theme);

    isDark = computed(() =>
        this.curent() === 'system'
            ? matchMedia('(prefers-color-scheme: dark)').matches
            : this.curent() === 'dark'
    );

    toggle(): void {
        this.theme.setTheme(this.isDark() ? 'light' : 'dark');
        this.curent.set(this.theme.theme);
    }
}
