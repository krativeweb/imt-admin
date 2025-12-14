"use client";

import Link from "next/link";
import employerMenuData from "../../data/adminMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice.js";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./DashboardAdminSidebar.module.css";

const DashboardEmployerSidebar = () => {
  const { menu } = useSelector((state) => state.toggle || {});
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [openSubMenu, setOpenSubMenu] = useState(null);

  const menuToggleHandler = () => dispatch(menuToggle());

  const handleSubMenuToggle = (id) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  // ✅ ACTIVE STYLE (USED ONLY FOR LINKS)
  const activeStyle = {
    color: "var(--primary-color)",
    background: "rgba(25, 103, 210, 0.1)",
    borderRadius: "10px",
  };

  // ✅ Auto-open submenu if a child route is active
  useEffect(() => {
    employerMenuData.forEach((item) => {
      if (
        item.children?.some((child) =>
          isActiveLink(child.routePath, pathname)
        )
      ) {
        setOpenSubMenu(item.id);
      }
    });
  }, [pathname]);

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Mobile close */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>

      <p className={styles.adminTitle}>Admin Panel</p>

      <div className="sidebar-inner">
        <ul className="navigation">
          {employerMenuData.map((item) => {
            const hasChildren = item.children?.length > 0;
            const isOpen = openSubMenu === item.id;

            return (
              <li key={item.id} className="mb-1">
                {/* ---------------- NORMAL MENU ---------------- */}
                {!hasChildren && (
                  <Link
                    href={item.routePath}
                    onClick={menuToggleHandler}
                    style={
                      isActiveLink(item.routePath, pathname)
                        ? activeStyle
                        : undefined
                    }
                  >
                    <i className={`la ${item.icon}`}></i> {item.name}
                  </Link>
                )}

                {/* ---------------- SUBMENU ---------------- */}
                {hasChildren && (
                  <>
                    {/* SUBMENU PARENT (NO ACTIVE BACKGROUND) */}
                    <div
                      className="menu-link d-flex align-items-center justify-content-between px-4 py-2"
                      onClick={() => handleSubMenuToggle(item.id)}
                    >
                      <span>
                        <i
                          className={`la ${item.icon}`}
                          style={{ fontSize: "22px" }}
                        ></i>{" "}
                        {item.name}
                      </span>

                      <i
                        className={`la ${
                          isOpen ? "la-angle-up" : "la-angle-down"
                        }`}
                      ></i>
                    </div>

                    {/* SUBMENU CHILDREN */}
                    {isOpen && (
                      <ul className="submenu">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              href={child.routePath}
                              onClick={menuToggleHandler}
                              style={
                                isActiveLink(child.routePath, pathname)
                                  ? activeStyle
                                  : undefined
                              }
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DashboardEmployerSidebar;
