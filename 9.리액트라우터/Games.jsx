import React from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
    
    //최상위를 브라우저라우터 혹은 해쉬라우터로 감싸주어야 함
    return (
        <BrowserRouter> 
        {/* <HashRouter> */}
        {/* 해쉬 라우터는 주소url부분이 조금 이상할 수 있으나, 새로고침이 가능하다 (동작가능) 
        해쉬 뒤의 부분은 브라우저(리액트)만 아는 부분이라서 새로고침이 가능. 
        다만, 서버 쪽에서 모르는 것은 동일하다 
        즉, SEO 구현 시에 단점이 된다.... 검색엔진은 서버에 물어보는데, 해쉬라우터는 서버가 모르고 브라우저만 알게 되어서,
        검색엔진에 해당 페이지가 뜨지 않음.... 그래서 검색엔진이 중요한 실무에서는 해쉬라우터를 쓰지 않는다.
        관리자 페이지와 같이 검색엔진 필요없고, 주소줄이 복잡(더럽)해도 괜찮은 경우에는 사용이 가능하다
        즉, HashRouter가 Deploy할 때 편하다 (어떤 브라우저든 다 동작함, 단점은 검색엔진에서 안됨...)
        */}

        {/* 해쉬 라우터와의 차이를 알아보기 <BrowserRouter> 
        브라우저 라우터를 쓸 경우, 새로고침을 하면, 서버쪽에서는 해당 리퀘스트에 대해 응답을 못함
        프론트인 자바스크립트에서만 해당 리퀘스트가 뭔지 알고 있어서 대응이 되나,
        새로고침하여 서버 측에 리퀘스트를 보내면 에러가 발생
        실무에 적합한 것은 브라우저 라우터.

        다만 해쉬라우터나 브라우저라우터 모두, 서버 쪽에 세팅을 해주면, 서버측에서도 알게 된다.
        */}
        <div>
        공통인 부분
        <Link to="/game/number-baseball?query=10&hello=yjCho&bye=bye">숫자야구</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto-generator">로또 생성기</Link>
        &nbsp;
        <Link to="/game/index">게임 매쳐</Link>
        </div>

        <div>
            {/* <Route path="/number-baseball" component={NumberBaseball} />
            <Route path="/rock-scissors-paper" component={RSP} />
            <Route path="/lotto-generator" component={Lotto}/> */}

            {/* 동적 라우트 매칭  (라우트를 줄일 수 있는 방법) 
            :name 이 부분은 동적으로 바뀌게 된다
            */}
            <Route path="/game/:name" component={GameMatcher}/>

        </div>
        </BrowserRouter>
    );
};

export default Games;