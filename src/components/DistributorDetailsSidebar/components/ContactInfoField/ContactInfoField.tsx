import { useState } from "react";
import "./ContactInfoField.scss";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface ContactInfoFieldProps {
  contacts: string[];
  label: string;
}

function ContactInfoField({ contacts, label }: ContactInfoFieldProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  return (
    <div className="info-field">
      <span>{label}</span>
      <div className="secondary-text-color container">
        {contacts.map((contact, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => copyToClipboard(contact)}
            className="contacts-container"
          >
            <span>{contact}</span>
            {hoverIndex === index && (
              <ContentCopyIcon
                style={{ marginLeft: "auto", fontSize: "1rem" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactInfoField;
