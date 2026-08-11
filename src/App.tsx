import { useEffect, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Background3D from "./components/Background3D";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Background3D />
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
<Timeline />
<Footer />
    </>
  );
}
