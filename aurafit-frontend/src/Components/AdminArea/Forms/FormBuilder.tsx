import {useForm, Controller} from 'react-hook-form';
import type {FieldConfig} from "./Fieldconfig.ts";

import {
    useForm,
    Controller,
    FieldValues,
    Path,
    SubmitHandler,
    UnpackNestedValue,
    DeepPartial,
} from 'react-hook-form';

interface FormBuilderProps<T extends FieldValues> {
    /** existing data for “edit”, or {} for “create” */
    defaultValues: UnpackNestedValue<DeepPartial<T>>;
    fields: FieldConfig<T>[];
    /** react-hook-form’s SubmitHandler type */
    onSubmit: SubmitHandler<T>;
    submitLabel?: string;
}

export function FormBuilder<T extends FieldValues>({
                                                       defaultValues,
                                                       fields,
                                                       onSubmit,
                                                       submitLabel = 'Save',
                                                   }: FormBuilderProps<T>) {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<T>({ defaultValues });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((f) => (
                <div key={f.name} style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', marginBottom: 4 }}>{f.label}</label>
                    <Controller
                        name={f.name}
                        control={control}
                        rules={f.validate ? { validate: f.validate } : undefined}
                        render={({ field }) => {
                            switch (f.type) {
                                case 'text':
                                    return <input {...field} />;
                                case 'number':
                                    return <input type="number" {...field} />;
                                case 'textarea':
                                    return <textarea {...field} />;
                                case 'select':
                                    return (
                                        <select {...field}>
                                            <option value="">— select —</option>
                                            {f.options?.map((o) => (
                                                <option key={String(o.value)} value={o.value}>
                                                    {o.label}
                                                </option>
                                            ))}
                                        </select>
                                    );
                            }
                        }}
                    />
                    {errors[f.name] && (
                        <p style={{ color: 'red', marginTop: 4 }}>
                            {errors[f.name]?.message?.toString()}
                        </p>
                    )}
                </div>
            ))}
            <button type="submit" disabled={isSubmitting}>
                {submitLabel}
            </button>
        </form>
    );
}