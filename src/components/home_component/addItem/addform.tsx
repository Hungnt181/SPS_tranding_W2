import { useState } from "react";
import "@css/website/addItem/addform.css";
import {
  Dropdown,
  Form,
  FormButton,
  FormDropdown,
  FormInput,
  RadioGroup,
} from "@fluentui/react-northstar";
import axios from "axios";
import { useHistory } from "react-router-dom";
const AddForm = () => {
  // Khởi tạo state để lưu giá trị các trường trong form
  const [formData, setFormData] = useState({
    Title: "",
    Status: "Đang thực hiện", // Giá trị mặc định
    StatusCode: 100, // Mã trạng thái mặc định là 100,
    Priority: 1, // Mã code độ ưu tiên,
    DepartmentOrganization: {
      // Phòng ban
      LookupId: 256,
      LookupValue: "KA-QTHT",
    },
    Author: {
      // Tác giả
      Email: "",
      LookupId: 301,
      LookupValue: "User One",
    },
  });

  //  cập nhật giá trị khi người dùng nhập vào các input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name === "Email") {
        // Xử lý riêng cho email trong Author
        return {
          ...prevData,
          Author: {
            ...prevData.Author,
            Email: value,
          },
        };
      }
      // Xử lý cho các trường khác
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // Radio Status
  const handleChangeRadioStatus = (event: any, data: any) => {
    // console.log(data);
    setFormData((prevData) => ({
      ...prevData,
      Status: data.name,
      StatusCode: data.value,
    }));
  };

  // Radio Proprity
  const handleChangeRadioProprity = (event: any, data: any) => {
    // console.log(data);
    setFormData((prevData) => ({
      ...prevData,
      Priority: data.value,
    }));
  };

  const handleDropdownChange = (event: React.SyntheticEvent, data: any) => {
    // console.log(data);
    setFormData((prevData) => ({
      ...prevData,
      DepartmentOrganization: {
        LookupId: data.value.key,
        LookupValue: data.value.content,
      },
    }));
  };

  const handleDropdownChangeAuthor = (
    event: React.SyntheticEvent,
    data: any
  ) => {
    // console.log(data);
    setFormData((prevData) => ({
      ...prevData,
      Author: {
        Email: "",
        LookupId: data.value.key,
        LookupValue: data.value.content,
      },
    }));
  };

  //

  const addItem = async (formData: any) => {
    const response = await axios.post(`http://localhost:3000/data`, formData);
  };
  //  xử lý submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Ngừng hành động mặc định của form
    const updatedFormData = {
      ...formData,
      Created: new Date().toISOString(),
    };
    console.log("Form data:", updatedFormData); // Log giá trị của form
    addItem(updatedFormData);
    alert("Form Submitted");
  };

  // status array
  const statusItem = [
    {
      name: "Đang thực hiện ",
      value: 100,
      label: "Đang thực hiện ",
    },
    {
      name: "Hoàn thành",
      value: 200,
      label: "Hoàn thành ",
    },
  ];

  // Priority array
  const priorityItem = [
    {
      name: "Thấp ",
      value: 1,
      label: "Thấp ",
    },
    {
      name: "Thường ",
      value: 10,
      label: "Thường ",
    },
    {
      name: "Gấp ",
      value: 20,
      label: "Gấp ",
    },
    {
      name: "Khẩn cấp",
      value: 30,
      label: "Khẩn cấp ",
    },
  ];

  // Department array
  const departmentItem = [
    {
      key: 256,
      content: "KA-QTHT",
      label: "KA-QTHT ",
    },
    {
      key: 257,
      content: "BA-QTHT",
      label: "BA-QTHT ",
    },
    {
      key: 258,
      content: "CA-QTHT",
      label: "CA-QTHT ",
    },
    {
      key: 259,
      content: "MA-QTHT",
      label: "MA-QTHT ",
    },
    {
      key: 260,
      content: "QA-QTHT",
      label: "QA-QTHT ",
    },
  ];

  // Department array
  const AuthorItem = [
    {
      key: 301,
      content: "User One",
      label: "User One ",
    },
    {
      key: 302,
      content: "User 2 ",
      label: "User 2",
    },
    {
      key: 303,
      content: "User 3",
      label: "User 3 ",
    },
    {
      key: 304,
      content: "User 4",
      label: "User 4 ",
    },
    {
      key: 305,
      content: "User 5",
      label: "User 5 ",
    },
  ];

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
          onChange={handleChange}
        />
        {/* Radio status */}
        <label htmlFor="">Trạng thái</label>
        <RadioGroup
          defaultCheckedValue={formData.StatusCode}
          items={statusItem}
          onCheckedValueChange={handleChangeRadioStatus}
          vertical
        />
        {/* Radio Prioryti */}
        <label htmlFor="">Mức độ khẩn cấp</label>
        <RadioGroup
          defaultCheckedValue={formData.Priority}
          items={priorityItem}
          onCheckedValueChange={handleChangeRadioProprity}
          vertical
        />
        {/* Dropdown Phòng ban đề xuất */}
        <FormDropdown
          className="dropdown"
          items={departmentItem}
          placeholder="Phòng ban đề xuất"
          checkable
          label={{ content: "Phòng ban đề xuất", id: "DepartmentOrganization" }}
          aria-labelledby="DepartmentOrganization"
          name="DepartmentOrganization"
          value={formData.DepartmentOrganization.LookupValue}
          onChange={handleDropdownChange}
        />
        {/* Dropdown Tác giả */}
        <FormDropdown
          className="dropdown"
          items={AuthorItem}
          placeholder="Tác giả"
          checkable
          label={{ content: "Tác giả", id: "Author" }}
          aria-labelledby="Author"
          name="Author"
          value={formData.Author.LookupValue}
          onChange={handleDropdownChangeAuthor}
        />
        {/* Input Email */}
        <FormInput
          type="email"
          label="Email tác giả"
          id="email"
          required
          showSuccessIndicator={false}
          name="Email" // Đặt name để dùng trong handleChange
          value={formData.Author.Email} // Giá trị của input
          onChange={handleChange}
        />
        {/* Nút Tạo Đề Xuất */}
        <FormButton content="Tạo đề xuất" />
      </Form>
    </div>
  );
};

export default AddForm;
