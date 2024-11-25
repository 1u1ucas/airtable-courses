import { Status } from "../../utils/types/client";
import { useState } from "react";

const Chip = ({
  status,
  editable,
  onChangeStatus,
}: {
  status: Status;
  editable: boolean;
  onChangeStatus?: (newStatus: Status) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as Status;
    if (onChangeStatus) {
      onChangeStatus(newStatus);
    }
    setIsEditing(false);
  };


  const style: React.CSSProperties = (() => {
    switch (status) {
      case Status.CONTACTED:
        return { backgroundColor: "green", color: "white" };
      case Status.NOT_CONTACTED:
        return { backgroundColor: "red", color: "white" };
      case Status.CONTACT_IN_FUTURE:
        return { backgroundColor: "blue", color: "white" };
      default:
        return {};
    }
  })();

  return (
    <div
      style={{
        display: "inline-block",
        padding: "5px 10px",
        borderRadius: "5px",
        ...style,
        position: "relative",
      }}
    >
      {editable && isEditing ? (
        <select
          value={status}
          onChange={handleStatusChange}
          style={{
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: style.backgroundColor,
            color: style.color,
            border: "1px solid rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            outline: "none",
          }}
        >
          {Object.values(Status).map((statusOption) => (
            <option
              key={statusOption}
              value={statusOption}
              style={{
                backgroundColor: style.backgroundColor,
                color: style.color,
              }}
            >
              {statusOption}
            </option>
          ))}
        </select>
      ) : (
        <div
          onClick={() => editable && setIsEditing(true)}
          style={{ cursor: editable ? "pointer" : "default" }}
        >
          {status}
        </div>
      )}
    </div>
  );
};

export default Chip;
