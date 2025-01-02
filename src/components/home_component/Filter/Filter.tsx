import "@css/website/filter/filter.css";
import {
  AcceptIcon,
  Accordion,
  ArrowDownIcon,
  ArrowRightIcon,
  Avatar,
  BellSnoozeIcon,
  Button,
  CallRecordingIcon,
  Datepicker,
  FormInput,
  RedbangIcon,
} from "@fluentui/react-northstar";
import { useEffect, useState } from "react";
const Filter = ({ data, onFilterChange }: any) => {
  // status array
  // console.log(data);
  const Status = ["Đang thực hiện", "Hoàn thành"];
  const statusMapping: Record<string, number> = {
    "Đang thực hiện": 100,
    "Hoàn thành": 200,
  };
  // Priority array
  const Priority = ["Thấp", "Thường", "Gấp", "Khẩn cấp"];
  const priorityMapping: Record<string, number> = {
    Thấp: 1,
    Thường: 10,
    Gấp: 20,
    "Khẩn cấp": 30,
  };
  // Department array
  const Department = [
    "KA-QTHT",
    "BA-QTHT",
    "CA-QTHT",
    "MA-QTHT",
    "QA-QTHT",
    "HA-QTHT",
    "NA-QTHT",
    "SA-QTHT",
    "LA-QTHT",
    "FA-QTHT",
  ];
  // Author array
  const Author = [
    "Nguyễn Văn A",
    "Trần Thị B",
    "Lê Hồng C",
    "Phạm Thị D",
    "Nguyễn Thiệu E",
    "Trần Thị F",
    "Nguyễn Hòa G",
    "Phạm Long H",
    "Trần Tân K",
    "Nguyễn Minh L",
  ];

  const [filterCriteria, setFilterCriteria] = useState({
    Status: [] as number[],
    Priority: [] as number[],
    Department: [] as string[],
    Author: [] as string[],
    Time: [] as Date[],
  });

  useEffect(() => {
    // Áp dụng logic lọc
    let newFilteredData = data;

    // Lọc theo Status
    if (filterCriteria.Status.length > 0) {
      const statusValues = filterCriteria.Status.map(
        (status) => statusMapping[status]
      );
      newFilteredData = newFilteredData.filter((item: any) =>
        statusValues.includes(item.StatusCode)
      );
    }

    // Lọc theo Priority
    if (filterCriteria.Priority.length > 0) {
      const priorityValues = filterCriteria.Priority.map(
        (priority) => priorityMapping[priority]
      );
      newFilteredData = newFilteredData.filter((item: any) =>
        priorityValues.includes(item.Priority)
      );
    }

    // Lọc theo Department
    if (filterCriteria.Department.length > 0) {
      newFilteredData = newFilteredData.filter((item: any) =>
        filterCriteria.Department.includes(
          item.DepartmentOrganization.LookupValue
        )
      );
    }

    // Lọc theo Author
    if (filterCriteria.Author.length > 0) {
      newFilteredData = newFilteredData.filter((item: any) =>
        filterCriteria.Author.includes(item.Author.LookupValue)
      );
    }

    // Lọc theo Time
    if (filterCriteria.Time.length === 2) {
      const [startDate, endDate] = filterCriteria.Time;
      if (startDate && endDate) {
        newFilteredData = newFilteredData.filter((item: any) => {
          const itemDate = new Date(item.Created); // Thay 'Time' bằng key chứa ngày trong dữ liệu
          return itemDate >= startDate && itemDate <= endDate;
        });
      }
    }

    // Cập nhật danh sách dữ liệu đã lọc
    onFilterChange(newFilteredData);
  }, [filterCriteria, data]);

  // Reset Filter
  const resetFilter = () => {
    const initialFilterCriteria = {
      Status: [],
      Priority: [],
      Department: [],
      Author: [],
      Time: [],
    };

    setstatusState(Status.map(() => false));
    setdepartmentState(Department.map(() => false));
    setPriorityState(Priority.map(() => false));
    setAuthorState(Author.map(() => false));

    setFilterCriteria(initialFilterCriteria);
    onFilterChange(data); // Đặt lại dữ liệu về trạng thái ban đầu
  };
  // Date
  const handleDateChange = (key: string, date: any) => {
    if (date && date.value) {
      const selectedDate = new Date(date.value);
      setFilterCriteria((prev) => {
        const updatedTime = [...prev.Time];
        if (key === "start") updatedTime[0] = selectedDate;
        if (key === "end") updatedTime[1] = selectedDate;
        return { ...prev, Time: updatedTime };
      });
    }
  };

  ////////

  const [statusState, setstatusState] = useState(Status.map(() => false));
  const [departmentState, setdepartmentState] = useState(
    Department.map(() => false)
  );
  const [priorityState, setPriorityState] = useState(Priority.map(() => false));
  const [authorState, setAuthorState] = useState(Author.map(() => false));

  const handleToggle = (index: number, value: string, key: string) => {
    if (key === "Status") {
      setstatusState((prevStates) =>
        prevStates.map((state, i) => (i === index ? !state : state))
      );
    } else if (key === "Department") {
      setdepartmentState((prevStates) =>
        prevStates.map((state, i) => (i === index ? !state : state))
      );
    } else if (key === "Priority") {
      setPriorityState((prevStates) =>
        prevStates.map((state, i) => (i === index ? !state : state))
      );
    } else if (key === "Author") {
      setAuthorState((prevStates) =>
        prevStates.map((state, i) => (i === index ? !state : state))
      );
    }

    setFilterCriteria((prev: any) => {
      const currentValues = prev[key] || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v: any) => v !== value)
        : [...currentValues, value];

      return { ...prev, [key]: updatedValues };
    });
  };

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
    "bg0",
  ];

  const setCss = (item: number) => {
    const lastNumber = item % 10;
    return avatarClassName[lastNumber];
  };

  // console.log(filterCriteria);

  const getClassName = (item: string, className: string) => {
    if (className === "status--div") {
      if (item === "Đang thực hiện") {
        return "status--toDo";
      } else if (item === "Hoàn thành") {
        return "status--done";
      }
    }
    if (className === "priority--div") {
      if (item === "Thấp") {
        return "priority--1";
      } else if (item === "Thường") {
        return "priority--10";
      } else if (item === "Gấp") {
        return "priority--20";
      } else if (item === "Khẩn cấp") {
        return "priority--30";
      }
    }
  };
  const [filteredDepartment, setFilteredDepartment] =
    useState<string[]>(Department);
  const handleSearch = (key: string, query: any) => {
    const filteredItems = Department.filter((item: any) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDepartment(filteredItems);
  };
  const [filteredItemsAuthor, setFilteredAuthor] = useState<string[]>(Author);
  const handleSearchAuthor = (key: string, query: any) => {
    const filteredItemsAuthor = Author.filter((item: any) =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredAuthor(filteredItemsAuthor);
  };

  // console.log(filtered);

  const itemFilter = [
    {
      key: "Trạng thái",
      className: "status--div",
      arrayName: "Status",
      array: ["Đang thực hiện", "Hoàn thành"],
      stateName: "statusState",
    },
    {
      key: "Mức độ ưu tiên",
      className: "priority--div",
      arrayName: "Priority",
      array: ["Khẩn cấp", "Gấp", "Thường", "Thấp"],
      stateName: "priorityState",
      icon: [
        <BellSnoozeIcon />,
        <RedbangIcon />,
        <CallRecordingIcon />,
        <ArrowDownIcon />,
      ],
    },
    {
      key: "Phòng ban",
      className: "department--div",
      arrayName: "Department",
      array: filteredDepartment,
      LookupId: [256, 257, 258, 259, 260, 261, 262, 263, 264, 265],
      stateName: "departmentState",
    },
    {
      key: "Tác giả",
      className: "author--div",
      arrayName: "Author",
      array: filteredItemsAuthor,
      LookupId: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
      stateName: "authorState",
    },
  ];

  const itemFilter1 = itemFilter.map((itemFilter: any) => ({
    key: itemFilter.key,
    title: itemFilter.key,
    content: (
      <div className="filterItem">
        {itemFilter.arrayName === "Department" && (
          <FormInput
            placeholder="Tìm phòng ban"
            showSuccessIndicator={false}
            onChange={(_: any, { value }: any) =>
              handleSearch("department", value)
            }
          />
        )}
        {itemFilter.arrayName === "Author" && (
          <FormInput
            placeholder="Tìm tác giả"
            showSuccessIndicator={false}
            onChange={(_: any, { value }: any) =>
              handleSearchAuthor("author", value)
            }
          />
        )}
        {itemFilter.array.slice(0, 5).map((item: string, index: number) => (
          <div
            className={itemFilter.className}
            key={index}
            onClick={() => handleToggle(index, item, itemFilter.arrayName)}
          >
            <div className={getClassName(item, itemFilter.className)}>
              <div
                id={getClassName(item, itemFilter.className)}
                style={{
                  display:
                    itemFilter.arrayName === "Priority" ? "block" : "none",
                }}
              >
                {item === "Khẩn cấp" && itemFilter.icon[0]}
                {item === "Gấp" && itemFilter.icon[1]}
                {item === "Thường" && itemFilter.icon[2]}
                {item === "Thấp" && itemFilter.icon[3]}
              </div>

              {itemFilter.arrayName === "Department" && (
                <Avatar
                  className={setCss(itemFilter.LookupId[index])}
                  name={item}
                  square
                />
              )}
              {itemFilter.arrayName === "Author" && (
                <Avatar
                  className={setCss(itemFilter.LookupId[index])}
                  name={item}
                />
              )}

              <span className="padding-left--12px">{item}</span>
            </div>
            <div>
              {itemFilter.arrayName === "Status" && statusState[index] && (
                <AcceptIcon />
              )}
              {itemFilter.arrayName === "Department" &&
                departmentState[index] && <AcceptIcon />}
              {itemFilter.arrayName === "Priority" && priorityState[index] && (
                <AcceptIcon />
              )}
              {itemFilter.arrayName === "Author" && authorState[index] && (
                <AcceptIcon />
              )}
            </div>
          </div>
        ))}
      </div>
    ),
  }));

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Định dạng ngày
  const formatMonthDayYear = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <div className="filter">
        <div className="filter--header">
          <h2>Bộ lọc</h2>
          <Button
            content="Làm mới"
            loader="Override bandwidth"
            size="small"
            text
            onClick={resetFilter}
          />
        </div>
        <div className="filter-item">
          <Accordion panels={itemFilter1} defaultActiveIndex={[0, 1]} />
        </div>
        <div className="filter--Time">
          <h5>Ngày tạo</h5>
          <div className="filter--Date">
            <Datepicker
              allowManualInput={false}
              today={new Date()}
              inputOnly={true}
              formatMonthDayYear={formatMonthDayYear} // Định dạng ngày/tháng/năm
              onDateChange={(_, { value }: any) =>
                handleDateChange("start", { value })
              }
            />

            <ArrowRightIcon />

            <Datepicker
              allowManualInput={false}
              today={new Date()}
              inputOnly={true}
              formatMonthDayYear={formatMonthDayYear} // Định dạng ngày/tháng/năm
              onDateChange={(_, { value }: any) =>
                handleDateChange("end", { value })
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
