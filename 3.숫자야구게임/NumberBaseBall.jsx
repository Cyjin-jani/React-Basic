const React = require('react');

const { Component } = React; 

class NumberBaseBall extends Component {
    state = {
        word: '안녕',
        value: '',
        result: '',
    };

    render() {
        return (
        <>
            <h1> test 숫자야구 </h1>    
        </>    
        );
    };
};

module.exports = NumberBaseBall;