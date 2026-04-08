import { DateTime } from "luxon";
const currencyFormatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 2, minimumFractionDigits: 2});
const compactCurrencyFormatterRounded = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 0, minimumFractionDigits: 0});

export const formatCurrency = (v, compact = false, rounded = false) => {
    if (v === 0) return '$0';
    return v ? (compact ? rounded ? compactCurrencyFormatterRounded.format(v): compactCurrencyFormatter.format(v) : currencyFormatter.format(v)) : null;
};

export const formatPercent = (v, places, showPlusSign = false) => {
    return v ? `${showPlusSign && v > 0 ? '+' : ''}${(parseFloat(v) * 100).toFixed(places)}%` : null;
};

export const formatNumber = (v) => {
    return v ? (+v).toLocaleString() : null;
};

export const formatDate = (v) => {
    return v ? DateTime.fromISO(v).toLocaleString() : null;
};
