export function Error(message) {
    return {
        status: "error",
        message
    }
}
export function Success(message = "", data = []) {
    return {
        status: "success",
        message,
        data
    }
}
const APIResponse={
    Success,
    Error
}
export default  APIResponse
