var thousandSeparator = function (n) {
    let reverseStrArr = n.toString().split('').reverse();
    let result = [];

    for (let i = 0; i < reverseStrArr.length; i++) {
        result.push(reverseStrArr[i]);
        let len = i + 1;
        if (len % 3 == 0 && i !== reverseStrArr.length - 1 && i !== 0) {
            result.push(',');
        }
    }

    return result.reverse().join('');
};

console.log(thousandSeparator('123456984333ffsfafew43524344357'))


const http = require('http');
const app = {
    middleWares: [],
    idx: 0,

    use(fn) {
        // todo
        // check type
        this.middleWares.push(fn)
    },
    callback() {

        return function callbackFunc(request, response) {

            function next() {
                let func = this.middleWares[idx++]
                if (!func) return;

                func(request, response, next);
            }

            next();
        }
        // todo
    }
}
app.use((req, res, next) => {
    if (req.url = '/a') {
        res.end('hello a')
    } else next();
})
app.use((req, res, next) => {
    setTimeout(() => {
        if (req.url = '/b') {
            res.end('hello b')
        } else next();
    }, 1000);
})
app.use((req, res, next) => {
    if (req.url = '/c') {
        res.end('hello c')
    } else next();
})
const server = http.createServer(app.callback())
server.listen(80);