export default function date({date,format="dd-mmm-yyyy",locale="default"}) {
    try{
    if (!date) return "";
    if (date instanceof Date) return date.showDate(format,locale);
    return new Date(date).showDate(format,locale);
    }catch(e){
        return "";
    }
}
