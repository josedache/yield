import { useState, useEffect } from 'react';
import { ToggleButtonGroup, styled, toggleButtonGroupClasses } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const useStyledToggleButtonGroup = () => {
  const theme = useTheme();
  const [styles, setStyles] = useState({});

  useEffect(() => {
    setStyles({
      [`& .${toggleButtonGroupClasses.grouped}`]: {
        margin: theme.spacing(0.5),
        border: 0,
        borderRadius: theme.shape.borderRadius,
        [`&.${toggleButtonGroupClasses.disabled}`]: {
          border: 0,
        },
      },
      [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]: {
        marginLeft: -1,
        borderLeft: "1px solid transparent",
      },
      [`& .${toggleButtonGroupClasses.grouped}.Mui-selected`]: {
        backgroundColor: 'white',
        color: 'black',
        border: `1px solid #d3d4d6`,
        boxShadow: `0px 2px 4px rgba(0,0,0,0.1)`,
      },
      [`& .${toggleButtonGroupClasses.grouped}.MuiToggleButton-root:hover`]: {
        backgroundColor: theme.palette.primary.lighter,
      },
    });
  }, [theme]);

  return styled(ToggleButtonGroup)`${styles}`;
};

export default useStyledToggleButtonGroup;