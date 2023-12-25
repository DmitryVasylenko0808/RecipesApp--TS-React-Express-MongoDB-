import React from "react";
import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import AuthLayout from "./layouts/AuthLayout";
import MainPage from "./pages/MainPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import ProfileRecipesPage from "./pages/ProfileRecipesPage";
import ProfileFavoritesPage from "./pages/ProfileFavoritesPage";
import RequireAuth from "./components/RequireAuth";
import ProfileEditPage from "./pages/ProfileEditPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import { useAppSelect } from "./redux/hooks";

const App = () => {
  const state = useAppSelect((state) => state.auth);

  console.log(state);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path=":recipeId" element={<RecipeDetailsPage />} />
        <Route element={<RequireAuth />}>
          <Route path="create" element={<CreateRecipePage />} />
          <Route path=":recipeId/edit" element={<EditRecipePage />} />
        </Route>
        <Route path="profile/:userId" element={<ProfileLayout />}>
          <Route path="recipes" element={<ProfileRecipesPage />} />
          <Route path="favorites" element={<ProfileFavoritesPage />} />
          <Route element={<RequireAuth />}>
            <Route path="edit" element={<ProfileEditPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
};

export default App;
