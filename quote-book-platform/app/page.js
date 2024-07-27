import Link from "next/link";
import BookList from "./components/Booklist";
import Navbar from "./common/navbar";
import HeroSection from "./common/hero";
import FAQPage from "./common/faq";
import StepsPage from "./common/step";
import HelpPage from "./common/help";
import FAQ from "./common/faq";
import Help from "./common/help";
import WelcomePage from "./components/StartingPage";
export default function Home() {
  return (
    <div className=" ">
      <WelcomePage />
    </div>
  );
}
