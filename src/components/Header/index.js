import styles from './index.module.css'
import React, { useContext } from 'react';
import {CurrencyContext} from '../../context/currencyContext'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import HeaderMenu from "./HeaderMenu";
import HeaderCart from "./HeaderCart";
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    minWidth: 60,
  }
}));

const Header = () => {
  const { toggleCurrency, currency } = useContext(CurrencyContext);
  const classes = useStyles();
  const history = useHistory()

  function handleChange(event) {
    toggleCurrency(event.target.value)
  }

  return (
    <header className={ styles.header }>

      <div className={ styles.header__menu__wrapper }>
        <HeaderMenu/>

        <Button
          onClick={ () => history.push('/') }
          color="base"
        >
          All Pizza
        </Button>
      </div>



      <HeaderCart/>

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


