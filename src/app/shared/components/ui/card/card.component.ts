import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    standalone: true,
    selector: 'app-card',
    template: `<mat-card class="rounded-lg border bg-card text-card-foreground shadow-sm"><ng-content></ng-content></mat-card>`,
    imports: [MatCardModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent { }
