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
import "@css/website/home/home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Checkbox,
  CloseIcon,
  Input,
  Menu,
  SearchIcon,
  Table,
} from "@fluentui/react-northstar";
import AddForm from "@components/home_component/addItem/addform";

import ToolBar from "@components/home_component/toolBar/toolBar";
import SubToolBar from "@components/home_component/subToolBar/SubToolBar";
import Pagination from "@components/home_component/pagination/Pagination";
import TableComponent from "@components/home_component/table/Table";
const HomePage = () => {
  const [data, setData] = useState<DataItem[]>([]); // Dữ liệu từ API
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [itemsPerPage] = useState(4); // Số bản ghi mỗi trang

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/data`);
        setData(data);
        localStorage.setItem("data", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // // Tính toán dữ liệu hiển thị trên từng trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // // Tổng số trang
  const totalPages = Math.ceil(data.length / itemsPerPage);

  //form Taọ đề xuất
  const [isBlock, setIsBlock] = useState(false);

  const setIsBlockFunciton = () => {
    setIsBlock(true);
  };
  return (
    <>
      <div className="toolBar">
        <ToolBar setIsBlockFunciton={setIsBlockFunciton} />
      </div>

      <div className="contentOutlet_content">
        <div className="subToolBar">
          <SubToolBar />
        </div>

        {/* content */}
        <div className="contentTable">
          <TableComponent currentItems={currentItems} data={data} />
        </div>

        {/* Pagination */}
        <Pagination
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <div
        className="addData_modal"
        style={{ display: isBlock ? "block" : "none" }}
      >
        <div className="modal_overlay">
          <div className="modal_content">
            <Button
              icon={<CloseIcon />}
              style={{ display: isBlock ? "block" : "none" }}
              onClick={() => setIsBlock(false)}
              styles={{ zIndex: "100" }}
            />
            {AddForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
