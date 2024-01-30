
export const toBoolean = (dataStr:string) => {
    return !!(dataStr?.toLowerCase?.() === 'true');
};



export function showLastMessage(after:number) {
    setTimeout(() => {
        const element = document.getElementsByClassName('message-item');
        element.length > 0 && element[element.length - 1].scrollIntoView({
            block: 'center', // 值有start,center,end,nearest，当前显示在视图区域中间
            behavior: 'smooth' // 值有auto,instant,smooth，缓动动画（当前是慢速的）
        })
    }, after || 100)
}