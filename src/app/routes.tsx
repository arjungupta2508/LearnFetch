import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { SearchPage } from "./pages/SearchPage";
import { SavedResourcesPage } from "./pages/SavedResourcesPage";
import { ResourceDetailPage } from "./pages/ResourceDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: SearchPage },
      { path: "saved", Component: SavedResourcesPage },
      { path: "resource/:id", Component: ResourceDetailPage },
    ],
  },
]);
