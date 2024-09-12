function ContactInfoField({
  contacts,
  label,
}: {
  contacts: string[];
  label: string;
}) {
  return (
    <div className="info-field">
      <span>{label}</span>
      <div
        className="secondary-text-color"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "8px",
        }}
      >
        {contacts.map((contact, index) => (
          <span key={index}>{contact}</span>
        ))}
      </div>
    </div>
  );
}

export default ContactInfoField;
