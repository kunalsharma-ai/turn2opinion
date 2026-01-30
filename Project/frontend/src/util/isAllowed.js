export default function isAllowed(member, {
    module,
    feature,
    action
}) {
    if (!member || !member.permissions || !(member.permissions instanceof Array)) return false;
    if (!module || !feature || !action) return false;
    let permission = member.permissions.find(p => p.module === module &&
        p.feature === feature &&
        p.action.includes(action))
    if (!permission) return false;
    return true;
}