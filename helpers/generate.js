module.exports.generateRandomer = (length) => {
    const char = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
    let result = "";
    for(let i = 0; i<length ;i++){
        result += char.charAt(Math.floor(Math.random()*char.length));
    }
    return result
}
