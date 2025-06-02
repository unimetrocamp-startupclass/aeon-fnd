export enum KeyAction {
    Character = 'character',
    Macro     = 'macro',
    Layer     = 'layer',
    Modifier  = 'modifier',
    System    = 'system',
  }

  export interface KeyConfig {
    /** Unique physical key identifier – e.g. R1C4 */
    keyId: string;

    /** Legend shown on keycap (optional for blank keys) */
    label?: string;

    /** Action executed when the key is pressed */
    action: KeyAction;

    /** Optional list of macro strings (e.g. ['Ctrl', 'Shift', 'K']) */
    macros?: readonly string[];

    /** Optional list of modifier names (['Ctrl', 'Alt']) */
    modifiers?: readonly string[];

    /** Extra metadata you may need */
    layer?: number;
  }
