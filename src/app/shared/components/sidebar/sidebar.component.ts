import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';

export type SidebarTab = 'macros' | 'keymaps' | 'rgb';

@Component({
    standalone: true,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, NgClass],
})
export class SidebarComponent {
    private _activeTab = signal<SidebarTab>('macros');

    @Input() set activeTab(tab: SidebarTab) {
        this._activeTab.set(tab);
    }
    get activeTab(): SidebarTab {
        return this._activeTab();
    }

    @Output() tabChange = new EventEmitter<SidebarTab>();
    @Output() exportLayout = new EventEmitter<void>();
    @Output() importLayout = new EventEmitter<void>();

    readonly tabs: SidebarTab[] = ['macros', 'keymaps', 'rgb'];
    trackByTab = (_: number, t: SidebarTab) => t;

    setActiveTab(tab: SidebarTab) {
        this.tabChange.emit(tab);
    }
    onExport() { this.exportLayout.emit(); }
    onImport() { this.importLayout.emit(); }
}
