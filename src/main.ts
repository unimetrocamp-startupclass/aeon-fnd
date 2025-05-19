import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

import { LucideAngularModule, Moon, Sun, Zap, Palette, Layers, Keyboard, Download,
    Github, ArrowRight } from 'lucide-angular';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideAnimations(),
        importProvidersFrom(
            LucideAngularModule.pick({ Moon, Sun, Zap, Palette, Layers, Keyboard, Download, Github, ArrowRight }),
        ),
    ],
}).catch(err => console.error(err));
