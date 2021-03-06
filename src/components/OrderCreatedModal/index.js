import style from './index.module.css'
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { currencies } from "../../context/currencyContext";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function OrderCreatedModal({isOpen = false, createOrderData}) {
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Good Choice!
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <h2 className={ style.orderModal__title }>Order Details</h2>
            <ul className={ style.orderModal__list }>
              <li className={ style.orderModal__item }>
                <div>Name</div>
                <div>{createOrderData.name}</div>
              </li>
              <li className={ style.orderModal__item }>
                <div>Address</div>
                <div>{createOrderData.address}</div>
              </li>
              <li className={ style.orderModal__item }>
                <div>Email</div>
                <div>{createOrderData.order_email}</div>
              </li>
              <li className={ style.orderModal__item }>
                <div>Phone</div>
                <div>{createOrderData.phone}</div>
              </li>
              <li className={ style.orderModal__item }>
                <div>Total</div>
                <div>{`${currencies[createOrderData.currency]?.sign}${createOrderData.total}`}</div>
              </li>
            </ul>

            <p className={ style.orderModal__text }>Your order is successfully completed!</p>
            <p className={ style.orderModal__text }>Enjoy your pizza and have a nice day!</p>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Thank you!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
