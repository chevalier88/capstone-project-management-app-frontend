/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
};

export default function Iconify({ icon, sx, ...other }) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}