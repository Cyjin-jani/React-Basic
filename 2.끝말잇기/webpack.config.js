const path = require('path');

module.exports = {
    name: 'wordRelay-setting',
    mode: 'development', //개발용. 실 서비스는 production
    devtool: 'eval', //빠르게 하겠다라는 뜻.
    resolve: {
        extensions: ['.js', '.jsx'], //확장자 지정해주면 알아서 해당 확장자의 파일을 찾게 됨.
    },
    //중요한 부분. 엔트리와 아웃풋
    entry: {
        //이미 client.jsx에서 WordRelay.jsx를 불러오고 있기 때문에
        //따로 입력할 필요가 없다. (다른 파일을 불러오는 해당 파일만 입력해주면 됨.)
        //resolve라는 옵션을 쓰면 확장자도 써줄 필요가 없음. (나중에 엔트리 파일들이 늘어날 수 있으므로...)
        app: ['./client'], 
    }, //입력

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
            }
        }], //여러개의 규칙을 적용할 수 있기 때문에 배열을 사용.
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }, //출력
};


//babel 자체가 jsx를 사용할 수 있게 해주는 것은 아님.
//babel을 설치하고 바벨 내에서 jsx를 사용할 수 있게 세팅을 해줘야 함.
//아래는 리액트에서 바벨을 쓰는 데 필요한 것들임. (최소 4개 설치필요)
/*
npm i -D @babel/core (바벨 핵심 기능 -> 최신 문법으로 바꿔주는 기능 등)
npm i -D @babel/preset-env (바벨이 자신의 브라우저 환경에 맞게 알아서 세팅해서 보여줌.)
npm i -D @babel/preset-react (jsx를 쓰기 위해서 설치)
npm i bable-loader (얘는 바벨과 웹팩을 연결해줌.)
*/