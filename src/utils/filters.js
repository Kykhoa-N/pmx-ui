export const buildQueryParams = (dateSpanFilters, otherFilters, reduceTo = null) => {
    const paramStrings = [];
    for (const param of ['year', 'quarter', 'month']) {
        if (dateSpanFilters[param]) paramStrings.push(`${param}=${dateSpanFilters[param]}`);
    }
    for (const param of ['accountId', 'locationId', 'productCategoryId', 'salesPersonId']) {
        if (otherFilters[param]) paramStrings.push(`${param}=${otherFilters[param]}`);
    }
    if (reduceTo) paramStrings.push(`${reduceTo}=true`);
    return paramStrings.length > 0 ? `?${paramStrings.join('&')}` : '';
};

export const determinePreviousDateSpanFields = (comparison, year, quarter, month) => {
    //TODO: consider using only the years, quarters, and months that are actually present in the data...
    let prevDateFields;
    if (comparison === 'YOY') {
        prevDateFields = {year: year - 1, quarter: quarter, month: month};
    } else if (comparison === 'QOQ') {
        const prevQuarter = quarter === 1 ? 4 : quarter - 1;
        prevDateFields = {year: (prevQuarter === 4 ? year - 1 : year), quarter: prevQuarter, month: month};
    } else if (comparison === 'MOM') {
        const prevMonth = month === 1 ? 12 : month - 1;
        prevDateFields = {year: (prevMonth === 12 ? year - 1 : year), quarter: quarter, month: prevMonth};
    }
    return prevDateFields;
};
