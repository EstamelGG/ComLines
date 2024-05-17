// 获取随机字符串，默认10长度
const randomString = (length = 10) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    if (length > chars.length) {
        return 'An error occurred [code1]';
    }
    for (let i = 0; i < length; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        while (randomNumber === 0) {
            randomNumber = Math.floor(Math.random() * chars.length);
        }
        result += chars[randomNumber];
    }
    return result;
};
export default randomString;