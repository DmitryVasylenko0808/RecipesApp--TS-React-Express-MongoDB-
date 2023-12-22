import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeButton from "./ThemeButton";
import UserMenu from "./UserMenu";
import LogOutButton from "./LogOutButton";
import Container from "../../../components/Container";

const Header = () => {
  return (
    <header className="bg-red">
      <Container>
        <div className="flex justify-between items-center">
          <Logo />
          <SearchBar />
          <div className="flex">
            <ThemeButton />
            <UserMenu />
            {/* <LogOutButton /> */}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
