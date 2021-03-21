import React from "react";
import { Navigate } from "react-router-dom";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import NotFoundView from "./views/errors/NotFoundView";
import MainLayout from "./layouts/MainLayout";
import CartView from "./views/CartView";
import ProfileView from "./views/ProfileView";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomeView /> },
      { path: "/profile", element: <ProfileView /> },
      { path: "/cart", element: <CartView /> },
    ],
  },
  { path: "/login", element: <LoginView /> },
  { path: "404", element: <NotFoundView /> },
  { path: "*", element: <Navigate to="/404" /> },
];

export default routes;
