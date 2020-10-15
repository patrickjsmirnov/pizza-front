import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { GoogleLogin, useGoogleLogin, GoogleLogout } from 'react-google-login';
import {deleteUser} from "../../redux/actions/user";
import { useDispatch } from "react-redux";

export default function LoggedMenu({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch(deleteUser())
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {user.name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>My orders</MenuItem>

        <GoogleLogout
          clientId="536577472648-04u99j69daptpi6rhfmli25djhlnj5f3.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
          render={renderProps => (
            <MenuItem disabled={renderProps.disabled} onClick={renderProps.onClick}>Logout</MenuItem>
          )}
        >
        </GoogleLogout>

      </Menu>
    </div>
  );
}
