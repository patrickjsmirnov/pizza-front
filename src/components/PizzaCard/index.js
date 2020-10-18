import styles from './index.module.css'
import React, { useContext, memo } from 'react';
import { CurrencyContext } from '../../context/currencyContext'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

const PizzaCard = ({ id, name, description, url, priceUsd, priceEur }) => {
  const { currency } = useContext(CurrencyContext);
  const { sign, value } = currency
  const cost = value === 0 ? priceUsd : priceEur

  return (
      <Link to={ `/pizza/${id}` } key={ id } className={styles.pizzaCard}>
        <img className={ styles.pizzaCard__img } src={url} alt={name} title={name}/>
        <span className={ styles.pizzaCard__name }>{name}</span>
        <span className={ styles.pizzaCard__description }>{description}</span>
        <span className={ styles.pizzaCard__cost }>{`${cost} ${sign}`}</span>
      </Link>
  );
}

export default memo(PizzaCard)

PizzaCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  priceUsd: PropTypes.number.isRequired,
  priceEur: PropTypes.number.isRequired
}
