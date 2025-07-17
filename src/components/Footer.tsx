import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#192341] text-gray-400 pt-12">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 px-[16px]">
        {/* About Us / Logo Column */}
        <div className="lg:col-span-2">
          <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
          <p className="mb-4">
            ZeroBuild accelerates the decarbonisation of the built environment
            by empowering architects, engineers, developers, local authorities,
            and housing associations to achieve Net Zero faster.
          </p>
        </div>

        

        {/* Quick Links */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li>
              <Link href="/" className="hover:text-white transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors duration-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-white transition-colors duration-300">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition-colors duration-300">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>
{/* Our Services */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Our Services</h2>
          <ul>
            <li>
              <Link href="/" className="hover:text-white transition-colors duration-300">
                Advisory services
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors duration-300">
                Climate and sustainability consulting
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors duration-300">
                Engineering and technical services
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors duration-300">
                Audio-visual systems
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition-colors duration-300">
                Business investment advisory
              </Link>
            </li>
          </ul>
        </div>
        {/* Contact Us */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4 lg:col-span-2">Contact Us</h2>
          <p>Flat 4, Manchester,</p>
          <p>United Kingdom</p>
          <p>Email: info@5czero.com</p>
          <p>Phone: +44 7824 323718</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="text-center text-xs py-8">
        © 2025 ZeroBuild Ltd. All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
