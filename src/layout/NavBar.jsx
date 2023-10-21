import {useState} from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useDispatch, useSelector} from 'react-redux';
const pages = [];
import {clearAuthToken} from "../slice/authSlice.js";
import {Outlet, useNavigate} from 'react-router-dom';
import {setSelectedTab} from "../slice/profileSlice.js";

const NavBar = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const settings = [
        {label:'UserData',link:'/profile',onClick:()=>{
            navigate('/profile')
                dispatch(setSelectedTab("userData"))
        }},
        {label:'MyTickets',link:'/profile',onClick:()=>{
            navigate('/profile')
                dispatch(setSelectedTab("myTickets"))
        }},
        {label:'Rewards',link:'/rewards',onClick:()=>{navigate('/rewards')}},
        {label:'Logout',link:'/',onClick:()=>{
            dispatch(clearAuthToken())
                navigate('/')
        }}
    ];
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position="static" sx={{backgroundColor:"#0D3A8A"}}>
                <div className="mx-[12%]">
                    <Toolbar disableGutters>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} onClick={()=> navigate('/')} className="cursor-pointer" >
                            <img
                                className="aspect-auto w-24 filter invert brightness-2"
                                src="/mindspacelogo2.png"
                                alt="logo"
                            />
                        </Box>

                        <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} >
                            <img
                                className="aspect-auto w-24 filter invert brightness-2"
                                src="/mindspacelogo2.png"
                                alt="logo"
                            />
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        {
                            isAuthenticated
                                ?
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open profile">
                                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting.label} onClick={setting.onClick}>
                                                <Typography textAlign="center">{setting.label}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                                :
                                <Button
                                    onClick={()=>{}}
                                    href="/login"
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Login
                                </Button>
                        }
                    </Toolbar>
                </div>
            </AppBar>
            <Outlet/>
        </>

    )
}

export default NavBar