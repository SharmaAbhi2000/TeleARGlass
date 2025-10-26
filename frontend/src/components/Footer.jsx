import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Linkedin,
} from "lucide-react";
import Container from "./ui/Container";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <Container className="py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-xl mb-4 flex items-center">
              <img
                src={assets.logo}
                alt="TeleARGlass Logo"
                className="w-25 h-20 mr-3 rounded-xl border border-white"
              />
              TeleARGlass
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Serving humanity through technology.
            </p>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://www.linkedin.com/in/jayeshpateltelearglass"
                className="hover:text-sky-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/jayeshpateltelearglass"
                className="hover:text-sky-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-sky-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/teleProducts" className="hover:text-sky-400 transition">
                  TeleProducts
                </Link>
              </li>
              <li>
                <Link to="/teleServices" className="hover:text-sky-400 transition">
                  TeleServices
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sky-400 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/recuriment" className="hover:text-sky-400 transition">
                  Recruitment
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-sky-400 transition">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/orders" className="hover:text-sky-400 transition">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-sky-400 transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/place-order" className="hover:text-sky-400 transition">
                  Place Order
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-sky-400 transition">
                  Verify Account
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sky-400 transition">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin size={18} className="mt-0.5 mr-2 text-sky-400" />
                Rupal Vas, Anandpura, Kadi, Mehsana, GJ 382705, India.
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-sky-400" />
                jayeshpatel@telearglass.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-sky-400">TeleARGlass</span>. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
