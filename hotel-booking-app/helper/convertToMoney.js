const convert = value => {
    value = value.toString().split('').reverse()
    let result = []
    for(let i = 0; i < value.length; i++) {
        if(i % 3 === 0 && i != 0) {
            result.push('.')
        }
        result.push(value[i])
    }
    return `Rp. ${result.reverse().join('')}`
}

module.exports = convert