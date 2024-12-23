import {
  CheckmarkCircle16Regular,
  Delete16Regular,
} from "@fluentui/react-icons";
import {
  Button,
  FilterIcon,
  Input,
  SearchIcon,
} from "@fluentui/react-northstar";

interface SubToolBar {
  handleDelete: () => void;
}
const SubToolBar: React.FC<SubToolBar> = ({ handleDelete }) => {
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

  // form input
  const InputExampleIcon = () => (
    <Input
      icon={<SearchIcon />}
      className="input_sbuToolBar"
      placeholder="Nhập nội dung tìm kiếm"
    />
  );
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
          <div className="__right_Item">
            <div className="subToolBar--icon">{item.icon}</div>
            <div className="btn_delete">
              <Button content={item.title} loader="Xóa" text />
            </div>
          </div>
        ))}
        <div className="__right_Item">{InputExampleIcon()}</div>
      </div>
    </>
  );
};

export default SubToolBar;
