export const errorAlert = (message: string, logMessage: string, err: Error) => {
    console.error(logMessage, err);
    alert(message);
}