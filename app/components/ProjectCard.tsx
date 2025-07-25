"use client";
import Link from "next/link";

export default function ProjectCard({
  title,
  tech,
  link,
}: {
  title: string;
  tech: string;
  link: string;
}) {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{tech}</p>
      <Link href={link} className="project-link">
        Подробнее →
      </Link>
    </div>
  );
}
