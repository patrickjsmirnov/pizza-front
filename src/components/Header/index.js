import styles from './index.module.css'
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import {CurrencyContext} from '../../context/currencyContext'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    minWidth: 80,
  }
}));

const Header = () => {
  const { toggleCurrency, currency } = useContext(CurrencyContext);
  const classes = useStyles();

  function handleChange(event) {
    toggleCurrency(event.target.value)
  }

  return (
    <header className={ styles.header }>
      <Link to="/">Catalog</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/checkout">Checkout</Link>

      <FormControl className={classes.formControl}>
        <Select
          value={ currency.name }
          onChange={ handleChange }
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="usd">USD</MenuItem>
          <MenuItem value="eur">EUR</MenuItem>
        </Select>
      </FormControl>

    </header>
  )
}

export default Header


