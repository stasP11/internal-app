import { DistributorActiveStatus } from "components/DistributorsTable/types";

function StatusField({ status }: { status: DistributorActiveStatus }) {
  const isActive = status === 1;
  const circleStyle = {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    marginTop: "-2px",
    background: isActive ? "#94D244" : "#E05781",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <div style={circleStyle}></div>
      <span style={{ lineHeight: "24px" }}>
        {isActive ? "Active" : "On-hold"}
      </span>
    </div>
  );
}

export default StatusField;
