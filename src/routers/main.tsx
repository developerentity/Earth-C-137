import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import CharactersView from "../components/CharactersView";
import LocationsView from "../components/LocationsView";
import Root, { loader as rootLoader } from './root'


export const rootRouter = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        loader: rootLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <CharactersView />,
                        // loader: productsLoader,
                        //   action: productsAction,
                    },
                    {
                        path: "locations",
                        element: <LocationsView />,
                        //   loader: locationsLoader,
                        //   action: locationsAction,
                    },
                    // {
                    // path: "episodes",
                    // element: <EpisodesView />,
                    //   loader: episodesLoader,
                    //   action: episodes Action,
                    // },
                ],
            },
        ],
    }
]);