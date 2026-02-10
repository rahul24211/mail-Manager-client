import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-dark text-light pt-4 pb-3 mt-5"
    >
      <div className="container">
        <div className="row align-items-center text-center text-md-start">

          {/* Left */}
          <div className="col-md-6 mb-3 mb-md-0">
            <h5 className="fw-bold text-warning mb-1">
              📬 Mail Manager
            </h5>
            <p className="small text-secondary mb-0">
              Smartly manage, track & reply to all your mails in one place.
            </p>
          </div>

          {/* Right */}
          <div className="col-md-6 d-flex justify-content-center justify-content-md-end gap-3">
            {[FaEnvelope, FaGithub, FaLinkedin].map((Icon, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-light fs-4"
                href="#"
              >
                <Icon />
              </motion.a>
            ))}
          </div>

        </div>

        <hr className="border-secondary my-3" />

        <div className="text-center small text-secondary">
          © {new Date().getFullYear()} Mail Manager · All Rights Reserved
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
