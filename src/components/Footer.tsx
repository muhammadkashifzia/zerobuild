import Link from "next/link";
function Footer() {
  return (
    <footer className="bg-[#192341] text-gray-400 pt-12">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-6">
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
          <p className="mb-4">
            ZeroBuild accelerates the decarbonisation of the built environment
            by empowering architects, engineers, developers, local authorities,
            and housing associations to achieve Net Zero faster.
          </p>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li>
              <Link
                href="/"
                className="hover:text-white transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="hover:text-white transition-colors duration-300"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-white transition-colors duration-300"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white transition-colors duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* <div>
          <h2 className="text-white text-lg font-semibold mb-4">Services</h2>
          <div className=" flex flex-col">
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
            Acoustic consulting
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              Advisory services
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
            Architecture
            </a>
             <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
      Building retrofit
            </a>
             <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
      Circular Economy
            </a>
          </div>
        </div> */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
          <p>Flat 4, Manchester,</p>
          <p>United Kingdom</p>
          <p>Email: info@5czero.com</p>
          <p>Phone: +44 7824 323718</p>
        </div>
      </div>
      <p className="text-center text-xs py-8 ">
        © 2025 ZeroBuild Ltd. All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
