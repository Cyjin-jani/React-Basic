import React from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';
import NumberBaseball from '../3.숫자야구게임/NumberBaseBall';
import RSP from '../5. 가위바위보게임/RSP';
import Lotto from '../6.로또추첨기/Lotto';

const Games = () => {
    
    //최상위를 브라우저라우터 혹은 해쉬라우터로 감싸주어야 함
    return (
        <BrowserRouter>
        
        <div>
        공통인 부분
        <Link to="/number-baseball">숫자야구</Link>
        &nbsp;
        <Link to="/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/lotto-generator">로또 생성기</Link>
        </div>

        <div>
            <Route path="/number-baseball" component={NumberBaseball} />
            <Route path="/rock-scissors-paper" component={RSP} />
            <Route path="/lotto-generator" component={Lotto}/>

        </div>
        </BrowserRouter>
    );
};

export default Games;