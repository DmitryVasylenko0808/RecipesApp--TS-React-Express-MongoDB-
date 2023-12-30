import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeButton from "./ThemeButton";
import UserMenu from "./UserMenu";
import LogInButton from "./LogInButton";
import Container from "../../../components/Container";
import { useAuth } from "../../../hooks/useAuth";

const Header = () => {
  const { isAuthenticate, user } = useAuth();

  console.log(isAuthenticate);
  console.log(user);

  return (
    <header className="bg-red">
      <Container>
        <div className="flex justify-between items-center">
          <Logo />
          <SearchBar />
          <div className="flex">
            <Link to="/create">Create recipe</Link>
            <ThemeButton />
            {isAuthenticate ? <UserMenu user={user!} /> : <LogInButton />}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
