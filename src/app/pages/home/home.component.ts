import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        RouterLink,
        CommonModule,
        LucideAngularModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit {
    @ViewChild('hero', { static: true }) heroRef!: ElementRef<HTMLElement>;
    @ViewChild('text', { static: true }) textRef!: ElementRef<HTMLElement>;

    ngAfterViewInit(): void {
        const observer = new IntersectionObserver(
            entries =>
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in');
                    }
                }),
            { threshold: 0.1 }
        );

        [this.heroRef.nativeElement, this.textRef.nativeElement].forEach(el =>
            observer.observe(el)
        );
    }
}
