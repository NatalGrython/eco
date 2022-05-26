import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "../../../hooks/useQuery";
import { queryBuilderRouter } from "../../../components/Authorization/utils/queryBuilder";
import { Product } from "../../../types/client/product";

const parseFilters = (filter: {
  catalogs: number[];
  calories: [string, string];
  fats: [string, string];
  proteins: [string, string];
  carbohydrates: [string, string];
  price: [string, string];
}) => {
  return {
    catalogs: filter.catalogs.join("&"),
    calories: filter.calories.join("&"),
    fats: filter.fats.join("&"),
    proteins: filter.proteins.join("&"),
    carbohydrates: filter.carbohydrates.join("&"),
    price: filter.price.join("&"),
  };
};

const useFilter = () => {
  const catalogs = useQuery("catalogs");
  const calories = useQuery("calories");
  const fats = useQuery("fats");
  const proteins = useQuery("proteins");
  const carbohydrates = useQuery("carbohydrates");
  const price = useQuery("price");

  return {
    catalogs: catalogs ? catalogs.split("&").map((item) => Number(item)) : [],
    calories: calories
      ? (calories.split("&") as [string, string])
      : (["", ""] as [string, string]),
    fats: fats
      ? (fats.split("&") as [string, string])
      : (["", ""] as [string, string]),
    proteins: proteins
      ? (proteins.split("&") as [string, string])
      : (["", ""] as [string, string]),
    carbohydrates: carbohydrates
      ? (carbohydrates.split("&") as [string, string])
      : (["", ""] as [string, string]),
    price: price
      ? (price.split("&") as [string, string])
      : (["", ""] as [string, string]),
  };
};

export const useFilters = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const filters = useFilter();
  const search = useQuery("search");
  const sort = useQuery("sort");

  const onChangeSearch = (value: string) => {
    navigation(
      queryBuilderRouter(location.pathname, {
        sort: sort ?? "popular",
        search: value,
        ...parseFilters(filters),
      })
    );
  };

  const onChangeSort = (value: "popular" | "price") => () => {
    navigation(
      queryBuilderRouter(location.pathname, {
        sort: value,
        search: search ?? "",
        ...parseFilters(filters),
      })
    );
  };

  const onChangeFilter = (filter: {
    catalogs: number[];
    calories: [string, string];
    fats: [string, string];
    proteins: [string, string];
    carbohydrates: [string, string];
    price: [string, string];
  }) => {
    navigation(
      queryBuilderRouter(location.pathname, {
        sort: sort ?? "popular",
        search: search ?? "",
        ...parseFilters(filter),
      })
    );
  };

  return {
    sort: sort ?? "popular",
    search: search ?? "",
    filter: filters,
    onChangeSearch,
    onChangeSort,
    onChangeFilter,
  };
};

const catalogFilter = (filter: number[], value: number) => {
  if (filter.length) {
    return filter.includes(value);
  }
  return true;
};

const rangeFilter = (filter: [string, string], value: number) => {
  const filterNumber = [parseFloat(filter[0]), parseFloat(filter[1])];

  if (filterNumber.every((item) => Number.isNaN(item))) {
    return true;
  }

  if (Number.isNaN(filterNumber[0]) && !Number.isNaN(filterNumber[1])) {
    return filterNumber[1] >= value;
  }

  if (!Number.isNaN(filterNumber[0]) && Number.isNaN(filterNumber[1])) {
    return filterNumber[0] <= value;
  }

  return filterNumber[0] <= value && filterNumber[1] >= value;
};

export const useFilteredProducts = (products: Product[]) => {
  const filters = useFilter();
  const search = useQuery("search");
  const sort = useQuery("sort");

  const filteredItems = products.filter((product) => {
    const filterComplete: boolean[] = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (key === "catalogs") {
        //@ts-ignore
        filterComplete.push(catalogFilter(value, product.catalog.id));
      } else {
        //@ts-ignore
        filterComplete.push(rangeFilter(value, product[key]));
      }
    });
    return filterComplete.every((item) => item);
  });

  const searchItems = filteredItems.filter((item) => {
    if (search) {
      return item.name.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  const sortedItems = searchItems.sort((leftItem, rightItem) => {
    if (sort === "price") {
      return leftItem.price - rightItem.price;
    }

    return 0;
  });

  return { products: sortedItems };
};
