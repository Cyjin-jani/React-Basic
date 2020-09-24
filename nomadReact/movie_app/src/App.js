import React from "react";
import PropTypes from "prop-types";

const foodILike = [
  {
    id: 1,
    name: "Kimchi",
    image:
      "https://futuredish.com/wp-content/uploads/2017/12/Korean-Kimchi.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Samgyopsal",
    image:
      "https://img.kr.news.samsung.com/kr/wp-content/uploads/2017/03/%ED%91%B8%EB%93%9C%ED%8F%AC%EC%BB%A4%EC%8A%A44%ED%8E%B804.jpg",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Bibimbap",
    image:
      "https://recipe1.ezmember.co.kr/cache/recipe/2017/04/13/abcf293fb7d0d73d61e274127ced7b931.jpg",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Dongatsu",
    image:
      "https://recipe1.ezmember.co.kr/cache/recipe/2019/01/12/b9343d314206275c1b6d0d0c4fcc2ce71.jpg",
  },
];

function Food({ name, picture, rating }) {
  return (
    <div>
      {" "}
      <h2>I like {name}</h2>
      <h4>{rating} of 5.0</h4>
      <img src={picture} alt={name} />
    </div>
  );
}

Food.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number,
};

function App() {
  return (
    <div>
      <h1>FOOD !!!</h1>
      {/* <Food fav="kimchi" /> */}
      {/* Food 컴포넌트에 prop으로 fav : kimchi를 전달함 */}
      {foodILike.map((dish) => (
        <Food
          key={dish.id}
          name={dish.name}
          picture={dish.image}
          rating={dish.rating}
        />
      ))}
    </div>
  );
}

export default App;
