//Import 와 Require
/*
- require: 노드의 모듈 시스템  (노드의 모듈 문법은 Common js 문법이라고 불린다.)
- { hot } 과도 같은 구조분해 문법은 무엇인가.

import를 쓰는 건 ES2015문법이다.

import React, { Component } from 'react';

위의 두 가지는 무슨 차이가 있는가?

저 2개의 import는 각각 export 되어서 온 것.

export의 예시)
export const hello = 'hello' //import { hello }
export const bye = 'helo' // import { bye }

물론, import { hello, bye } 이런식으로도 사용가능.

그리고, React와 같은 경우는, export default라는 형태로 되어있다.
export default NumberBaseball; // import NumberBaseball;

export default는 한 번 밖에 쓸수 없지만,
export const 변수 -> 는 어려번 사용이 가능하다.

module.exports 는 export default와도 같다. (즉, 노드 모듈시스템과 ES2015는 어느정도 호환 가능)

위의 export const 같은 경우를 노드 식으로 표현하면 아래와 같음.
module.exports = { hello: 'hello'}
이는 exports.hello = 'hello' 와 같다.

노드에서는 사실 import를 쓰면 에러가 남.
그럼 다른 곳에서는 import많이들 쓰는데?
그건 즉, babel에서 import로 되어 있는 것을 require로 바꾸어 주는 것이다!!! (바벨 만세(?))

웹팩은 노드가 실행해주는 것이므로, webpack.config.js에서는 import를 사용할 수 없으나,
client단(화면단)...에서는 바벨이 import를 처리해주므로 사용이 가능하다.

*/


const React = require('react');
const { Component } = React; 

//import React, { Component } from 'react';


function getNumbers() { //숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수

}

class NumberBaseBall extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    //화살표 함수를 쓰지 않으면, Constructor를 꼭 써야만 한다...
    onSubmitForm = () => {

    };

    onChangeInput = () => {

    };


    render() {
        return (
        <>
            <h1> {this.state.result} </h1>   
            <form onSubmit={this.onSubmitForm}>
             {/* React에서는 태그 내 속성에서 단어가 바뀌면 대문자를 써주어야 한다. */}
             <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/> 
             {/* //defaultValue를 쓸게 아니면 value와 onChange를 같이 세트로 써주어야 함. */}
            </form> 
        <div>시도: {this.state.tries.length}</div>
        <ul>
            {/* //React에서는 반복문을 map이라는 함수를 써서 사용하면 된다. 아래는 예제 */}
            {/* {['사과', '바나나', '포도', '귤', '감', '배', '밤'].map((v) => {
                return (
                <li>{ v }</li>
                );
            })} */}
            {/* 2차원 배열을 써서 좀 더 복잡한 것을 표현해 볼 수 있다 */}
            {/* {[
                ['사과', '맛있다'],
                ['바나나', '맛없다'],
                ['포도', '시다'],
                ['귤', '떫다'],
                ['감', '쓰다'],
                ['배', '달다'],
                ['밤', '몰라']
            ].map((v) => {
                return (
                <li><b>{ v[0] }</b> - {v[1]}</li>
                );
            })} */}
            {/* 2차원 배열 말고, 객체를 만들어서도 사용이 가능하다. */}
            {[
                {fruit: '사과', taste: '맛있다' },
                {fruit: '감', taste: '맛있다' },
                {fruit: '배', taste: '맛있다' },
                {fruit: '무', taste: '맛있다' },
                {fruit: '귤', taste: '맛있다' },
                {fruit: '사과', taste: '맛없다' },
            ].map((v, i) => { //i는 인덱스
                //화살표 함수는 리턴을 쓰지 않으면 그 뒤의 내용이 바로 리턴 되는 것.    
                // key는 무조건 고유한 값이 필요하다. key가 없으면 에러가 남...
                //단, key 안에 i를 쓰는 것은 안된다는 것을 명심!!
                //React에서는 key를 기준으로 엘리먼트를 추가하거나 수정, 삭제 판단을 하기 때문에,
                //배열의 순서가 바뀌면 문제가 생긴다. i 즉, index는 가능한 key에서는 안쓰는 것이 좋다.
                //(물론 요소가 추가만 되는 배열인 경우는 순서가 바뀌지 않으므로 써도 되기는 함.)
            <li key={v.fruit + v.taste}><b>{ v.fruit}</b> - {v.taste} - {i}</li>
            })}

            
        </ul>
        </>    
        );
    };
};

module.exports = NumberBaseBall;