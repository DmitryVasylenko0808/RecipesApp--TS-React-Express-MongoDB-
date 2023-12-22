import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeButton from "./ThemeButton";
import UserButton from "./UserButton";
import LogOutButton from "./LogOutButton";
import Container from "../../../components/Container";

const Header = () => {
  return (
    <header className="bg-red shadow-xl">
      <Container>
        <div className="flex justify-between items-center">
          <Logo />
          <SearchBar />
          <div className="flex">
            <ThemeButton />
            {/* <UserButton /> */}
            <LogOutButton />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
