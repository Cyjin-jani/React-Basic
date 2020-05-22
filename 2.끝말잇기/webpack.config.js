const path = require('path');
const webpack = require('webpack'); //아래 플러그인에 필요한 웹팩

module.exports = {
    name: 'wordRelay-setting',
    mode: 'development', //개발용. 실 서비스는 production
    devtool: 'eval', //빠르게 하겠다라는 뜻.
    resolve: {
        extensions: ['.js', '.jsx'], //확장자 지정해주면 알아서 해당 확장자의 파일을 찾게 됨.
    },
    //중요한 부분. 엔트리와 모듈, 아웃풋
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
                presets: [
                ['@babel/preset-env', { //브라우저 옛 버전 등의 호환을 도와주는 놈. 최신 코드가 옛 버전에 대응이 안되기 때문.
                    targets: {
                        browsers: ['> 5% in KR', 'last 2 chrome versions'], //의미: 크롬 최신 2개버전 까지만 대응.
                        //위 브라우저 목록으로 참고하기 좋은 사이트: https://github.com/browserslist/browserslist#queries
                    }
                }],
                '@babel/preset-react'], //plugin들의 모음이 preset이다. 고로, 이 프리셋 각각에 옵션할당이 가능함.
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel',
                ],
            }
        }], //여러개의 규칙을 적용할 수 있기 때문에 배열을 사용.
    },
    //plugin은 확장프로그램이라고 보면 된다.
    plugins: [
        //로더는 여기서 module의 rules이하 내용들인데 각 내용들에 전부 디버그를 트루로 해주는 것.
        new webpack.LoaderOptionsPlugin({ debug: true}),  
    ],
    output: {
        path: path.join(__dirname, 'dist'), //실제 경로
        filename: 'app.js',
        publicPath: '/dist/', //가상의 경로 //nodejs에서 express.static과 비슷하다.
    }, //출력
};
//webpack.config를 바꾸게 되면, 핫로더를 쓰는 경우, 서버를 재시작 해줘야 함...

//babel 자체가 jsx를 사용할 수 있게 해주는 것은 아님.
//babel을 설치하고 바벨 내에서 jsx를 사용할 수 있게 세팅을 해줘야 함.
//아래는 리액트에서 바벨을 쓰는 데 필요한 것들임. (최소 4개 설치필요)
/*
npm i -D @babel/core (바벨 핵심 기능 -> 최신 문법으로 바꿔주는 기능 등)
npm i -D @babel/preset-env (바벨이 자신의 브라우저 환경에 맞게 알아서 세팅해서 보여줌.)
npm i -D @babel/preset-react (jsx를 쓰기 위해서 설치)
npm i -D babel-loader (얘는 바벨과 웹팩을 연결해줌.)

// 자동으로 빌드 해줘서 변경내용이 바로 되도록 하는 것.
npm i -D react-hot-loader
npm i -D webpack-dev-server 서버가 있어야 프론트엔드의 변경점을 감지해서 바꿔주므로... nodemon같은 거임.

*/