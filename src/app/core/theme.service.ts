import { Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _dark: Signal<boolean> = signal(
    localStorage.getItem('theme') === 'dark'
      || window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  get isDark() { return this._dark(); }

  toggle() {
    const next = !this._dark();
    this._dark = signal(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }
}
J
