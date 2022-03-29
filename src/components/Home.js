import React from 'react';
import Navbar from "./Navbar";
import Header from "./Header";
import Features from "./Features";
import Footer from "./Footer";
import Faq from "./Faq";
import Team from "./Team"

export default function Home() {
    return (
        <>
        <header className="header-bg">
          <Navbar/>
          <Header />
        </header>
        <Features data-aos="fade-up" />
        <Team />
        <Faq />
        <Footer />
        </>
    )
  }