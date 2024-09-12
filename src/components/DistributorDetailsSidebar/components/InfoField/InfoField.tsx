import { ReactNode } from "react";

function InfoField({ label, content }: { label: string; content: ReactNode }) {
  return (
    <div className="info-field">
      <span>{label}</span>
      <span className="secondary-text-color">{content}</span>
    </div>
  );
}

export default InfoField;
