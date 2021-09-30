import {TuiDecimalSymbol} from '@taiga-ui/core/types';

/**
 * Formatting configuration for displayed numbers
 * decimalSeparator - example: 100,45 (',' by default)
 * thousandSeparator - example: 360 000 (' ' by default)
 */
export interface NumberFormatSettings {
    readonly decimalSeparator: TuiDecimalSymbol;
    readonly thousandSeparator: string;
}
