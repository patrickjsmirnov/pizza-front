import React, { memo } from 'react';
import { Rating } from '@material-ui/lab/';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types'

const PizzaRating = ({ value }) => (
  <div>
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Rating name="read-only" value={value} readOnly />
    </Box>
  </div>
)

export default memo(PizzaRating)

PizzaRating.defaultProps = {
  value: 5
}

PizzaRating.propTypes = {
  value: PropTypes.number.isRequired
}
