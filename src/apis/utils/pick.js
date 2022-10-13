const pick = (object, keys, searhField = 'search') => {
    return keys.concat(searhField).reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            if (!!searhField && searhField == key) {
                obj["$text"] = { $search: `\"${object[key]}\"` }
            } else {
                // eslint-disable-next-line no-param-reassign
                obj[key] = object[key];
            }
        }
        return obj;
    }, {});
};

export default pick