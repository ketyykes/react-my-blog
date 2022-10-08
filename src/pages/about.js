import React from "react";
import Layout from "../components/layout/Layout";
import * as styles from "../styles/pages-styles/about.module.scss";
import AvatarImg from "../images/avatar-about.jpg";

const About = () => {
  const { wrapAbout, avatarAbout } = styles;
  return (
    <>
      <Layout>
        <div className={wrapAbout}>
          <div className={avatarAbout}>
            <img src={AvatarImg} alt="avatar" />
          </div>
          <h2>關於我</h2>
          <p>
            在日語當中，水曜日和土曜日分別代表星期三和星期六的意思，另外也分別代表水星和土星之意，在占星學當中水星象徵個人的心智活動及邏輯思維，土星則有隱含著
            困難、壓力、磨練等等的意思，而這個技術部落格呼應的就是邏輯思考，筆記這些過程也間接表示遇到程式上面的BUG。
          </p>
        </div>
      </Layout>
    </>
  );
};

export default About;
