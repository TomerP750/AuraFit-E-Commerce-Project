import { FormBuilder } from './FormBuilder';
import { productFields, Product } from './ProductFields.ts';

export function ProductForm({product, onSave}: {
    product?: Partial<Product>;
    onSave: (data: Product) => void | Promise<void>;
}) {
    // ensure we supply all keys, or use {} as DeepPartial<Product>
    const defaults: Partial<Product> = product ?? {
        title: '',
        price: 0,
        description: '',
        category: '',
    };

    return (
        <FormBuilder<Product>
            defaultValues={defaults}
            fields={productFields}
            onSubmit={onSave}
            submitLabel={product ? 'Update' : 'Create'}
        />
    );
}