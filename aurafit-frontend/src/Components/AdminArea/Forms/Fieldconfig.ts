// src/forms/FieldConfig.ts
import { FieldValues, Path } from 'react-hook-form';

/** The kinds of inputs we know how to render */
export type InputType = 'text' | 'number' | 'textarea' | 'select';

export interface FieldOption {
    label: string;
    /** for simplicity we only allow string | number options */
    value: string | number;
}

/**
 * Describe one field in a model T.
 * - `name` must be a property key of T
 * - `validate` gets the raw value (unknown) and returns true or an error message
 */
export interface FieldConfig<T extends FieldValues> {
    name: Path<T>;
    label: string;
    type: InputType;
    options?: FieldOption[];
    validate?: (value: unknown) => true | string;
}
