/* eslint-disable @typescript-eslint/no-explicit-any */

import { DataItem } from "../../../interface/data";
import "@css/website/home/home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, CloseIcon } from "@fluentui/react-northstar";
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
        // Sắp xếp dữ liệu theo trường 'created', mới nhất lên đầu
        const sortedData = data.sort(
          (a: any, b: any) =>
            new Date(b.Created).getTime() - new Date(a.Created).getTime()
        );
        setData(sortedData); // Cập nhật dữ liệu đã sắp xếp
        localStorage.setItem("data", JSON.stringify(sortedData));
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

  // Form create || edit
  //   //form Taọ đề xuất
  const [isBlock, setIsBlock] = useState(false);

  // xác định hàm
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null); // Xác định hành động
  const [selectedItem, setSelectedItem] = useState<any | null>(null); // Bản ghi cần cập nhật
  const [id, setId] = useState<number | null>(null); // Bản ghi cần cập nhật

  const handleCreate = () => {
    setFormMode("create");
    setIsBlock(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/data/${id}`);
        setSelectedItem(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);
  const handleEdit = (id: number) => {
    console.log(id);
    setId(id);
    setIsBlock(true);
    setFormMode("edit");
  };

  // lấy danh sách ID

  const handleSelectionChange = (newSelectedIds: number[]) => {
    setSelectedIds(newSelectedIds);
    // console.log("Selected IDs:", newSelectedIds);
  };
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const deleteItems = async (selectedIDs: number[]) => {
    try {
      const deletePromises = selectedIDs.map((id) =>
        axios.delete(`http://localhost:3000/data/${id}`)
      );
      await Promise.all(deletePromises);
      alert("Deleted items successfully");
      window.location.reload();
    } catch (error) {
      console.error("Đã xảy ra lỗi khi xóa item:", error);
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this item?")) {
      // console.log("Deleting items with IDs:", selectedIds);
      const ids = data
        .filter((item, index) => selectedIds.includes(index))
        .map((item) => item.id); // Lấy id từ các phần tử
      // console.log(ids);
      deleteItems(ids);
    }
  };

  return (
    <>
      <div className="toolBar">
        <ToolBar setIsBlockFunciton={handleCreate} />
      </div>

      <div className="contentOutlet_content">
        <div className="subToolBar">
          <SubToolBar handleDelete={handleDelete} />
        </div>

        {/* content */}
        <div className="contentTable">
          <TableComponent
            currentItems={currentItems}
            data={data}
            UpdateData={handleEdit}
            handleSelectionChange={handleSelectionChange}
          />
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
            {<AddForm formMode={formMode} initialData={selectedItem} id={id} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
