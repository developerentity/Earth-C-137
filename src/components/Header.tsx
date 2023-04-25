import { AppBar, Box, Button, MenuItem, Toolbar, Typography } from "@mui/material";
import { NavLink, useLoaderData } from "react-router-dom";


const Header = () => {

    const { navList }: any = useLoaderData();

    return <Box sx={{ flexGrow: 1 }}>
        <AppBar component="nav" position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Rich and Morty
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {navList.map((item: { title: string; href: string }) => (
                        <Button key={item.title}>
                            <NavLink
                                key={item.title}
                                to={item.href}
                                style={{ textDecoration: "none" }}
                                className={({ isActive, isPending }) =>
                                    isActive ? "active" : isPending ? "pending" : ""
                                }
                            >
                                <MenuItem>
                                    {item.title}
                                </MenuItem>
                            </NavLink>
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    </Box>
}

export default Header;