import api from "./api";
export default async function (e) {
  e.preventDefault();
  const target = e.target;

  let data = Array.from(target.querySelectorAll("[name]")).reduce((a, c) => {
    let value = c.value;
    if (c.type === "checkbox") value = c.checked;
    if (!(c.name in a)) a[c.name] = value;
    else if (a[c.name] instanceof Array) a[c.name].push(value);
    else a[c.name] = [a[c.name], value];
    return a;
  }, {});
  const method = target.getAttribute("method") ?? target.method.toLowerCase();
  const action = target.action;
  return await api[method](action, data);
}
