/* eslint-disable @typescript-eslint/no-explicit-any */
import "./sidebar.css";
import {
  Add16Regular,
  Alert24Filled,
  Alert24Regular,
  ApprovalsApp24Filled,
  ApprovalsApp24Regular,
  DocumentFolder24Filled,
  DocumentFolder24Regular,
  Filter16Regular,
  MoreHorizontal24Filled,
  Poll24Filled,
  Poll24Regular,
  QuestionCircle24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";
import {
  Tree,
  TriangleDownIcon,
  TriangleEndIcon,
} from "@fluentui/react-northstar";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("bgct");

  // Hàm thay đổi className của item khi click vào icon
  const changeCSS = (item: any) => {
    setActiveItem(activeItem === item ? null : item);
  };

  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  // const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleMenu = (id: string) => {
    console.log(id);
    setSelectedMenuId((prevId) => (prevId === id ? null : id));
  };

  const idMenu1 = [
    "tree-title-customization-item-1",
    "tree-title-customization-item-2",
  ];

  useEffect(() => {
    setSelectedMenuId("tree-title-customization-item-1-1"); // Chọn mục "Tất cả" trong "Chứng từ"
    // setExpandedItems(["tree-title-customization-item-1"]); // Mở rộng menu "Chứng từ"
  }, []);
  ///Tree menu
  const items = [
    {
      id: "tree-title-customization-item-1",
      className: "Menu1",
      title: "Chứng từ",
      styles: { color: "red" },
      items: [
        {
          id: "tree-title-customization-item-1-1",
          className: "Menu2",
          title: {
            content: "Tất cả",
            badgeContent: 0,
          },
        },
        {
          id: "tree-title-customization-item-1-2",
          className: "Menu2",
          title: {
            content: "Chờ bàn giao",
            badgeContent: 2,
          },
        },
        {
          id: "tree-title-customization-item-1-3",
          className: "Menu2",
          title: {
            content: "Đang bàn giao",
            badgeContent: 0,
          },
        },
        {
          id: "tree-title-customization-item-1-4",
          className: "Menu2",
          title: {
            content: "Đã bàn giao",
            badgeContent: 0,
          },
        },
        {
          id: "tree-title-customization-item-1-5",
          className: "Menu2",
          title: {
            content: "Lưu kho",
            badgeContent: 0,
          },
        },
      ],
    },
    {
      id: "tree-title-customization-item-2",
      className: "Menu1",
      title: "Đề xuất",
      items: [
        {
          id: "tree-title-customization-item-2-1",
          className: "Menu2",
          title: { content: "Tất cả", badgeContent: 0 },
        },
        {
          id: "tree-title-customization-item-2-2",
          className: "Menu2",
          title: { content: "Chờ xử lý", badgeContent: 2 },
        },
        {
          id: "tree-title-customization-item-2-3",
          className: "Menu2",
          title: { content: "Đã xử lý", badgeContent: 0 },
        },
      ],
    },
  ];

  const titleRenderer = (
    Component,
    { content, expanded, open, hasSubtree, badgeContent, ...restProps }
  ) => {
    // console.log({
    //   data: { content, expanded, open, hasSubtree, ...restProps },
    // });
    const isSelected = selectedMenuId === restProps.id;
    return (
      <Component expanded={expanded} hasSubtree={hasSubtree} {...restProps}>
        <div
          className="title"
          {...restProps}
          onClick={
            restProps.level === 2 ? () => toggleMenu(restProps.id) : undefined
          }
          style={{
            background: isSelected ? "#fff" : "transparent",
            fontWeight: isSelected ? "600" : "normal",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {hasSubtree && restProps.level === 1 ? (
            expanded ? (
              <TriangleDownIcon />
            ) : (
              <TriangleEndIcon />
            )
          ) : null}

          <div className="titleContent">{content}</div>

          {restProps.level === 2 && badgeContent !== 0 ? (
            <div className="badge">{badgeContent}</div>
          ) : null}
        </div>
      </Component>
    );
  };
  return (
    <div className="sidebar">
      <div className="sidebarMenu">
        <div className="sidebarMenu_top">
          <div
            className={
              activeItem === "notification"
                ? "sidebarMenu_itemCss"
                : "sidebarMenu_item"
            }
            onClick={() => changeCSS("notification")}
          >
            <div className="sidebarMenu_icon">
              {activeItem === "notification" ? (
                <Alert24Filled />
              ) : (
                <Alert24Regular />
              )}
            </div>
            <p className="sidebarMenu_text">Thông báo</p>
          </div>

          <div
            className={
              activeItem === "dashboard"
                ? "sidebarMenu_itemCss"
                : "sidebarMenu_item"
            }
            onClick={() => changeCSS("dashboard")}
          >
            <div className="sidebarMenu_icon">
              {activeItem === "dashboard" ? (
                <Poll24Filled />
              ) : (
                <Poll24Regular />
              )}
            </div>
            <p className="sidebarMenu_text">Dashboard</p>
          </div>

          <div
            className={
              activeItem === "process"
                ? "sidebarMenu_itemCss"
                : "sidebarMenu_item"
            }
            onClick={() => changeCSS("process")}
          >
            <div className="sidebarMenu_icon">
              {activeItem === "process" ? (
                <ApprovalsApp24Filled />
              ) : (
                <ApprovalsApp24Regular />
              )}
            </div>
            <p className="sidebarMenu_text">Quy trình</p>
          </div>

          <div
            className={
              activeItem === "bgct" ? "sidebarMenu_itemCss" : "sidebarMenu_item"
            }
            onClick={() => changeCSS("bgct")}
          >
            <div className="sidebarMenu_icon">
              {activeItem === "bgct" ? (
                <DocumentFolder24Filled />
              ) : (
                <DocumentFolder24Regular />
              )}
            </div>
            <p className="sidebarMenu_text">BGCT</p>
          </div>

          <div className="sidebarMenu_item">
            <div className="sidebarMenu_icon">
              <MoreHorizontal24Filled />
            </div>
          </div>
        </div>
        <div className="sidebarMenu_btn">
          <div className="sidebarMenu_item">
            <div className="sidebarMenu_icon">
              <QuestionCircle24Regular />
            </div>
          </div>
          <div className="sidebarMenu_item">
            <div className="sidebarMenu_icon">
              <Settings24Regular />
            </div>
          </div>
        </div>
      </div>

      <div className="sidebarTreeMenu">
        <div className="sidebarTreeMenu_header">
          <h2>BGCT</h2>
          <div className="sidebarTreeMenu_header_btn">
            <button>
              <Filter16Regular />
            </button>
            <button>
              <Add16Regular />
            </button>
          </div>
        </div>
        <div className="sidebarTreeMenu_content">
          {/* div_content */}
          <Tree
            // style={{ position: "relative" }}
            aria-label="Custom title"
            items={items}
            renderItemTitle={titleRenderer}
          />
          {/* {TreeExampleWithBadges()} */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
