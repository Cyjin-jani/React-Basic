//import React, { Component } from 'react';
const React = require('react');
const { Component } = React; 

class Try extends Component {
    render() {
        const { tryInfo } = this.props; //비구조화 문법으로 간단하게! 
        return (
            <li>
                 {/* <b>{ this.props.value.fruit}</b> - {this.props.index}
                 <div>컨텐츠1</div>
                 <div>컨텐츠2</div>
                 <div>컨텐츠3</div> */}
                {/* 숫자야구 */}
                 <div>{tryInfo.try}</div>
                 <div>{tryInfo.result}</div>
            </li>
        )
    }
}

module.exports = Try;
