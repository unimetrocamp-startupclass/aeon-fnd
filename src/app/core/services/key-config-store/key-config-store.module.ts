import { Injectable, signal, computed } from '@angular/core';
import { KeyConfig } from '@app/core/models/key-config/key-config.module';

@Injectable({ providedIn: 'root' })
export class KeyConfigStore {
  setAll(arg0: any) {
      throw new Error('Method not implemented.');
  }
  private readonly _configs = signal<Record<string, KeyConfig>>({});

  /** leitura pública (readonly) */
  readonly configs = computed(() => this._configs());

  save(config: KeyConfig): void {
    this._configs.update(cfgs => ({ ...cfgs, [config.keyId]: config }));
  }

  /** seleção reativa de um único keyId */
  select(keyId: string) {
    return computed(() => this._configs()[keyId]);
  }

  reset(): void {
    this._configs.set({});
  }
}
