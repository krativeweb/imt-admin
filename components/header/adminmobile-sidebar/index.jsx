"use client";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import mobileMenuData from "../../../data/adminMobilemenudata";
import SidebarHeader from "./SidebarHeader";
import {
  isActiveLink,
  isActiveParentChaild,
} from "../../../utils/linkActiveChecker";
import { usePathname, useRouter } from "next/navigation";

const MobileMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      {/* ================= HEADER ================= */}
      <SidebarHeader />

      <p
        style={{
          textAlign: "center",
          fontWeight: 800,
          fontSize: "20px",
          marginTop: "20px",
          backgroundColor: "#043389",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Admin Panel
      </p>

      {/* ================= SIDEBAR ================= */}
      <Sidebar>
        <Menu>
          {mobileMenuData.map((item) =>
            item.children && item.children.length > 0 ? (
              <SubMenu
                key={item.id}
                label={item.name}
                icon={
                  item.icon ? <i className={`la ${item.icon}`} /> : null
                }
                className={
                  isActiveParentChaild(item.children, pathname)
                    ? "menu-active"
                    : ""
                }
              >
                {item.children.map((child) => (
                  <MenuItem
                    key={child.id}
                    onClick={() => router.push(child.routePath)}
                    className={
                      isActiveLink(child.routePath, pathname)
                        ? "menu-active-link"
                        : ""
                    }
                  >
                    {child.name}
                  </MenuItem>
                ))}
              </SubMenu>
            ) : (
              <MenuItem
                key={item.id}
                icon={
                  item.icon ? <i className={`la ${item.icon}`} /> : null
                }
                onClick={() => router.push(item.routePath)}
                className={
                  isActiveLink(item.routePath, pathname)
                    ? "menu-active-link"
                    : ""
                }
              >
                {item.name}
              </MenuItem>
            )
          )}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default MobileMenu;
