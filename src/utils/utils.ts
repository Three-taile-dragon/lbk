/*判断token是否过期*/
export const isTokenExpired = (timeStamp:any) => {
    let expiredTime = timeStamp;
    /*获取本地时间*/
    let nowTime = new Date().getTime() / 1000;
    /*如果 < 10分钟，则说明即将过期*/
    return (expiredTime - nowTime) < 60 * 10
};