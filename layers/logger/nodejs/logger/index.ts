
export const layerLog = (type: string, message: string) => {
    console.log(` ${new Date().toISOString()} LOG VERSION 2 [${type}] : ${message}`)
}