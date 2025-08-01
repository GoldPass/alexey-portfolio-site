"use client";

import Link from "next/link";

export default function TelegramBotPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9fafb 0%, #e0f2fe 100%)",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Кнопка "Назад" */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#0ea5e9",
            textDecoration: "none",
            fontWeight: "500",
            marginBottom: "2rem",
            fontSize: "16px",
          }}
        >
          ← Назад к проектам
        </Link>

        {/* Hero секция */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "1.5rem",
              lineHeight: "1.2",
            }}
          >
            🤖 AI Telegram Bot
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#6b7280",
              marginBottom: "2rem",
              maxWidth: "600px",
              margin: "0 auto 2rem auto",
            }}
          >
            Умный помощник на базе Google Gemini AI для ответов на любые вопросы
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#dcfce7",
                color: "#166534",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Node.js
            </span>
            <span
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#dbeafe",
                color: "#1e40af",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Telegraf.js
            </span>
            <span
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#fef3c7",
                color: "#92400e",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              MongoDB
            </span>
          </div>
        </div>

        {/* Главная кнопка для перехода к боту */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "1.5rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            padding: "3rem 2rem",
            marginBottom: "2rem",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                fontSize: "4rem",
                marginBottom: "1rem",
              }}
            >
              🚀
            </div>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "1rem",
              }}
            >
              Попробуйте бота прямо сейчас!
            </h2>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                marginBottom: "2rem",
                maxWidth: "500px",
                margin: "0 auto 2rem auto",
              }}
            >
              Бот готов отвечать на ваши вопросы 24/7. Просто напишите ему любой вопрос!
            </p>
          </div>

          <a
            href="https://t.me/akauntvanish_ai_bot"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
              color: "white",
              padding: "1.25rem 2.5rem",
              borderRadius: "0.75rem",
              fontWeight: "600",
              fontSize: "1.25rem",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 4px 20px rgba(14, 165, 233, 0.3)",
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.style.transform = "translateY(-3px)";
              target.style.boxShadow = "0 10px 30px rgba(14, 165, 233, 0.4)";
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLAnchorElement;
              target.style.transform = "translateY(0)";
              target.style.boxShadow = "0 4px 20px rgba(14, 165, 233, 0.3)";
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>📱</span>
            Открыть Telegram Бота
          </a>
        </div>

        {/* Возможности бота */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "1.5rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            padding: "2rem",
            marginBottom: "2rem",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            ✨ Возможности бота
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                icon: "🧠",
                title: "Умные ответы",
                description: "Отвечает на любые вопросы используя ИИ Google Gemini"
              },
              {
                icon: "💻",
                title: "Помощь с кодом",
                description: "Помогает с программированием и техническими вопросами"
              },
              {
                icon: "📚",
                title: "Объяснения",
                description: "Объясняет сложные темы простыми словами"
              },
              {
                icon: "💡",
                title: "Генерация идей",
                description: "Помогает придумывать креативные решения"
              },
              {
                icon: "🆓",
                title: "Бесплатно",
                description: "Полностью бесплатный для всех пользователей"
              },
              {
                icon: "⚡",
                title: "Быстро",
                description: "Мгновенные ответы в любое время суток"
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #f3f4f6",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  {feature.icon}
                </div>
                <h4
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "0.75rem",
                  }}
                >
                  {feature.title}
                </h4>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.925rem",
                    lineHeight: "1.5",
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Примеры использования */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "1.5rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            padding: "2rem",
            marginBottom: "2rem",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            💬 Примеры вопросов
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              "Объясни что такое блокчейн простыми словами",
              "Как приготовить идеальную пасту карбонара?",
              "Напиши код на Python для сортировки массива",
              "Дай совет по изучению программирования",
              "Какие тренды в веб-разработке в 2025?",
              "Помоги решить математическую задачу"
            ].map((example, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "0.75rem",
                  padding: "1rem 1.25rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.925rem",
                  color: "#475569",
                  fontStyle: "italic",
                }}
              >
                "{example}"
              </div>
            ))}
          </div>
        </div>

        {/* Техническая информация */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "1.5rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            padding: "2rem",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            🔧 Техническая реализация
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
              textAlign: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.75rem",
                }}
              >
                🟢
              </div>
              <h4
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                Node.js
              </h4>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                }}
              >
                Серверная среда выполнения
              </p>
            </div>

            <div>
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.75rem",
                }}
              >
                📡
              </div>
              <h4
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                Telegraf.js
              </h4>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                }}
              >
                Фреймворк для Telegram ботов
              </p>
            </div>

            <div>
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.75rem",
                }}
              >
                🧠
              </div>
              <h4
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                Google Gemini
              </h4>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                }}
              >
                Современная ИИ модель
              </p>
            </div>

            <div>
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.75rem",
                }}
              >
                🍃
              </div>
              <h4
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                MongoDB
              </h4>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                }}
              >
                База данных для хранения
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "2rem",
              textAlign: "center",
              padding: "1.5rem",
              backgroundColor: "#f8fafc",
              borderRadius: "0.75rem",
              border: "1px solid #e2e8f0",
            }}
          >
            <p
              style={{
                color: "#475569",
                fontSize: "0.925rem",
                lineHeight: "1.6",
                marginBottom: "1rem",
              }}
            >
              <strong>Разработчик:</strong> Алексей<br />
              <strong>Статус:</strong> Активно работает 🟢<br />
              <strong>Доступность:</strong> 24/7 бесплатно для всех
            </p>
            <p
              style={{
                color: "#6b7280",
                fontSize: "0.875rem",
                fontStyle: "italic",
              }}
            >
              Бот использует бесплатный API Google Gemini и доступен всем пользователям без ограничений
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
