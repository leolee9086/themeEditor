export const 分解属性名=(属性名)=>{
    let 部分 = [];
    let 当前部分 = "";
    for (let i = 0; i < 属性名.length; i++) {
        let 字符 = 属性名[i];
        if (字符 === 字符.toUpperCase()) {
            if (当前部分) {
                部分.push(当前部分);
            }
            当前部分 = 字符;
        } else {
            当前部分 += 字符;
        }
    }
    if (当前部分) {
        部分.push(当前部分);
    }
    return 部分;
}