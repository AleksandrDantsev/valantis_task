import { importsImage } from "../imports/importsImage";

const checkTypeProduct = (productName: string) => {
    const lowerProductLine = productName.toLowerCase();
    const keyWord =  [
        'кольцо', 'брошь', 'ожерелье', 'колье', 'браслет', 'серьги', 'кулон', 'цепь', 'комплект', 'зажим',
    ];

    for (let i of keyWord) {
        if (lowerProductLine.indexOf(i) !== -1) return importsImage[i]
    }
    return importsImage['бижутерия']
}


export { checkTypeProduct }