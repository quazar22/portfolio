function hexToRgbA(hex: string, alpha: number = 1): string {
    let c: string[];
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c = hex.substring(1).split('');
        if(c.length === 3){
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        let cAsHex: string = '0x' + c.join('');
        return 'rgba('+[(parseInt(cAsHex)>>16)&255, (parseInt(cAsHex)>>8)&255, parseInt(cAsHex)&255].join(',') + `,${alpha})`;
    }
    throw new Error('Bad Hex');
}

export default hexToRgbA;