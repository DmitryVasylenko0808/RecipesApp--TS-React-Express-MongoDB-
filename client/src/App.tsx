import React, { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useAppDispatch } from "./redux/hooks";
import { useLazyGetMeQuery } from "./api/auth/authApi";
import { setUserInfo } from "./redux/slices/authSlice";
import { setFavorites } from "./redux/slices/favoritesSlice";
import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import MainPage from "./pages/MainPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import RequireAuth from "./components/RequireAuth";
import ProfileEditPage from "./pages/ProfileEditPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const dispatch = useAppDispatch();

  const { isAuthenticate, token } = useAuth();

  const [fetchUser] = useLazyGetMeQuery();

  useEffect(() => {
    if (!isAuthenticate && token) {
      fetchUser()
        .unwrap()
        .then((res) => {
          const { avatar_file, favorite_recipes, ...userData } = res;
          dispatch(setUserInfo({ ...userData, token }));
          dispatch(setFavorites(favorite_recipes));
        })
        .catch((err) => alert(err.data.message));
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path=":recipeId" element={<RecipeDetailsPage />} />
        <Route path="create" element={<CreateRecipePage />} />
        <Route element={<RequireAuth />}>
          <Route path=":recipeId/edit" element={<EditRecipePage />} />
        </Route>
        <Route path="profile/:userId" element={<ProfilePage />} />
        <Route element={<RequireAuth />}>
          <Route path="profile/:userId/edit" element={<ProfileEditPage />} />
        </Route>
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
