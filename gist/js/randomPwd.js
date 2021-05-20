/*
 * @Author: zws <nooldey@gmail.com> 
 * @Date: 2018-04-29 17:06:20 
 * @Last Modified by: zws 
 * @Description:  生成随机密码串
 */

const generate = (l) => {
    const
    	{ floor, random } = Math,
        zd = ['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', '0123456789'],
        z = zd.join(''),
        len = z.length
    let
        r1 = zd[0][floor(random() * zd[0].length)],
        r2 = floor(random() * 10),
        r3 = ''+r1+r2,
        result = ''

    for (let i = 0; i < l - 2; i++) {
        let rand = floor(random() * len)
        r3 += z[rand]
    }

    for (let j = 0; j < l; j++) {
        let n = floor(random() * r3.length)
        result += r3[n]
        r3.slice(n,1)
    }

    return result
}

console.log(generate(8))</nooldey@gmail.com>