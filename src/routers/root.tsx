import { Backdrop, Container } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useAppSelector } from "../app/hooks";

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

    const { appLoading } = useAppSelector(store => store.loadingSlice)

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={appLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Header />
            <Container>
                <Outlet />
            </ Container>
        </>
    )
}

export default Root;