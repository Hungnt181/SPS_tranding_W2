import {
  CheckmarkCircle16Regular,
  Delete16Regular,
} from "@fluentui/react-icons";
import {
  Button,
  FilterIcon,
  FormInput,
  Input,
  SearchIcon,
} from "@fluentui/react-northstar";
import { useEffect, useState } from "react";

interface SubToolBar {
  handleDelete: () => void;
  handleFilter: () => void;
  data: any;
  onFilterChange: any;
}
const SubToolBar: React.FC<SubToolBar> = ({
  handleDelete,
  handleFilter,
  data,
  onFilterChange,
}) => {
  const subToolBarItem_Left = [
    {
      title: "Xóa",
      icon: <Delete16Regular />,
      key: "Xóa",
    },
    {
      title: "Phê duyệt",
      icon: <CheckmarkCircle16Regular />,
      key: "Phê duyệt",
    },
  ];

  const subToolBarItem_Right = [
    {
      title: "Lọc",
      icon: <FilterIcon />,
      key: "Lọc",
    },
  ];

  // Filter Title
  const arrayTitle = data.map((item: any) => item.Title);
  const [filterTitle, setFilterTitle] = useState<string[]>(arrayTitle);
  const handlerSearchTitle = (title: string) => {
    const filterTitle = arrayTitle.filter((item: string) =>
      item.toLowerCase().includes(title.toLowerCase())
    );
    setFilterTitle(filterTitle);
  };

  const [newFilterData, setNewFilterData] = useState<string[]>(data);
  useEffect(() => {
    let newFilteredData = data;

    if (filterTitle.length > 0) {
      newFilteredData = newFilteredData.filter((item: any) =>
        filterTitle.includes(item.Title)
      );
    }
    setNewFilterData(newFilteredData);
    onFilterChange(newFilterData);
  }, [filterTitle, data]);

  // console.log("Filter Title:", filterTitle);
  // console.log("Filtered Data:", newFilterData);

  return (
    <>
      <div className="subToolBar_left">
        {subToolBarItem_Left.map((item) => (
          <div className="__right_Item">
            <div className="subToolBar--icon">{item.icon}</div>
            <div className="btn_delete">
              <Button
                content={item.title}
                loader="Xóa"
                text
                onClick={handleDelete}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="subToolBar_right">
        {subToolBarItem_Right.map((item) => (
          <div className="__right_Item" onClick={handleFilter}>
            <div className="subToolBar--icon">{item.icon}</div>
            <div className="btn_delete">
              <Button content={item.title} text />
            </div>
          </div>
        ))}
        <div className="__right_Item">
          <FormInput
            name="firstName"
            id="first-name"
            showSuccessIndicator={false}
            placeholder="Nhập nội dung tìm kiếm"
            onChange={(_, { value }: any) => handlerSearchTitle(value)}
          />
        </div>
      </div>
    </>
  );
};

export default SubToolBar;
