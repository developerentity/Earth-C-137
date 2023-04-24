import {
    Container,
    MenuItem,
} from "@mui/material"
import { NavLink, Outlet, useLoaderData } from "react-router-dom";

const list = [
    {
        href: '/',
        title: 'Characters',
    },
    {
        href: '/locations',
        title: 'Locations',
    },
    {
        href: '/episodes',
        title: 'Episodes',
    },
]
const getNavList = async () => {
    return list
}

export async function loader() {
    const navList = await getNavList();
    return { navList };
}

const Root = () => {

    const { navList }: any = useLoaderData();

    return (
        <>
            <nav>
                {navList.map((item: { title: string; href: string }) => (
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
                ))}
            </nav>
            <Container>
                <Outlet />
            </ Container>
        </>
    )
}

export default Root;