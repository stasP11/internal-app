import cancelIcon from "../../icons/cancel/Operations-X-Simple.svg";
import appriveIcon from "../../icons/approve/Circle-Verified-Filled.svg";
import infoIcon from "../../icons/info-icon/Circle-Info-Filled.svg";

function ValueWithIcon({ value, iconValue, altText, onSelect }: any) {
  return (
    <div className={`action-list-item`} onClick={() => onSelect(value)}>
      <div>{value}</div>
      <img src={iconValue} alt={altText} />
    </div>
  );
}

function ActionsList({ onView, onApprove, onReject }: any) {
  return (
    <div className="actions-list">
      <ValueWithIcon
        value="View"
        iconValue={infoIcon}
        altText="icon"
        onSelect={onView}
      />
      <ValueWithIcon
        value="Approve"
        iconValue={appriveIcon}
        altText="icon"
        onSelect={onApprove}
      />
      <ValueWithIcon
        value="Reject"
        iconValue={cancelIcon}
        altText="icon"
        onSelect={onReject}
        isDanger
      />
    </div>
  );
}

export default ActionsList;
