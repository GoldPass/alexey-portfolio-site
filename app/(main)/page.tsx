import Link from "next/link";

// Компонент ProjectCard прямо в этом файле
interface ProjectCardProps {
  title: string;
  tech: string;
  link: string;
}

function ProjectCard({ title, tech, link }: ProjectCardProps) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "1rem",
        padding: "2rem",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.transform = "translateY(-5px)";
        target.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.transform = "translateY(0)";
        target.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
      }}
    >
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#111827",
          marginBottom: "1rem",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "#6b7280",
          marginBottom: "1.5rem",
          fontSize: "1rem",
        }}
      >
        {tech}
      </p>
      <Link
        href={link}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "#3b82f6",
          textDecoration: "none",
          fontWeight: "500",
          fontSize: "1rem",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => {
          const target = e.target as HTMLAnchorElement;
          target.style.color = "#1d4ed8";
        }}
        onMouseLeave={(e) => {
          const target = e.target as HTMLAnchorElement;
          target.style.color = "#3b82f6";
        }}
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