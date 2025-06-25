
export const createDateAndTime = () => {
    return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}