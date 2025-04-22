import { Component } from '@angular/core';
import { ButtonComponent, CardComponent } from '../../shared';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [ButtonComponent, CardComponent],
  template: `
  <section class="min-h-screen flex flex-col items-center justify-center gap-12">
    <h1 class="text-4xl font-bold text-center">Bem‑vindo ao teclado split!</h1>

    <ui-card class="max-w-lg text-center">
      <p class="mb-6">Projeto em migração de React para Angular <strong>100 % TypeScript</strong>.</p>
      <ui-button (click)="toggleTheme()">Alternar tema</ui-button>
    </ui-card>
  </section>
  `
})
export class HomePage {
  constructor(private theme: ThemeService) {}
  toggleTheme() { this.theme.toggle(); }
}
