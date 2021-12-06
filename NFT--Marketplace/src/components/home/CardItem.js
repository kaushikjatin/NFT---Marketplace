import React from 'react';

function CardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <a className="cards__item__link" href={props.linkedninHandle}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img1'
              alt='item Card'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </a>
      </li>
    </>
  );
}

export default CardItem;