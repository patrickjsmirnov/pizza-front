import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {deleteUser, saveUser} from "../../../redux/actions/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch()
  const history = useHistory();
  const user = useSelector(state => state.user.user)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch(deleteUser())
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

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {user.name || 'Menu'}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {history.push("/"); handleClose() }}>All Pizza</MenuItem>
        <MenuItem onClick={() => {history.push("/cart"); handleClose() }}>Cart</MenuItem>
        <MenuItem onClick={() => {history.push("/checkout"); handleClose() }}>Checkout</MenuItem>

        {user.email && (
          <MenuItem onClick={() => {history.push("/orders"); handleClose() }}>My orders</MenuItem>
        )}


        {!user.email && (
          <GoogleLogin
            clientId="536577472648-04u99j69daptpi6rhfmli25djhlnj5f3.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <MenuItem disabled={renderProps.disabled} onClick={renderProps.onClick}>Log In</MenuItem>
            )}
          />
        )}

        {user.email && (
          <GoogleLogout
            clientId="536577472648-04u99j69daptpi6rhfmli25djhlnj5f3.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
            render={renderProps => (
              <MenuItem disabled={renderProps.disabled} onClick={renderProps.onClick}>Logout</MenuItem>
            )}
          >
          </GoogleLogout>
        )}

      </Menu>
    </div>
  );
}

export default HeaderMenu
