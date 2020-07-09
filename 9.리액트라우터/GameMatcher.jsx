import React, { Component } from 'react';


export default class GameMatcher extends Component {
    render() {
        console.log(this.props);
        return (
            <div>게임 매쳐</div>
        );
    }
}

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