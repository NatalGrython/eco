import React, { FC } from "react";
import classNames from "./index.module.scss";
import Choose from "../../../../components/Choose";
import { ProductProps } from "../../../../components/Product";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { catalogsSelector } from "../../../../store/selectors";

interface AdminCatalogChooseProps {}

const AdminCatalogChoose: FC<AdminCatalogChooseProps> = () => {
  const { catalogs } = useSelector(catalogsSelector);
  const navigator = useNavigate();

  const createItemProps = (catalogId: number): ProductProps => ({
    id: 100,
    create: true,
    onCreate() {
      navigator(`/create?catalogId=${catalogId}`);
    },
  });

  return (
    <div className={classNames["admin-catalog-choose"]}>
      {catalogs.map((item) => (
        <Choose
          catalogId={item.id}
          key={item.id}
          title={item.name}
          editable
          items={[
            createItemProps(item.id),
            ...item.products.map<ProductProps>((product) => ({
              imagePath: product?.imagePath,
              edit: true,
              onEdit: () => {
                navigator(`/create/${product.id}?catalogId=${item.id}`);
              },
              name: product.name,
              price: product.price,
              weight: product.weight,
              id: product.id,
              liked: product.liked,
            })),
          ]}
        />
      ))}
    </div>
  );
};

export default AdminCatalogChoose;
