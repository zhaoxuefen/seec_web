let debounce = (fn) =>{
    // fn 业务函数 对他进行防抖
    let timer
    // clearTimeout(timer)
    return function(){
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn()
        }, 2000);
    }
}

export default debounce