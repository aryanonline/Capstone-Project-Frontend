import React, { useContext } from "react";
import {Nav, NavLogo, NavLink, NavMenu, NavBtnLink} from './NavBarElements';
import Home from '../../components/Home/Home';
import Services from '../../components/Services/Services';
import { AuthContext } from "../../context/AuthContext";
import ProfileDetailsPage from "../../pages/Profile-Details-Page/ProfileDetailsPage";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = ({ toggle }) => {
    const {state, dispatch} = useContext(AuthContext);

    const logoutCallback = () => {
        sessionStorage.clear();
        dispatch({role: null, id: null});
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <Nav>
            <NavLogo tabIndex={0}>
                <img src={require('../../images/logo.PNG').default} alt="Scoop-Logo" width={85} height={85} />
            </NavLogo>
            <NavMenu>
                <NavLink to="/" component={Home} tabIndex={0}>Home</NavLink>
                <NavLink smooth to="/#services" component={Services} tabIndex={0}>Services</NavLink>
                
                {state?.role ?  (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 40, height: 40, backgroundColor: '#033880', fontSize: 24 }}>{sessionStorage.getItem("firstName")?.charAt(0).toUpperCase()}</Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                                },
                                '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                },
                            },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            {state?.role == "driver" && 
                                <MenuItem onClick={handleClose}>
                                    <><NavLink smooth to="/driver" component={Services} tabIndex={0}>Offer Ride</NavLink></>
                                </MenuItem>
                            }
                            {state?.role == "driver" && 
                                <MenuItem onClick={handleClose}>
                                    <><NavLink smooth to="/driver/accepted-rides" component={Services} tabIndex={0}>Accepted Rides</NavLink></>
                                </MenuItem>
                            }
                            {state?.role == "passenger" && 
                                <MenuItem onClick={handleClose}>
                                    <><NavLink smooth to="/passenger" component={Services} tabIndex={0}>Request Ride</NavLink></>
                                </MenuItem>
                            }
                            {state?.role == "passenger" &&
                                <MenuItem onClick={handleClose}>
                                    <><NavLink smooth to="/passenger/accept-deny" component={Services} tabIndex={0}>Pending Requests</NavLink></>
                                </MenuItem>
                            }
                            {state?.role == "passenger" && 
                                <MenuItem onClick={handleClose}>
                                    <><NavLink smooth to="/passenger/accepted-rides" component={Services} tabIndex={0}>Accepted Ride</NavLink></>
                                </MenuItem>
                            }
                            {state?.role && 
                                <Divider />
                            }
                            {state?.role && 
                                <MenuItem onClick={handleClose}>
                                    <><Avatar /><NavLink smooth to="/profile-details" component={ProfileDetailsPage} tabIndex={0}>My Profile</NavLink></>
                                </MenuItem>
                            }
                            
                            {state?.role != null ? (
                                <MenuItem onClick={handleClose}>
                                    <SettingsIcon sx={{ width: 25, height: 25}} /><NavLink smooth to="/login" tabIndex={0} onClick={logoutCallback}>
                                        Log out
                                    </NavLink>
                                </MenuItem>
                            ) : (
                                <NavLink smooth to="/login" tabIndex={0}>
                                    Log In
                                </NavLink>
                            )}
                        </Menu>
                    </>
                    ) : (
                        <NavBtnLink smooth to="/login" tabIndex={0}>Log In</NavBtnLink>
                    )
                }
            </NavMenu>
        </Nav>
    )
}

export default Navbar;