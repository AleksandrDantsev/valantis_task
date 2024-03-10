const checkIsDigital = (str: string): string | number => {
    if (Number(str)) return Number(str);
    return str;
}


export { checkIsDigital }