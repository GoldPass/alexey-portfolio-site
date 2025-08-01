"use client";

import Link from "next/link";
import { useState } from "react";

// Интерфейс для сокращенной ссылки
interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

export default function UrlShortenerPage() {
  // Состояния компонента
  const [originalUrl, setOriginalUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Функция для генерации короткого кода
  const generateShortCode = (): string => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Функция валидации URL
  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Функция сокращения ссылки
  const shortenUrl = async () => {
    if (!originalUrl.trim()) {
      setError("Пожалуйста, введите ссылку");
      return;
    }

    if (!isValidUrl(originalUrl)) {
      setError(
        "Пожалуйста, введите корректную ссылку (с http:// или https://)"
      );
      return;
    }

    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const shortCode = generateShortCode();
      const newShortenedUrl: ShortenedUrl = {
        id: Date.now().toString(),
        originalUrl: originalUrl,
        shortCode: shortCode,
        shortUrl: `https://short.ly/${shortCode}`,
        clicks: 0,
        createdAt: new Date().toLocaleDateString("ru-RU"),
      };

      setShortenedUrls((prev) => [newShortenedUrl, ...prev]);
      setOriginalUrl("");
      setIsLoading(false);
    }, 1000);
  };

  // Функция копирования в буфер обмена
  const copyToClipboard = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Ошибка копирования: ", err);
    }
  };

  // Функция удаления ссылки
  const deleteUrl = (id: string) => {
    setShortenedUrls((prev) => prev.filter((url) => url.id !== id));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9fafb 0%, #eff6ff 100%)",
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
            color: "#4f46e5",
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
            Сервис сокращения ссылок
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
            Превратите длинные URL в короткие, удобные ссылки за секунды
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
                backgroundColor: "#dbeafe",
                color: "#1e40af",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Next.js
            </span>
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
              Supabase
            </span>
            <span
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#f3e8ff",
                color: "#7c3aed",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Tailwind CSS
            </span>
          </div>
        </div>

        {/* Основной интерфейс сервиса */}
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
          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "1.5rem",
                color: "#111827",
                textAlign: "center",
              }}
            >
              Сократите вашу ссылку
            </h2>

            {/* Форма ввода */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.75rem",
                }}
              >
                Введите длинную ссылку:
              </label>
              <input
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://example.com/very-long-url-that-needs-shortening"
                style={{
                  width: "100%",
                  padding: "1rem 1.5rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "0.75rem",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = "#4f46e5";
                  target.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.1)";
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = "#e5e7eb";
                  target.style.boxShadow = "none";
                }}
                disabled={isLoading}
              />
              {error && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    marginTop: "0.75rem",
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              )}
            </div>

            <button
              onClick={shortenUrl}
              disabled={isLoading}
              style={{
                width: "100%",
                background: isLoading
                  ? "#9ca3af"
                  : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                color: "white",
                padding: "1rem 2rem",
                borderRadius: "0.75rem",
                fontWeight: "600",
                fontSize: "1.125rem",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  const target = e.target as HTMLButtonElement;
                  target.style.transform = "translateY(-2px)";
                  target.style.boxShadow = "0 10px 25px rgba(79, 70, 229, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  const target = e.target as HTMLButtonElement;
                  target.style.transform = "translateY(0)";
                  target.style.boxShadow = "none";
                }
              }}
            >
              {isLoading ? (
                <>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid white",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                  Сокращаем...
                </>
              ) : (
                "Сократить ссылку"
              )}
            </button>
          </div>
        </div>

        {/* Список сокращенных ссылок */}
        {shortenedUrls.length > 0 && (
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
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "2rem",
                color: "#111827",
                textAlign: "center",
              }}
            >
              Ваши сокращенные ссылки
              <span
                style={{
                  marginLeft: "0.5rem",
                  padding: "0.25rem 0.75rem",
                  backgroundColor: "#e0e7ff",
                  color: "#3730a3",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                {shortenedUrls.length}
              </span>
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              {shortenedUrls.map((url) => (
                <div
                  key={url.id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: "1.5rem",
                    border: "1px solid #f3f4f6",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "1.5rem",
                    }}
                  >
                    <div style={{ flex: "1", minWidth: "0" }}>
                      {/* Короткая ссылка */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <div style={{ flex: "1" }}>
                          <p
                            style={{
                              fontSize: "0.875rem",
                              color: "#6b7280",
                              marginBottom: "0.25rem",
                            }}
                          >
                            Короткая ссылка:
                          </p>
                          <p
                            style={{
                              fontSize: "1.25rem",
                              fontWeight: "600",
                              color: "#4f46e5",
                              wordBreak: "break-all",
                            }}
                          >
                            {url.shortUrl}
                          </p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(url.shortUrl, url.id)}
                          style={{
                            padding: "0.5rem 1rem",
                            backgroundColor:
                              copiedId === url.id ? "#dcfce7" : "#e0e7ff",
                            color: copiedId === url.id ? "#166534" : "#3730a3",
                            borderRadius: "0.5rem",
                            fontWeight: "500",
                            border: "none",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            fontSize: "0.875rem",
                          }}
                        >
                          {copiedId === url.id ? "✓ Скопировано" : "Копировать"}
                        </button>
                      </div>

                      {/* Оригинальная ссылка */}
                      <div style={{ marginBottom: "1rem" }}>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "#6b7280",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Оригинальная ссылка:
                        </p>
                        <p
                          style={{
                            color: "#374151",
                            wordBreak: "break-all",
                            fontSize: "0.875rem",
                            backgroundColor: "#f9fafb",
                            padding: "0.75rem",
                            borderRadius: "0.5rem",
                          }}
                        >
                          {url.originalUrl}
                        </p>
                      </div>

                      {/* Статистика */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.5rem",
                          fontSize: "0.875rem",
                          color: "#6b7280",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              backgroundColor: "#10b981",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <span>Создана: {url.createdAt}</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              backgroundColor: "#3b82f6",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <span>Переходов: {url.clicks}</span>
                        </div>
                      </div>
                    </div>

                    {/* Кнопка удаления */}
                    <button
                      onClick={() => deleteUrl(url.id)}
                      style={{
                        padding: "0.5rem 1rem",
                        color: "#ef4444",
                        backgroundColor: "transparent",
                        border: "none",
                        borderRadius: "0.5rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = "#fef2f2";
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = "transparent";
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
