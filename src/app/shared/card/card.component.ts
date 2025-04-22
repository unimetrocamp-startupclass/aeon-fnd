import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'ui-card',
    template: `
      <div class="rounded-xl border p-6 shadow-sm bg-card text-card-foreground">
        <ng-content></ng-content>
      </div>
    `,
  })
  export class CardComponent {}
