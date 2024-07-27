// ./common/footer.js
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-900 dark:text-gray-300">
            © 2023 Book Quotes App
          </p>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="/about"
                  className="text-gray-900 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-900 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-900 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
