import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    computed,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { SidebarTab } from 'src/app/shared/components/sidebar/sidebar.component';
import { KeyConfig } from '@core/models/key-config/key-config.module';
import { KeyConfigStore } from '@core/services/key-config-store/key-config-store.module';

@Component({
    standalone: true,
    selector: 'app-keyboard',
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.scss'],
    imports: [CommonModule, LucideAngularModule, ToastrModule]
})
export class KeyboardComponent implements OnInit {
    currentLayer = signal(1);
    selectedKey = signal<string | null>(null);
    activeTab = signal<SidebarTab>('macros');

    @Input() set layer(v: number) { this.currentLayer.set(v); }
    @Input() set selected(v: string | null) { this.selectedKey.set(v); }
    @Output() keyClick = new EventEmitter<string>();

    /* ——— Derivados ——— */
    readonly keyConfigs = computed(() => this.keyConfigStore.configs());

    /* ——— Dados de apoio ——— */
    readonly layers = [1, 2, 3, 4];
    keys: { id: string; label: string; row: number; col: number; width: number; height: number }[] = [];

    constructor(
        private readonly keyConfigStore: KeyConfigStore,
        private readonly toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.initializeKeyboard();
    }

    /* ——— Métodos chamados pelo template ——— */
    setCurrentLayer(layer: number) { this.currentLayer.set(layer); }
    setActiveTab(tab: SidebarTab) { this.activeTab.set(tab); }
    isKeySelected = (id: string) => this.selectedKey() === id;
    trackByLayer = (_: number, l: number) => l;

    onKeyClick(id: string) {
        this.selectedKey.set(id);
        this.keyClick.emit(id);
    }

    saveKeyConfig(cfg: KeyConfig) {
        this.keyConfigStore.save(cfg);
        this.toastr.success(`Key ${cfg.keyId} updated`, 'Configuration saved');
    }

    private initializeKeyboard(): void {
        this.keys = Array.from({ length: 60 }, (_, i) => ({
            id: `key_${i}`,
            label: `k${i}`,
            row: Math.floor(i / 15),
            col: i % 15,
            width: 1,
            height: 1
        }));
    }
}
