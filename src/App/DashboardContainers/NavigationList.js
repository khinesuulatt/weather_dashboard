import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SummarizeIcon from '@mui/icons-material/Summarize';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

const NavigationList = () => {
  return (
    <List>
      {['Home', 'User List', 'Reports'].map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton component={Link}
            to={text === 'Home' ? '/' : text.replace(' ', '').toLowerCase()}>
            <ListItemIcon>
              {
                text === 'Home' ?

                  <Tooltip title="Home" arrow placement="right">
                    <span>
                      <HomeIcon style={{color: '#fff'}} />
                    </span>
                  </Tooltip>
                  : text === 'User List' ?
                    <Tooltip title="User List" arrow placement="right">
                      <span>
                        <PeopleIcon style={{color: '#fff'}}/>
                      </span>
                    </Tooltip>

                    : <Tooltip title="Weather Reports" arrow placement="right">
                      <span>
                        <SummarizeIcon style={{color: '#fff'}}/>
                      </span>
                    </Tooltip>
              }
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NavigationList;
