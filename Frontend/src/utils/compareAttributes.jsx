const compareAttributes = (attr1 = {}, attr2 = {}) => {
    const keys1 = Object.keys(attr1);
    const keys2 = Object.keys(attr2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    return keys1.every(key => attr1[key] === attr2[key]);
};

export default compareAttributes;