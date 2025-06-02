import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    standalone: true,
    imports: [
        CommonModule,
    ],
    selector: 'app-simulator-panel',
    templateUrl: './simulator-panel.component.html',
    styleUrls: ['./simulator-panel.component.scss']
})
export class SimulatorPanelComponent implements OnInit {
    simulationLog: string[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    addLogEntry(entry: string): void {
        this.simulationLog.push(entry);
        if (this.simulationLog.length > 100) {
            this.simulationLog.shift();
        }
    }

    clearLog(): void {
        this.simulationLog = [];
    }

    runSimulation(): void {
        this.addLogEntry('[' + new Date().toLocaleTimeString() + '] Running simulation...');
    }
}
