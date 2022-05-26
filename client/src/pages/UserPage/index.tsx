import React, { FC, useEffect, useState } from "react";
import classNames from "./index.module.scss";
import img from "@images/main.png";
import Dropzone from "../../components/UI/Dropzone";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { updateUserAction } from "../../store/user/action";
import jwtDecode from "jwt-decode";
import { Token } from "../../types/client/auth";

interface UserPageProps {}

const userSelector = (state: RootState) => state.user.user;
const tokenSelector = (state: RootState) =>
  state.auth.token ? jwtDecode<Token>(state.auth.token) : null;

const UserPage: FC<UserPageProps> = () => {
  const location = useLocation();
  const splited = location.pathname.split("/");
  const currentPath = splited[splited.length - 1];
  const { userId } = useParams();
  const user = useSelector(userSelector);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  const [userAvatar, setAvatar] = useState(user?.imagePath ?? img);

  useEffect(() => {
    if (user) {
      setAvatar(user?.imagePath ?? img);
    }
  }, [user]);

  if (!user && !token) {
    return null;
  }

  const onChangePath = (path: string) => () =>
    navigation(`/user/${userId}/${path}`);

  return (
    <div className={classNames["user__page"]}>
      <div className="container">
        <div className={classNames["user__page__wrapper"]}>
          <div className={classNames["user__page__layout"]}>
            <Dropzone
              widthPreview="560px"
              heightPreview="530px"
              file={userAvatar}
              onDrop={(files) => {
                if (user) {
                  dispatch(updateUserAction({ avatar: files[0], id: user.id }));
                  setAvatar(URL.createObjectURL(files[0]));
                }
              }}
            />
            <div className={classNames["user__page__links"]}>
              <button
                onClick={onChangePath("account")}
                className={
                  currentPath !== "account"
                    ? classNames["user__page__link"]
                    : `${classNames["user__page__link"]} ${classNames["user__page__link_active"]}`
                }
              >
                <span>Аккаунт</span>
              </button>
              <button
                onClick={onChangePath("orders")}
                className={
                  currentPath !== "orders"
                    ? classNames["user__page__link"]
                    : `${classNames["user__page__link"]} ${classNames["user__page__link_active"]}`
                }
              >
                <span>История заказов</span>
              </button>
              {token?.authType === "default" && (
                <button
                  onClick={onChangePath("auth")}
                  className={
                    currentPath !== "auth"
                      ? classNames["user__page__link"]
                      : `${classNames["user__page__link"]} ${classNames["user__page__link_active"]}`
                  }
                >
                  <span>Авторизационные данные</span>
                </button>
              )}
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
