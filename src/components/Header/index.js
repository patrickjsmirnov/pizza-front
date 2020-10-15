import styles from './index.module.css'
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import {CurrencyContext} from '../../context/currencyContext'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { GoogleLogin, useGoogleLogin, GoogleLogout } from 'react-google-login';
import { useDispatch } from "react-redux";
import {deleteUser, saveUser} from "../../redux/actions/user";
import LoggedMenu from "../LoggedMenu";
import { useSelector } from "react-redux";
import Button from '@material-ui/core/Button';
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
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  function handleChange(event) {
    toggleCurrency(event.target.value)
  }

  const responseGoogle = (response) => {
   const user = getUser(response)

    dispatch(saveUser(user))
  }

  const getUser = (response) => {
    return {
      name: response.nt.Ad,
      email: response.nt.Wt,
    }
  }

  const logout = () => {
    dispatch(deleteUser())
  }



  return (
    <header className={ styles.header }>

      {user.name && (
        <LoggedMenu
          user={ user }
        />
      )}



      {!user.name && (
        <GoogleLogin
          clientId="536577472648-04u99j69daptpi6rhfmli25djhlnj5f3.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (
            <Button disabled={renderProps.disabled} variant="contained" color="primary" onClick={renderProps.onClick}>
              Log In
            </Button>
          )}
        />
      )}


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


