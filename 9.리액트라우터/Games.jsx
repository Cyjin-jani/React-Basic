import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import NumberBaseball from '../3.숫자야구게임/NumberBaseBallHOOKS';
import RSP from '../5. 가위바위보게임/RSP_HOOKS';
import Lotto from '../6.로또추첨기/LottoHOOKS';

const Games = () => {
    
    //최상위를 브라우저라우터 혹은 해쉬라우터로 감싸주어야 함
    return (
        <BrowserRouter>
        <div>
            <Route path="/number-baseball" component={NumberBaseball} />
            <Route path="/rock-scissors-paper" component={RSP} />
            <Route path="/lotto-generator" component={Lotto}/>

        </div>
        </BrowserRouter>
    );
};

export default Games;