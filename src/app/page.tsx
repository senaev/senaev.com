import Image from "next/image";
import { Inter } from "@next/font/google";
import pageStyles from "./page.module.css";
import Head from "next/head";
import { Layout } from "components/layout";
import { siteTitle } from "const/const";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout home>
      <section className={pageStyles.headingMd}>
        <p>Ambitious, enthusiastic, a fan of my job.</p>
        <p>
          I am driven by the desire for constant professional and personal
          growth.
        </p>
        <p>My goal is to make a significant contribution to the IT industry.</p>
        <p>
          Specialist at the intersection of multimedia and advertising
          technologies.
        </p>
      </section>
    </Layout>
  );
}
