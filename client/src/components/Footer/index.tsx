import React, { FC } from "react";
import { Cards, FaceBook, Instagram, Pinterest, TikTok } from "../../icons";
import classNames from "./index.module.scss";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <div className={classNames.footer}>
      <div className="container">
        <div className={classNames["footer__wrapper"]}>
          <div className={classNames["footer__callback"]}>
            <h3 className={classNames["footer__callback_title"]}>
              Свяжитесь с нами
            </h3>
            <form className={classNames["footer__callback_form"]}>
              <input
                className={classNames["footer__callback_input"]}
                type="text"
                id="callback"
                placeholder="Введите свой адрес электронной почты"
              />
              <button
                className={classNames["footer__callback_btn"]}
                type="submit"
              >
                <span className={classNames["footer__callback_btn_text"]}>
                  Подписаться
                </span>
              </button>
            </form>
            <div className={classNames["footer__container"]}>
              <span className={classNames["footer__callback_text"]}>
                Нажав Подписаться, вы соглашаетесь получать маркетинговые письма
                от GOOD SHOP
              </span>
            </div>
          </div>
          <div className={classNames["footer__description"]}>
            <div>
              {/* <TikTok /> */}
              {/* <FaceBook /> */}
              {/* <Instagram /> */}
              {/* <Pinterest /> */}
            </div>
            <div>{/* <Cards /> */}</div>
            <span className={classNames["footer__copyright"]}>
              © 2022 GOOD SHOP – All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
