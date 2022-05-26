import { compareAsc, compareDesc } from "date-fns";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { queryBuilderRouter } from "../../../../../components/Authorization/utils/queryBuilder";
import { useQuery } from "../../../../../hooks/useQuery";
import { OrderWithProductType } from "../../../../../store/selectors";
import { Status } from "../../../../../types/common";

export const useFilters = () => {
  const filter = useQuery("filter");
  const search = useQuery("search");
  const sort = useQuery("sort");
  const navigate = useNavigate();
  const location = useLocation();

  const onChangeSearch = (value: string) => {
    navigate(
      queryBuilderRouter(location.pathname, {
        filter: filter ?? "all",
        sort: sort ?? "asc",
        search: value,
      })
    );
  };

  const onChangeSort = (sortValue: "asc" | "desc") => () => {
    navigate(
      queryBuilderRouter(location.pathname, {
        filter: filter ?? "all",
        sort: sortValue,
        search: search ?? "",
      })
    );
  };

  const onChangeFilter = (filterValue: Status | "all") => () => {
    navigate(
      queryBuilderRouter(location.pathname, {
        filter: filterValue,
        sort: sort ?? "asc",
        search: search ?? "",
      })
    );
  };

  return {
    filter: filter ?? "all",
    sort: sort ?? "asc",
    search: search ?? "",
    onChangeSearch,
    onChangeSort,
    onChangeFilter,
  };
};

export const useFilteredOrders = (orders: OrderWithProductType["orders"]) => {
  const filter = useQuery("filter");
  const search = useQuery("search");
  const sort = useQuery("sort");

  const filteredOrders = orders.filter((item) => {
    if (filter === "all" || search === null) {
      return true;
    } else {
      return filter === item.status;
    }
  });

  const searchingOrders = filteredOrders.filter((item) => {
    if (search === "" || search === null) {
      return true;
    }
    return item.products.some((product) =>
      product.name.toLowerCase().includes(search?.toLocaleLowerCase())
    );
  });

  const sortedOrders = searchingOrders.sort((prevItem, nextItem) => {
    if (sort === "asc") {
      return compareAsc(
        new Date(prevItem.timestamp),
        new Date(nextItem.timestamp)
      );
    } else if (sort === "desc") {
      return compareDesc(
        new Date(prevItem.timestamp),
        new Date(nextItem.timestamp)
      );
    }
    return 0;
  });

  return { orders: sortedOrders, filter, search, sort };
};
