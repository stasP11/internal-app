import { Button } from "@mui/material";
import { useState } from "react";

export default function ExpandableCell({ items }: { items: string }) {
  const [expanded, setExpanded] = useState(false);
  const itemsArray = items.split(", ");
  const visibleItems = expanded ? itemsArray : itemsArray.slice(0, 2);
  const moreItemsCount = itemsArray.length - 2;

  const toggleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <div
      style={{
        maxHeight: "72px",
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        padding: expanded ? "8px 10px" : "16px 10px",
        boxSizing: "border-box",
      }}
    >
      {visibleItems.map((item, index) => (
        <span
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: expanded ? "4px" : "0",
            lineHeight: "normal",
          }}
        >
          {item}
          {!expanded && moreItemsCount > 0 && index === 1 && (
            <Button
              style={{ textTransform: "none", padding: 0, marginLeft: 5 }}
              onClick={toggleExpand}
              color="primary"
              size="small"
              variant="text"
            >
              + {moreItemsCount} more
            </Button>
          )}
        </span>
      ))}
    </div>
  );
}
