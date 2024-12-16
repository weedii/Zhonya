import { footerData } from "../constants";
import Container from "./Container";
import Logo from "./common/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-200/40 dark:bg-bgDark border-t-2 border-white/10 py-16">
      <Container className="flex flex-col md:flex-row items-start justify-between gap-5 md:gap-0">
        <div className="-mt-4">
          <Logo />
        </div>
        {footerData.map((item, idx) => (
          <div key={idx}>
            <h3 className="text-yellow-500 text-lg font-semibold mb-3">
              {item.title}
            </h3>
            <div>
              {item.listItems.map((data, idxx) => (
                <p className="font-semibold" key={idxx}>
                  {data}
                </p>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </footer>
  );
};

export default Footer;
