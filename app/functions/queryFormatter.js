const HexGenerate = (len) => {
    var hex_nmbs = '0123456789abcdef'
    var str = 'abcdef'
    var a = str[(Math.floor(Math.random() * 6))]
    for (var i = 0; i < len-1; i++) {
        a += hex_nmbs[(Math.floor(Math.random() * 16))]
    }
    return a
}

exports.queryFormatter = (q, params) => {
    var i = -1
    try {
        while (true) {
            var r = HexGenerate(3)
            if (q.indexOf('?', i + 1) == -1) {
                break
            } else {
                var a = ' NULL '

                var t = parseInt(q.slice(q.indexOf('?')+1, q.indexOf('?')+3))-1
                var k = parseInt(q.slice(q.indexOf('?')+1, q.indexOf('?')+3)).toString().length

                i = q.indexOf('?', i + 1)
                if (params[t] || params[t] == 0) {
                    a = typeof params[t] != 'number' ? `$${r}$${params[t]}$${r}$` : `${params[t]}`
                }

                if (i == 0) {
                    q = a + q.slice(i + 1)
                } else {
                    q = q.slice(0, i ) + a + q.slice(i + k + 1)
                }
                i += a.length
            }
        }
        return q
    } catch (e) {
        console.log("queryFormater error => ", e)
        return q
    }
}
