const React = require('react');
const {memo} = React;

//훅쓰가 아니고 그냥 함수형 컴포넌트 (사용하는 state등의 데이터가 없이 그저 백그라운드 표시라서)
//memo로 감싸는 경우는 high-order컴포넌트(h.o.c)
const Ball = memo(({ number }) => {
    let background;
    if (number <= 10){
        background = 'red';
    } else if (number <= 20){
        background = 'orange';
    } else if (number <= 30){
        background = 'yellow';
    } else if (number <= 40){
        background = 'blue';
    } else {
        background = 'green';
    }
    return (
        <div className="Ball" style={{ background }}>{number}</div>
    );
    
});

module.exports = Ball;