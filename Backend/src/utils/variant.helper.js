const normalizeAttributes = (attributes = {}) => {
    // Mongoose Map
    if (attributes?.$isMongooseMap) {
        return Object.fromEntries(attributes.entries());
    }

    // Native Map
    if (attributes instanceof Map) {
        return Object.fromEntries(attributes.entries());
    }

    // Plain Object
    return { ...attributes };
};

export const compareAttributes = (first = {}, second = {}) => {

    const obj1 = normalizeAttributes(first);
    const obj2 = normalizeAttributes(second);

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every(key => obj1[key] === obj2[key]);
};

export const findVariant = (product, selectedAttributes = {}) => {

    if (!product?.variants?.length) return null;

    return product.variants.find((variant) =>
        compareAttributes(variant.attributes, selectedAttributes)
    ) || null;
};