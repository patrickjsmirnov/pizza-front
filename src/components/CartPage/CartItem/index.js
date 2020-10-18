import styles from './index.module.css'
import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types'
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { deleteFromCart, changeQty } from "../../../redux/actions/cart";
import {CurrencyContext} from "../../../context/currencyContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 40,
  }
}));

const CartItem = ({ id, name, url, description, priceUsd, priceEur, qty }) => {
  const { currency } = useContext(CurrencyContext);
  const price = currency.value === 0 ? priceUsd * qty : priceEur * qty
  const dispatch = useDispatch()
  const classes = useStyles();

  function handleDeleteFromCart(event) {
    event.preventDefault()
    dispatch(deleteFromCart(id))
  }

  function handleChangeQty(event) {
    event.preventDefault()
    dispatch(changeQty({ id, qty: event.target.value }))
  }

  return (
    <li to={`/pizza/${id}`} className={ styles.cardItem } key={ id }>
      <img className={ styles.cardItem__img } src={url} alt=""/>
      <div className={ styles.cardItem__info }>
        <p className={ styles.cardItem__name }>{name}</p>
        <p className={ styles.cardItem__description }>{description}</p>
      </div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ qty }
          onChange={handleChangeQty}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>

      <p className={ styles.cardItem__price }>{`${currency.sign} ${price}`}</p>
      <DeleteIcon className={ styles.cardItem__delete } onClick={ handleDeleteFromCart }/>
    </li>
  )
}

export default memo(CartItem)

CartItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priceUsd: PropTypes.number.isRequired,
  priceEur: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired
}
