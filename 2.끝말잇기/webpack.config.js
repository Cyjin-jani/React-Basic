const path = require('path');

module.exports = {
    name: 'wordRelay-setting',
    mode: 'development', //개발용. 실 서비스는 production
    devtool: 'eval', //빠르게 하겠다라는 뜻.
    //중요한 부분. 엔트리와 아웃풋
    entry: {

    }, //입력
    output: {
        path: path.join(__dirname, 'dist'),
    }, //출력
};