import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'ui-button',
    template: `<button class="px-4 py-2 rounded-md bg-primary text-white" [ngClass]="extra"><ng-content></ng-content></button>`,
    styles: [':host { display:inline-block }']
  })
  export class ButtonComponent {
    @Input() extra = '';   // classes extras (opcional)
  }
