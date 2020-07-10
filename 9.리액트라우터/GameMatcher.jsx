import React, { Component } from 'react';
import NumberBaseball from '../3.숫자야구게임/NumberBaseBall';
import RSP from '../5. 가위바위보게임/RSP';
import Lotto from '../6.로또추첨기/Lotto';

class GameMatcher extends Component {
    render() {
        //console.log(this.props);

        if (this.props.match.params.name === 'number-baseball') {
            return <NumberBaseball />
        } else if (this.props.match.params.name === 'rock-scissors-paper') {
            return <RSP />
        } else if (this.props.match.params.name === 'lotto-generator') {
            return <Lotto />
        }
        return (
           <div>
               일치하는 게임이 없슴니당
           </div>
        );
    }
}

export default GameMatcher;

//만약에 컴포넌트로 라우터를 연결해서 보낸 경우가 아닌데, 
//props를 쓰고 싶거나 할 경우에는 withRouter를 사용한다. (this.props.history, this.props.match 등...)

// import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';


// class GameMatcher extends Component {
//     render() {
//         console.log(this.props);
//         return (
//             <div>게임 매쳐</div>
//         );
//     }
// }

// export default withRouter(GameMatcher);



/*
Router의 속성?들
history : ㅍㅔ이지를 넘나든 내역을 기억하고 있다 (이전페이지 이동, 다음 페이지 이동 등의 함수내장이 되어있음)
match: 매치 안의 params에 :name의 정보가 들어있다 (동적 주소 라우팅 시 매칭되는 부분)
location: pathname주소가 들어있고, 서치나 해쉬 등이 들어가 있다.

일반 브라우저에서 제공하는 history와 리액트 라우터의 history api는 조금 다르다 (의존관계 정리가 필요함)
*/ 

