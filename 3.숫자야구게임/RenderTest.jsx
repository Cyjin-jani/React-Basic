//import React, { Component } from 'react';
const React = require('react');
const { PureComponent } = React;

//렌더링 성능 테스트를 위한 컴포넌트 
class Test extends PureComponent {
    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: {},
        array: [],
    };
    //PureComponent는 기본적인 변수들의 변화는 쉽게 알아차리지만,
    //object라던가, 배열의 변화는 제대로 알아차리지 못하는 경우가 있다.

    //버튼만 누르면, 직접 스테이트를 바꾼게 없어도 렌더링이 되버리기 때문에,
    //직접 어떤 경우에 렌더링이 되는 지를 지정해주어야 한다.
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if (this.state.counter !== nextState.counter) {
    //         return true;
    //     }
    //     return false;
    // }

    //위의 방법 혹은 Component 대신 PureComponent를 import 해도 된다.
    //shouldComponentUpdate를 자동으로 구현해 놓은 것이 PureComponent

    onClick = () => {
        this.setState({
            //array: [...this.state.array, 1], //요렇게 하면 배열의 변화를 인지해서 렌더링이 된다!
            //그냥 array: array 이런식으로 하면 알아차릴 수 없다....
        });
    };
    
    /*
    예를 들어, {a: 1}에서 setState {a: 1}을 할 떄,
    새로 렌더링 하므로 state에는 객체구조를 안 쓰는게 좋다.
    자료구조를 너무 복잡하게 하면 PureComponent가 변화를 알아차리기 어렵다!
    */

    render() {
        console.log('랜더링', this.state);
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        );
    }
}

module.exports = Test;