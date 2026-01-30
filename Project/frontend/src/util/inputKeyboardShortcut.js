export default function inputKeyboardShotcut(e) {
  const ctrl = e.ctrlKey || e.metaKey;
  if (!ctrl) return;
  e.preventDefault();
  let target = e.target;
  let name = target.name.split(".");
  // console.log(name)
  let index = Number(name[1]);
  if (isNaN(index)) return;
  switch (e.key) {
    case "ArrowUp":
      index--;
      break;
    case "ArrowDown":
      index++;
      break;
    default:
      return;
      break;
  }
  name[1] = index;
  let newName = name.join(".");
  document.querySelector(`[name="${newName}"]`)?.focus();
}
