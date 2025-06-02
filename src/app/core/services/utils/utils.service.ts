import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ClassUtilsService {

    public combine(...inputs: (string | undefined | null | boolean | { [key: string]: boolean })[]): string {
        return inputs
            .filter((input): input is string | { [key: string]: boolean } =>
                input !== null && input !== undefined && typeof input !== 'boolean'
            )
            .map((input) => {
                if (typeof input === 'string') {
                    return input.trim();
                } else if (typeof input === 'object') {
                    return Object.entries(input)
                        .filter(([_, value]) => Boolean(value))
                        .map(([key]) => key.trim())
                        .join(' ');
                }
                return '';
            })
            .filter(Boolean)
            .join(' ');
    }
}
