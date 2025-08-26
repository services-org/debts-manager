import { ComponentType } from "react";

type Item<TData> = TData & { _id: string };

type TListItems<TData> = {
    items?: Item<Omit<TData, "index">>[];
    Item: ComponentType<Item<TData>>;
    props?: Record<string, any>;
    emptyMessage?: string;
    isPending?: boolean;
};

export const ListItems = <TData,>({ Item, props, items = [] }: TListItems<TData>) => {
    if (!Array.isArray(items)) return;

    // @ts-expect-error TS2322
    return items?.map((item, index) => <Item key={item._id ?? index} index={index} {...item} {...props} />);
};

ListItems.displayName = "ListItems";
