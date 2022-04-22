import React from "react";
import Layout from "../components/Layout";
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
        </div>
      </Layout>
    </>
  );
};

export default About;
