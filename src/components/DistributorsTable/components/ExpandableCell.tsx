import { Button } from "@mui/material";
import { useState } from "react";

export default function ExpandableCell({ items }: { items: string }) {
  const [expanded, setExpanded] = useState(false);

  const itemsArray = items.split(", ");
  const visibleItems = expanded ? itemsArray : itemsArray.slice(0, 2);
  const moreItemsCount = itemsArray.length - 2;

  return (
    <div>
      {visibleItems.map((item, index) => (
        <p
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: 0,
          }}
        >
          {item}
          {!expanded && moreItemsCount > 0 && index === 1 && (
            <Button
              style={{ textTransform: "none", padding: 0, marginLeft: 5 }}
              onClick={() => setExpanded(true)}
              color="primary"
              size="small"
              variant="text"
            >
              + {moreItemsCount} more
            </Button>
          )}
        </p>
      ))}
    </div>
  );
}
