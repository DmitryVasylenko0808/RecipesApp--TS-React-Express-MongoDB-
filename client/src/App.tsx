import React, { Suspense, lazy, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useAppDispatch } from "./redux/hooks";
import { useLazyGetMeQuery } from "./api/auth/authApi";
import { setUserInfo } from "./redux/slices/authSlice";
import { setFavorites } from "./redux/slices/favoritesSlice";
import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import RequireAuth from "./components/RequireAuth";
import Loading from "./components/Loading";

const MainPage = lazy(() => import("./pages/MainPage"));
const RecipeDetailsPage = lazy(() => import("./pages/RecipeDetailsPage"));
const CreateRecipePage = lazy(() => import("./pages/CreateRecipePage"));
const EditRecipePage = lazy(() => import("./pages/EditRecipePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ProfileEditPage = lazy(() => import("./pages/ProfileEditPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

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
        <Route element={<RequireAuth />}>
          <Route path="create" element={<CreateRecipePage />} />
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
      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
