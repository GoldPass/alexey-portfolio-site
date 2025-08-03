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
      style={{
        backgroundColor: "white",
        borderRadius: "1.5rem",
        padding: "2rem",
        boxShadow: isHovered 
          ? "0 25px 50px rgba(0, 0, 0, 0.15)" 
          : "0 4px 20px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
        transition: "all 0.4s ease",
        cursor: "pointer",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        position: "relative" as const,
        overflow: "hidden" as const,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Анимированная полоска сверху */}
      <div 
        style={{
          position: "absolute" as const,
          top: 0,
          left: 0,
          height: "4px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "2px",
          transition: "all 0.4s ease",
          width: isHovered ? "100%" : "0%",
        }}
      />
      
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          color: isHovered ? "#667eea" : "#111827",
          marginBottom: "1rem",
          marginTop: "0.5rem",
          transition: "color 0.3s ease",
        }}
      >
        {title}
      </h3>
      
      <p
        style={{
          color: "#6b7280",
          marginBottom: "1.5rem",
          fontSize: "1rem",
          lineHeight: "1.6",
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
          color: "#667eea",
          textDecoration: "none",
          fontWeight: "500",
          fontSize: "1rem",
          transition: "all 0.3s ease",
          transform: isHovered ? "translateX(5px)" : "translateX(0)",
        }}
      >
        Подробнее 
        <span 
          style={{
            transition: "transform 0.3s ease",
            transform: isHovered ? "translateX(3px)" : "translateX(0)",
          }}
        >
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
    <>
      {/* Hero секция */}
      <section 
        style={{
          textAlign: "center" as const,
          padding: "6rem 2rem",
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
          margin: "2rem auto",
          borderRadius: "2rem",
          maxWidth: "1200px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "700",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "1rem",
            letterSpacing: "-0.02em",
            lineHeight: "1.2",
          }}
        >
          Привет, я Алексей
        </h1>
        <p
          style={{
            fontSize: "1.4rem",
            color: "#6b7280",
            fontWeight: "500",
          }}
        >
          Full-stack разработчик
        </p>
        
        {/* Декоративные точки */}
        <div 
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: i % 2 === 0 ? "#667eea" : "#764ba2",
                borderRadius: "50%",
                animation: `pulse 2s infinite ${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Проекты */}
      <section 
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "3rem",
            textAlign: "left" as const,
            position: "relative" as const,
          }}
        >
          Мои проекты
          <div
            style={{
              position: "absolute" as const,
              bottom: "-0.5rem",
              left: 0,
              width: "100px",
              height: "4px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "2px",
            }}
          />
        </h2>
        
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {projects.map((project, index) => (
            <div 
              key={index}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
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
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem !important;
          }
          section {
            padding: 4rem 1rem !important;
            margin: 1rem !important;
          }
        }
      `}</style>
    </>
  );
}