import { ComponentType } from "react";

type Item<TData> = TData & { _id: string };

type TListItems<TData> = {
    items?: Item<Omit<TData, "index">>[];
    Item: ComponentType<Item<TData>>;
    props?: Record<string, any>;
    emptyMessage?: string;
    isPending?: boolean;
    key?: keyof TData;
};

export const ListItems = <TData,>({ key, Item, props, items = [] }: TListItems<TData>) => {
    if (!Array.isArray(items)) return;

    // @ts-ignore
    return items?.map((item, index) => <Item key={item._id ?? item?.[key] ?? index} index={index} {...item} {...props} />);
};

ListItems.displayName = "ListItems";
