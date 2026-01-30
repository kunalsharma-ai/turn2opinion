export default function (detail) {
  if (!document) return console.log("No Document");
  if (!detail || !detail.status) return console.log("No Status");
  document.dispatchEvent(new CustomEvent("toast", { detail }));
}
