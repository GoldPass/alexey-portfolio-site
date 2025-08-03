"use client";

import Link from "next/link";

// Компонент ProjectCard прямо в этом файле
interface ProjectCardProps {
  title: string;
  tech: string;
  link: string;
}

function ProjectCard({ title, tech, link }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl cursor-pointer">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{tech}</p>
      <Link
        href={link}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
      >
        Подробнее →
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
    <>
      <section className="hero-section">
        <h1>Привет, я Алексей</h1>
        <p>Full-stack разработчик</p>
      </section>
      <section className="projects-section">
        <h2>Мои проекты</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              tech={project.tech}
              link={project.link}
            />
          ))}
        </div>
      </section>
    </>
  );
}
