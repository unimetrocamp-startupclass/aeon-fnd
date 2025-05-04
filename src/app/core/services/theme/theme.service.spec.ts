import { TestBed } from '@angular/core/testing';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeService, Theme } from './theme.service';

fdescribe('ThemeService', () => {
    let service: ThemeService;
    let htmlEl: HTMLElement;
    let rendererSpy: jasmine.SpyObj<Renderer2>;
    let rendererFactory: jasmine.SpyObj<RendererFactory2>;
    let mediaQueryList: any;
    let mediaQueryListListener: any;

    beforeEach(() => {
        localStorage.clear();
        rendererSpy = jasmine.createSpyObj('Renderer2', ['addClass', 'removeClass']);
        rendererFactory = jasmine.createSpyObj('RendererFactory2', ['createRenderer']);
        rendererFactory.createRenderer.and.returnValue(rendererSpy);

        mediaQueryList = {
            matches: false,
            addEventListener: jasmine.createSpy('addEventListener').and.callFake((event, listener) => {
                mediaQueryListListener = listener;
            }),
            removeEventListener: jasmine.createSpy('removeEventListener')
        };

        spyOn(window, 'matchMedia').and.returnValue(mediaQueryList);

        TestBed.configureTestingModule({
            providers: [
                ThemeService,
                { provide: RendererFactory2, useValue: rendererFactory },
                { provide: DOCUMENT, useValue: document },
            ],
        });

        service = TestBed.inject(ThemeService);
        htmlEl = document.documentElement;
    });

    it('Should initialize with "system" theme when there is no LocalStorage', () => {
        expect(service.theme).toBe('system');
    });

    it('Should set and persit the theme', () => {
        service.setTheme('dark');
        expect(service.theme).toBe('dark');
        expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('should apply correct classes in HTML', () => {
        rendererSpy.removeClass.calls.reset();
        rendererSpy.addClass.calls.reset();

        service.setTheme('dark');

        expect(rendererSpy.removeClass).toHaveBeenCalledWith(htmlEl, 'light');
        expect(rendererSpy.removeClass).toHaveBeenCalledWith(htmlEl, 'dark');
        expect(rendererSpy.addClass).toHaveBeenCalledWith(htmlEl, 'dark');
    });

    it('Should react to change in prefers color scheme when in "system"', () => {
        rendererSpy.removeClass.calls.reset();
        rendererSpy.addClass.calls.reset();

        service.setTheme('system');

        rendererSpy.removeClass.calls.reset();
        rendererSpy.addClass.calls.reset();

        mediaQueryList.matches = true;

        if (mediaQueryListListener) {
            mediaQueryListListener();
        }

        expect(rendererSpy.removeClass).toHaveBeenCalledWith(htmlEl, 'light');
        expect(rendererSpy.removeClass).toHaveBeenCalledWith(htmlEl, 'dark');
        expect(rendererSpy.addClass).toHaveBeenCalledWith(htmlEl, 'dark');
    });
});
