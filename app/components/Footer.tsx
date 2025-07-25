import { FaGithub, FaTelegram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-40">
      <div className="bg-gray-900/90 backdrop-blur-sm text-gray-300 p-4 rounded-tr-2xl shadow-xl border-t border-r border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="text-xs">
            <p>© {new Date().getFullYear()} Алексей</p>
            <p className="text-gray-400">Все права защищены</p>
          </div>
          <div className="flex space-x-3 border-l border-gray-600 pl-4">
            <a
              href="#"
              className="hover:text-indigo-400 transition-colors duration-300 transform hover:scale-110"
              title="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
              title="Telegram"
            >
              <FaTelegram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:text-red-400 transition-colors duration-300 transform hover:scale-110"
              title="Email"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
