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

//import React, { Component } from 'react';
//import Try from './Try';

const React = require('react');
const { Component } = React; 
const Try = require('./Try');

function getNumbers() { //숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i=0; i < 4; i+=1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseBall extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(), // ex: [1, 3, 5, 7]
        tries: [], //push쓰면 안됨. 리액트가 뭐가 바뀌었는지 감지하기가 어려움. * 불변성 때문
        //참조가 바뀌어야만 무엇이 바뀌었는지 알 수 있다. 예를 들어, 어떤 배열에 array.push(1)을 한 경우, 기존 array의 참조값이 같으므로 push만으로는 변화를 캐치할 수가 없어서 렌더링을 해주지 않는다. 그러므로, const array2 = [...array, 2] 이런 식으로 해주어야 변화를 인식하게 된다. array2의 참조값이 기존 array와 다르기 때문. 
        //그러므로 아래 onSubmitForm함수에서 쓴 방식으로 tries가 바뀌었다는 것을 알려준다.
    };

    //화살표 함수를 쓰지 않으면, Constructor를 꼭 써야만 한다...
    onSubmitForm = (e) => { //숫자야구 로직
        e.preventDefault();
        if (this.state.value === this.state.answer.join('')) {
            this.setState({
                result: 'HoME RUN!!',
                tries: [...this.state.tries, {try: this.state.value, result: '홈런!'}],
            });
            alert('게임을 다시 시작합니다.');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        } else { //답 틀린 경우
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) { //10번 이상 틀렸을 때
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}` //mac에서는 option키와 함께 ₩를 눌러야 백쿼트가 나옴
                });
                alert('게임을 다시 시작합니다.');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else { //10번 이내로 틀린 경우 기회를 줌
                for (let i=0; i < 4; i+=1) {
                    if(answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState({
                    tries: [...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼 입니다.`}],
                    value: '',
                });
            }
        }

    };

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    };

    //예시를 위한 객체
    // fruits = [
    //     {fruit: '사과', taste: '맛있다' },
    //     {fruit: '감', taste: '맛있다' },
    //     {fruit: '배', taste: '맛있다' },
    //     {fruit: '무', taste: '맛있다' },
    //     {fruit: '귤', taste: '맛있다' },
    //     {fruit: '사과', taste: '맛없다' },
    // ];


    render() {
        // 계속 this.state를 쓰기 싫은 경우, 아래와 같이 선언하면 쓰지 않아도 된다.
        //이는 render()함수만이 아니고, 위의 onSubmitForm 함수 등에서도 똑같이 적용되는 원리이다
        const { result, tries, value } = this.state;

        return (
        <>
            <h1> {result} </h1>   
            <form onSubmit={this.onSubmitForm}>
             {/* React에서는 태그 내 속성에서 단어가 바뀌면 대문자를 써주어야 한다. */}
             <input maxLength={4} value={value} onChange={this.onChangeInput}/> 
             {/* //defaultValue를 쓸게 아니면 value와 onChange를 같이 세트로 써주어야 함. */}
            </form> 
        <div>시도: {tries.length}</div>
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
            {/* {this.fruits.map((v, i) => { //i는 인덱스
                //화살표 함수는 리턴을 쓰지 않으면 그 뒤의 내용이 바로 리턴 되는 것.    
                // key는 무조건 고유한 값이 필요하다. key가 없으면 에러가 남...
                //단, key 안에 i를 쓰는 것은 안된다는 것을 명심!!
                //React에서는 key를 기준으로 엘리먼트를 추가하거나 수정, 삭제 판단을 하기 때문에,
                //배열의 순서가 바뀌면 문제가 생긴다. i 즉, index는 가능한 key에서는 안쓰는 것이 좋다.
                //(물론 요소가 추가만 되는 배열인 경우는 순서가 바뀌지 않으므로 써도 되기는 함.)
                return (
                //아래 부분을 따로 파일로 뺴서 만드는 것이 가능하다. (보기에도 불편, 성능문제도 있음 - 반복문안이기 때문.)
                //아래 주석처리된 코드를 Try.jsx로 구현하고, import를 해보자.
                // <li key={v.fruit + v.taste}>
                //     <b>{ v.fruit}</b> - {v.taste} - {i}
                //     <div>컨텐츠1</div>
                //     <div>컨텐츠2</div>
                //     <div>컨텐츠3</div>
                // </li>
                    <Try key={v.fruit + v.taste} value={v} index={i} />
                    //props 를 물려주는 방법은 위와 같다.
                    //props로 인해 부모 자식관의 관계가 형성됨
                    //NumberBaseBall 부모 -> Try 자식
                );
            })} */}

            {/* 숫자야구 */}
            {tries.map((v,i) => {
                return (
                    <Try key={`${ i+1 }차 시도 : `} tryInfo = {v} />
                );
            })}

            
        </ul>
        </>    
        );
    };
};

module.exports = NumberBaseBall;
//export default NumberBaseBall;


//map에 대해서
//[1,2,3] => [2,4,6] 으로 바꾸고 싶은 경우,
//[1,2,3].map((v) => v * 2);
//배열을 1대1로 짝짓는게 map이다. (기본)