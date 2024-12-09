import React, { useState } from "react";
import "./addform.css";
import {
  Form,
  FormButton,
  FormDropdown,
  FormInput,
} from "@fluentui/react-northstar";

const AddForm = () => {
  // Khởi tạo state để lưu giá trị các trường trong form
  const [formData, setFormData] = useState({
    Title: "",
    Status: "Đang thực hiện", // Giá trị mặc định
    StatusCode: "100", // Mã trạng thái mặc định là 100
  });

  // Hàm cập nhật giá trị khi người dùng nhập vào các input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm cập nhật giá trị khi người dùng chọn trạng thái trong Dropdown
  const handleDropdownChange = (
    event: React.SyntheticEvent,
    data: { value: string }
  ) => {
    const newStatus = data.value;

    // Cập nhật Status và StatusCode dựa trên giá trị của Status
    let newStatusCode = "100"; // Mặc định StatusCode là 100
    if (newStatus === "Hoàn thành") {
      newStatusCode = "200"; // Nếu chọn "Hoàn thành" thì StatusCode = 200
    }

    setFormData((prevData) => ({
      ...prevData,
      Status: newStatus,
      StatusCode: newStatusCode, // Cập nhật StatusCode tương ứng
    }));
  };

  // Hàm xử lý submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Ngừng hành động mặc định của form
    console.log("Form data:", formData); // Log giá trị của form
    alert("Form Submitted");
  };

  return (
    <div className="addform_content">
      <h2>Tạo đề xuất</h2>
      <Form onSubmit={handleSubmit}>
        {/* Input Tiêu Đề */}
        <FormInput
          label="Tiêu đề"
          id="title"
          required
          showSuccessIndicator={false}
          name="Title" // Đặt name để dùng trong handleChange
          value={formData.Title} // Giá trị của input
          onChange={handleChange} // Khi người dùng nhập vào, sẽ gọi handleChange
        />

        {/* Dropdown Trạng Thái */}
        <FormDropdown
          label={{ content: "Trạng thái", id: "Status" }}
          items={["Đang thực hiện", "Hoàn thành"]}
          aria-labelledby="Status"
          search={true}
          placeholder="Chọn trạng thái"
          name="Status" // Đặt name để dùng trong handleDropdownChange
          value={formData.Status} // Giá trị của dropdown
          onChange={handleDropdownChange} // Khi người dùng chọn, sẽ gọi handleDropdownChange
        />

        {/* Nút Tạo Đề Xuất */}
        <FormButton content="Tạo đề xuất" />
      </Form>
    </div>
  );
};

export default AddForm;
