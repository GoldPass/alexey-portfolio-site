import ProjectCard from "@/app/components/ProjectCard";

const projects = [
  {
    title: "Сервис сокращения ссылок",
    tech: "Next.js, Supabase, Tailwind CSS",
    link: "/projects/url-shortener", // Ведет на страницу проекта
  },
  {
    title: "Парсер маркетплейсов",
    tech: "Python, Playwright, PostgreSQL",
    link: "/projects/marketplace-parser", // Ведет на страницу проекта
  },
  {
    title: "Бот для Telegram",
    tech: "Node.js, Telegraf.js, MongoDB",
    link: "/projects/telegram-bot", // Ведет на страницу с ботом
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