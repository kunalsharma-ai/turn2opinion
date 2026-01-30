export default function Currency({value,currency="INR",locale="en-IN"}) {
    if (!value) return "";
    return value.toMoney(currency,locale);
}
