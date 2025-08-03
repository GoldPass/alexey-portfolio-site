"use client";

import Link from "next/link";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  tech: string;
  link: string;
}

function ProjectCard({ title, tech, link }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 transition-all duration-500 cursor-pointer group"
      style={{
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered 
          ? "0 25px 50px rgba(0, 0, 0, 0.15)" 
          : "0 4px 20px rgba(0, 0, 0, 0.1)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Анимированная полоска сверху */}
      <div 
        className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 mb-6"
        style={{
          transform: isHovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left"
        }}
      />
      
      <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        {tech}
      </p>
      
      <Link 
        href={link}
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-all duration-300"
        style={{
          transform: isHovered ? "translateX(5px)" : "translateX(0)"
        }}
      >
        Подробнее 
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}

const projects = [
  {
    title: "Сервис сокращения ссылок",
    tech: "Next.js, Supabase, Tailwind CSS",
    link: "/projects/url-shortener",
  },
  {
    title: "Парсер маркетплейсов", 
    tech: "Python, Playwright, PostgreSQL",
    link: "/projects/marketplace-parser",
  },
  {
    title: "Бот для Telegram",
    tech: "Node.js, Telegraf.js, MongoDB", 
    link: "/projects/telegram-bot",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero секция */}
      <section className="text-center py-20 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl mx-4 mt-4 mb-8 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            Привет, я Алексей
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            Full-stack разработчик
          </p>
          
          {/* Декоративные элементы */}
          <div className="flex justify-center gap-4 mt-8">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </section>

      {/* Проекты */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Мои проекты
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <ProjectCard
                title={project.title}
                tech={project.tech}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}