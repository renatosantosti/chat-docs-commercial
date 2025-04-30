
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold gradient-text">Chat Docs!</span>
            </Link>
            <p className="mt-4 text-gray-500 text-sm">
              AI-powered PDF document chat for effortless document interaction.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <ScrollLink
                  to="features" // The id of the target element
                  smooth={true} // Enables smooth scrolling
                  duration={500} // Duration of the scroll in milliseconds
                  className="text-base text-gray-600 hover:text-indigo-600"
                >
                  Features
                </ScrollLink>
              </li>
              <li>
                {/* <Link to="#how-it-works" className="text-base text-gray-600 hover:text-indigo-600">
                  How It Works
                </Link> */}
                <ScrollLink
                  to="how-it-works" // The id of the target element
                  smooth={true} // Enables smooth scrolling
                  duration={500} // Duration of the scroll in milliseconds
                  className="text-base text-gray-600 hover:text-indigo-600"
                >
                  How It Works
                </ScrollLink>

              </li>
              <li>
                <Link to="#" className="text-base text-gray-600 hover:text-indigo-600">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="text-base text-gray-600 hover:text-indigo-600">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-600 hover:text-indigo-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-600 hover:text-indigo-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="text-base text-gray-600 hover:text-indigo-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-600 hover:text-indigo-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-600 hover:text-indigo-600">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} Chat Docs!. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
