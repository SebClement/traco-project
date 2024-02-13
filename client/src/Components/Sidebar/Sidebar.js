import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "react-feather";
import styled from "styled-components";
import { HiHome } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const searchPlaceholder = "Search...";

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: relative;
`;

const SidebarContainer = styled.div`
  width: 100%;
  background-color: #333;
  color: #fff;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  input {
    margin-right: 10px;
  }
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SidebarItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }

  h5 {
    margin: 0;
    margin-right: 15px;
  }

  a {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: auto;
  }
`;

const Sidebar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selectedText = window.getSelection().toString().trim();
      console.log(selectedText);
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const items = [];
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchInput]);

  return (
    <LayoutContainer>
      <SidebarContainer>
        <SearchBar>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchInput}
            onChange={handleSearchChange}
          />
          <Search color="#fff" />
        </SearchBar>
        <SidebarList>
          <SidebarItem>
            <Link to="/" className="home-icon">
              <h5>Home</h5>
              <HiHome />
            </Link>
          </SidebarItem>
          {filteredItems.map((item, index) => (
            <SidebarItem key={index}>
              <Link to={`/${item.toLowerCase()}`}>
                <h5>{item}</h5>
              </Link>
            </SidebarItem>
          ))}
          <SidebarItem>
            <Link to="/dashboard" className="dashboard-icon">
              <h5>Dashboard</h5>
              <MdDashboard />
            </Link>
          </SidebarItem>
          <SidebarItem>
            <Link to="/setting" className="setting-icon">
              <h5>Setting</h5>
              <IoSettingsOutline />
            </Link>
          </SidebarItem>
        </SidebarList>
      </SidebarContainer>
    </LayoutContainer>
  );
};

export default Sidebar;
