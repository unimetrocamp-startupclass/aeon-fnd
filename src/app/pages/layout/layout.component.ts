import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { KeyConfig } from '@core/models/key-config/key-config.module';
import { KeyConfigStore } from '@core/services/key-config-store/key-config-store.module';

import { KeyboardComponent } from '@shared/components/keyboard/keyboard.component';
import { KeyConfigPanelComponent } from '@shared/components/key-config-panel/key-config-panel.component';
import { SidebarComponent, SidebarTab } from 'src/app/shared/components/sidebar/sidebar.component';

@Component({
    standalone: true,
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    imports: [
        CommonModule,
        KeyboardComponent,
        KeyConfigPanelComponent,
        SidebarComponent,
        ToastrModule,
        
    ],
})
export class LayoutComponent {

    currentLayer = signal(1);
    selectedKey = signal<string | null>(null);
    activeTab = signal<SidebarTab>('macros');

    layers = [1, 2, 3, 4];

    readonly keyConfigs = computed(() => this.keyConfigStore.configs());

    constructor(
        private keyConfigStore: KeyConfigStore,
        private toastr: ToastrService,
    ) { }

    keyClicked(keyId: string) {
        this.selectedKey.set(keyId);
    }

    saveKeyConfig(cfg: KeyConfig) {
        this.keyConfigStore.save(cfg);
        this.toastr.success(`Key ${cfg.keyId} updated`, 'Configuration saved');
    }

    setCurrentLayer(layer: number) {
        this.currentLayer.set(layer);
    }

    setActiveTab(tab: SidebarTab) {
        this.activeTab.set(tab);
    }

    exportLayout() {
        try {
            const dataStr = JSON.stringify({
                layer: this.currentLayer(),
                keyConfigs: this.keyConfigStore.configs(),
            }, null, 2);

            const link = document.createElement('a');
            link.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
            link.download = `layout-layer-${this.currentLayer()}.json`;
            link.click();

            this.toastr.success('Layout exported successfully');
        } catch {
            this.toastr.error('Export failed');
        }
    }

    importLayout() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';

        input.onchange = ({ target }) => {
            const file = (target as HTMLInputElement).files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = ({ target }) => {
                try {
                    const layout = JSON.parse(target!.result as string);
                    this.currentLayer.set(layout.layer ?? 1);
                    this.keyConfigStore.setAll(layout.keyConfigs ?? {});
                    this.toastr.success('Layout imported successfully');
                } catch {
                    this.toastr.error('Invalid layout file');
                }
            };
            reader.readAsText(file);
        };

        input.click();
    }

    trackByLayer = (_: number, layer: number) => layer;
}
