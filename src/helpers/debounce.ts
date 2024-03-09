const debounce = (callback: (...args: any[]) => any, wait: number) => {
    let timer: any = null;
    return (...args: []) => {
        window.clearTimeout(timer);
        timer = setTimeout(() => {
        callback(...args);
        }, wait);
    };
}



export { debounce }