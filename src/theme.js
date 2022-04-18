// import React from 'react';
import { createTheme } from '@material-ui/core/styles';
import variables from './styles/abstract/_variables.scss';

const colors = {
  primary: variables.brandPrimary,
  primaryDark: variables.brandPrimary,
  error: variables.error,
  errorDarker: variables.errorDarker,
  success: variables.success,
  successDarker: variables.successDarker,
  info: variables.info,
  infoDarker: variables.infoDarker,
  warning: variables.warning,
  warningDarker: variables.warningDarker,
  primaryLight: '#5f6b79',
  primaryContrast: '#fff',
  secondary: variables.brandSecondary,
  secondaryDark: variables.brandSecondaryDark,
  secondaryLight: variables.brandSecondaryLight,
  secondaryContrast: '#374658',
};

export { colors };

export default createTheme({
  overrides: {
    MuiAppBar: {
      colorDefault: {
        color: variables.brandPrimary,
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 12px) scale(1)'
      }
    },
    MuiOutlinedInput: {
      root: {
        // borderRadius: '20px',
        '&.Mui-focused.MuiOutlinedInput-notchedOutline': {
          backgroundColor: variables.errorDarker,
          borderColor: variables.errorDarker,
        },
        '&.MuiOutlinedInput-notchedOutline': {
          borderColor: variables.errorDarker,
        },
      },
      input: {
        padding: '12px 10px',
      },
      notchedOutline: {
        '&.MuiOutlinedInput-root.Mui-focused': {
          backgroundColor: variables.errorDarker,
        },
      },
    },
    MuiFormLabel: {
      root: {
        '&.Mui-focused': {
          color: colors.info,
        },
        '&.Mui-focused.Mui-error': {
          color: colors.error,
        },
      },
    },
    MuiPaper: {
      root: {
        // backgroundColor: variables.brandPrimaryDarkest
      },
    },
    MuiBottomNavigation: {
      root: {
        // backgroundColor: variables.brandPrimary
      },
    },
    MuiBottomNavigationAction: {
      root: {
        '&.Mui-selected': {
          // backgroundColor: variables.brandPrimaryDarker,
          // borderTop: `solid 2px ${variables.brandPrimaryDarker}`,
          padding: '6px',
        },
        '&.MuiBottomNavigationAction-iconOnly': {
          paddingTop: '6px',
        },
      },
      iconOnly: {
        paddingTop: '6px',
      },
      wrapper: {
        flexDirection: 'row',
      },
      label: {
        '&.Mui-selected': {
          color: variables.brandPrimaryDarker,
        },
        marginLeft: '5px',
        // color: '#e2e2e2'
      },
    },
    MuiTab: {
      root: {
        textTransform: 'initial',
      },
    },
    MuiFormControl: {
      marginNormal: {
        'margin-top': '0px',
        'margin-bottom': '20px',
      },
    },
    MuiButton: {
      outlined: {},
      root: {
        padding: '5px 10px',
        // borderRadius: '10px',
        fontSize: 12,
      },
    },
    MuiInputBase: {
      input: {},
    },
  },
  palette: {
    primary: {
      main: variables.brandPrimary,
      light: variables.brandPrimaryLight,
      dark: variables.brandPrimaryDarkest,
      contrastText: variables.brandPrimaryContast,
    },
    secondary: {
      main: colors.secondary,
      light: colors.secondaryLight,
      dark: colors.secondaryDark,
      contrastText: colors.secondaryContast,
    },
    // type: 'dark'
  },
  spacing: (factor) => [0, 4, 8, 16, 32, 64][factor],
  shadows: Array(25).fill('none'),
  typography: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    useNextVariants: true,
  },
});
