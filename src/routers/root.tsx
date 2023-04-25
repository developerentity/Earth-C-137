import { Container } from "@mui/material"
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

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

const Root = () => (
    <>
        <Header />
        <Container>
            <Outlet />
        </ Container>
    </>
)

export default Root;