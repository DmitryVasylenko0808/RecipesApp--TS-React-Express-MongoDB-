import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
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
            <Link
              to="/create"
              className="min-w-[70px] min-h-[70px] px-4 flex justify-center items-center gap-x-2 text-lg text-white font-bold hover:bg-transparent/10 duration-300"
            >
              + Create recipe
            </Link>
            {isAuthenticate ? <UserMenu user={user!} /> : <LogInButton />}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
