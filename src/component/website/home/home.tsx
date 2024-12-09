/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Add16Filled,
  Calendar16Filled,
  CheckmarkCircle16Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular,
  Delete16Regular,
  DocumentFolder20Filled,
  Filter20Filled,
} from "@fluentui/react-icons";
import { DataItem } from "../../../interface/data";
import "./home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Menu,
  SearchIcon,
  Table,
} from "@fluentui/react-northstar";
import AddForm from "./addform";

const HomePage = () => {
  // Menu side

  const items = [
    {
      key: "Danh sách",
      content: "Danh sách",
      className: "Menu_list",
    },
    {
      key: "Lịch biểu",
      content: "Lịch biểu",
      className: "Menu_list",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = items.map((item, index) => ({
    ...item,
    className: index === activeIndex ? "menu-item-active" : "menu-item",
    onClick: () => setActiveIndex(index),
  }));
  const MenuExampleUnderlined = () => (
    <Menu defaultActiveIndex={0} items={menuItems} underlined primary />
  );
  //
  const [data, setData] = useState<DataItem[]>([]); // Dữ liệu từ API
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(4); // Số bản ghi mỗi trang

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://mocki.io/v1/0fb7f05c-742a-441b-bd30-fcd0d311cca6`
        );
        setData(data.data);
        localStorage.setItem("data", JSON.stringify(data));
        // console.log(data.data);
        // console.log(data.data.Author);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // const resultName = "";
  const avatarClassName = [
    "bg1",
    "bg2",
    "bg3",
    "bg4",
    "bg5",
    "bg6",
    "bg7",
    "bg8",
    "bg9",
    "bg",
  ];
  // Get Name create Avatar
  // const getName = (item: any) => {
  //   if (!item) return "";
  //   const words = item.trim().split(" ");
  //   const filstWord = words[0]?.[0]?.toUpperCase() || "";
  //   const lasttWord = words[words.length - 1]?.[0]?.toUpperCase() || "";
  //   return `${filstWord}${lasttWord}`;
  // };

  const setCss = (item: any) => {
    const lastNumber = item % 10;
    return avatarClassName[lastNumber];
  };

  // Xét giá trị độ ưu tiên
  const priorityValue = (item: any) => {
    if (item == 1) return "Thấp";
    if (item == 10) return "Thường";
    if (item == 20) return "Gấp";
    return "Khẩn cấp";
  };

  const priorityClassName = (item: any) => {
    if (item == 1) return "priorityOne";
    if (item == 10) return "priorityTen";
    if (item == 20) return "priorityTwenty";
    return "priorityThirty";
  };

  // // Tính toán dữ liệu hiển thị trên từng trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // // Tổng số trang
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Chuyển trang bằng nút
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // FormatTime
  const formatTime = (time: any) => {
    const date = new Date(time);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month} ${hours}:${minutes}`;
  };

  // checkbox
  const [allChecked, setAllChecked] = useState(false);
  const [checkedRows, setCheckedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleAllCheckboxes = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);

    const newCheckedRows = data.reduce((acc, _, index) => {
      acc[index] = newCheckedState;
      return acc;
    }, {} as { [key: string]: boolean });

    setCheckedRows(newCheckedRows);
  };

  const toggleRowCheckbox = (index: string) => {
    setCheckedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const header = {
    items: [
      {
        content: (
          <div className="columsOne_title">
            <Checkbox checked={allChecked} onChange={toggleAllCheckboxes} />{" "}
            <span>Tiêu đề</span>
          </div>
        ),
        styles: { minWidth: "500px", width: "500px" },
        key: "0",
      },
      "Trạng thái",
      "Phòng ban đề xuất",
      "Người tạo",
      "Email",
      "Ngày tạo",
    ],
  };
  const rows = currentItems.map((item, index) => ({
    key: index + 1,
    items: [
      {
        content: (
          <div className="columsOne" id="columsTitle">
            <div className="checkBox_title">
              <Checkbox
                checked={checkedRows[item.ID] || false}
                onChange={() => toggleRowCheckbox(item.ID)}
              />
              <span title={item.Title}>{item.Title}</span>
            </div>

            <div
              className={priorityClassName(item.Priority)}
              style={{ maxWidth: "100px" }}
            >
              {priorityValue(item.Priority)}
            </div>
          </div>
        ),
        key: `${item.ID}`,
      },
      {
        content: (
          <div className={item.StatusCode == 100 ? "toDo" : "completed"}>
            {item.StatusCode == 100 ? "Đang thực hiện" : "Hoàn thành"}
          </div>
        ),
        key: "Item.StatusCode",
      },
      {
        content: (
          <div className="columsOne">
            <div className="avatar">
              <Avatar
                className={setCss(item.DepartmentOrganization.LookupId)}
                name={item.DepartmentOrganization.LookupValue}
                square
              />
            </div>
            <span
              className="overFlow"
              title={item.DepartmentOrganization.LookupValue}
            >
              {item.DepartmentOrganization.LookupValue}
            </span>
          </div>
        ),
        key: "item.Title",
      },

      {
        content: (
          <div className="columsOne">
            <div className="avatar">
              <Avatar
                className={setCss(item.Author.LookupId)}
                name={item.Author.LookupValue}
              />
            </div>

            <span className="overFlow" title={item.Author.LookupValue}>
              {item.Author.LookupValue}
            </span>
          </div>
        ),
        key: "item.Title",
      },

      {
        content: (
          <div className="columsOne">
            <div className="overFlow" title={item.Author.Email}>
              {item.Author.Email}
            </div>
          </div>
        ),
        key: " item.Author.Email",
      },
      {
        content: (
          <div className="columsOne">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#585A96",
                marginRight: "8px",
              }}
            >
              <Calendar16Filled />
            </div>
            <span>{formatTime(item.Created)}</span>
          </div>
        ),
      },
    ],
  }));

  // form input
  const InputExampleIcon = () => (
    <Input
      icon={<SearchIcon />}
      className="input_sbuToolBar"
      placeholder="Nhập nội dung tìm kiếm"
    />
  );

  //form Taọ đề xuất
  const [isBlock, setIsBlock] = useState(false);

  return (
    <>
      <div className="toolBar">
        <div className="toolBar_left">
          <div className="toolBar_left_icon">
            <DocumentFolder20Filled />
          </div>
          <div className="toolBar_left_Title">Đề xuất</div>
          <div className="toolBar_left_Text">{MenuExampleUnderlined()}</div>
        </div>

        <Button
          icon={<Add16Filled />}
          content="Tạo đề xuất"
          primary
          onClick={() => setIsBlock(true)}
        />
      </div>

      <div className="contentOutlet_content">
        <div className="subToolBar">
          <div className="subToolBar_left">
            <div className="__right_Item">
              <span>
                <Delete16Regular />
              </span>
              <span className="btn_delete">
                <Button content="Xóa" loader="Xóa" text />
              </span>
            </div>
            <div className="__right_Item">
              <span>
                <CheckmarkCircle16Regular />
              </span>
              <span>
                <Button content="Phê duyệt" loader="Phê duyệt" text />
              </span>
            </div>
          </div>
          <div className="subToolBar_right">
            <div className="__right_Item">
              <span>
                <Filter20Filled />
              </span>
              <span style={{ color: "#424242", width: "24px" }}>
                <Button content="Lọc" loader="Lọc" text />
              </span>
            </div>
            <div className="__right_Item">{InputExampleIcon()}</div>
          </div>
        </div>

        {/* content */}
        <div className="contentTable">
          <div className="table">
            <Table header={header} rows={rows} aria-label="Static table" />
          </div>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <div className="indexOfPage">
            <span style={{ fontSize: "14px", display: "flex" }}>
              <p style={{ marginRight: "4px", color: "#424242" }}>Hiển thị</p>
              {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, data.length)}
              <p
                style={{
                  marginRight: "4px",
                  marginLeft: "4px",
                  color: "#424242",
                }}
              >
                /
              </p>
              Tổng {data.length} bản ghi
            </span>
          </div>
          <div className="paginationBtn">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              style={{
                background: "none",
                border: "none",
                marginRight: "10px",
                padding: "5px 10px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              <ChevronLeft20Regular />
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{
                background: "none",
                border: "none",
                marginLeft: "10px",
                padding: "5px 10px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              <ChevronRight20Regular />
            </button>
          </div>
        </div>
      </div>

      <div
        className="addData_modal"
        style={{ display: isBlock ? "block" : "none" }}
        // onClick={() => setIsBlock(false)}
      >
        <div className="modal_overlay">
          <div className="modal_content">{AddForm()}</div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
