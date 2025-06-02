import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeyConfig } from '@core/models/key-config/key-config.module';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    selector: 'app-key-config-panel',
    templateUrl: './key-config-panel.component.html',
    styleUrls: ['./key-config-panel.component.scss']
})
export class KeyConfigPanelComponent implements OnInit, OnChanges {
    @Input() selectedKey: string | null = null;
    @Output() saveConfig = new EventEmitter<KeyConfig>();

    configForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.configForm = this.createForm();
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['selectedKey'] && changes['selectedKey'].currentValue) {
            this.resetForm();
        }
    }

    createForm(): FormGroup {
        return this.fb.group({
            keyId: ['', Validators.required],
            label: [''],
            action: [''],
        });
    }

    resetForm(): void {
        if (this.selectedKey) {
            this.configForm.patchValue({
                keyId: this.selectedKey,
                label: '',
                action: '',
            });
        }
    }

    onSubmit(): void {
        if (this.configForm.valid && this.selectedKey) {
            const keyConfig: KeyConfig = {
                ...this.configForm.value,
                keyId: this.selectedKey
            };

            this.saveConfig.emit(keyConfig);
        }
    }
}
