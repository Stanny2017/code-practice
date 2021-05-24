function test() {
    setTimeout(() => {
        console.log('====timer')
    },0)

    throw 'err'
}

test()
