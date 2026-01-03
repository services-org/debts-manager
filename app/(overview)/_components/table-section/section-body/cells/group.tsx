type TGroup = {
    _id: string;
    name: string;
    color: string;
};

type TGroupCell = {
    group: TGroup | string;
};

export const GroupCell = ({ group }: TGroupCell) => {
    // Handle both populated object and string fallback
    const name = typeof group === "object" ? group.name : group;
    const color = typeof group === "object" ? group.color : "#f59e0b";

    return (
        <span
            className="mx-auto block w-fit rounded-full px-3 py-1 text-center text-xs font-semibold capitalize shadow"
            style={{ backgroundColor: color, color: isLightColor(color) ? "#000" : "#fff" }}
        >
            {name}
        </span>
    );
};

// Helper to determine if a color is light (for text contrast)
const isLightColor = (hex: string) => {
    const c = hex.replace("#", "");
    const r = Number.parseInt(c.substring(0, 2), 16);
    const g = Number.parseInt(c.substring(2, 4), 16);
    const b = Number.parseInt(c.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
};

GroupCell.displayName = "GroupCell";
