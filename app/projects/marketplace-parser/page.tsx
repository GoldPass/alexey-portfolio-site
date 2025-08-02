"use client";

import Link from "next/link";
import { useState } from "react";

// Интерфейсы для проекта
interface ParseTask {
  id: string;
  marketplace: string;
  category: string;
  keywords: string;
  status: "pending" | "running" | "completed" | "error";
  itemsFound: number;
  createdAt: string;
  completedAt?: string;
}

interface ParsedItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  seller: string;
  url: string;
  imageUrl: string;
}

export default function MarketplaceParserPage() {
  // Состояния компонента
  const [selectedMarketplace, setSelectedMarketplace] = useState("wildberries");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("4.0");
  const [isLoading, setIsLoading] = useState(false);
  const [parseTasks, setParseTasks] = useState<ParseTask[]>([]);
  const [parsedItems, setParsedItems] = useState<ParsedItem[]>([]);
  const [activeTab, setActiveTab] = useState<"form" | "tasks" | "results">(
    "form"
  );
  const [error, setError] = useState("");

  // Опции маркетплейсов
  const marketplaces = [
    { value: "wildberries", label: "Wildberries", color: "#8B5A96" },
    { value: "ozon", label: "OZON", color: "#0085FF" },
    { value: "yandexmarket", label: "Яндекс.Маркет", color: "#FC3F1D" },
    { value: "avito", label: "Avito", color: "#00A046" },
  ];

  // Популярные категории
  const categories = [
    "Электроника",
    "Одежда и обувь",
    "Дом и сад",
    "Красота и здоровье",
    "Детские товары",
    "Спорт и отдых",
    "Автотовары",
    "Книги и канцтовары",
  ];

  // Функция запуска парсинга
  const startParsing = async () => {
    if (!keywords.trim()) {
      setError("Введите ключевые слова для поиска");
      return;
    }

    setIsLoading(true);
    setError("");

    const newTask: ParseTask = {
      id: Date.now().toString(),
      marketplace: selectedMarketplace,
      category: category || "Все категории",
      keywords: keywords,
      status: "running",
      itemsFound: 0,
      createdAt: new Date().toLocaleString("ru-RU"),
    };

    setParseTasks((prev) => [newTask, ...prev]);
    setActiveTab("tasks");

    // Симуляция парсинга
    setTimeout(() => {
      const itemsCount = Math.floor(Math.random() * 50) + 10;
      const mockItems: ParsedItem[] = Array.from(
        { length: Math.min(itemsCount, 10) },
        (_, i) => ({
          id: `item-${Date.now()}-${i}`,
          name: `${keywords} товар ${i + 1}`,
          price: Math.floor(Math.random() * 5000) + 500,
          rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
          reviews: Math.floor(Math.random() * 1000) + 10,
          seller: `Продавец ${i + 1}`,
          url: `https://${selectedMarketplace}.ru/product/${i + 1}`,
          imageUrl: `https://via.placeholder.com/200x200?text=Товар+${i + 1}`,
        })
      );

      setParseTasks((prev) =>
        prev.map((task) =>
          task.id === newTask.id
            ? {
                ...task,
                status: "completed" as const,
                itemsFound: itemsCount,
                completedAt: new Date().toLocaleString("ru-RU"),
              }
            : task
        )
      );

      setParsedItems((prev) => [...mockItems, ...prev]);
      setIsLoading(false);

      // Очистка формы
      setKeywords("");
      setCategory("");
      setMinPrice("");
      setMaxPrice("");
    }, 3000);
  };

  // Функция удаления задачи
  const deleteTask = (taskId: string) => {
    setParseTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Функция экспорта данных
  const exportData = () => {
    const dataStr = JSON.stringify(parsedItems, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `parsed_data_${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();
    URL.revokeObjectURL(url);
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
            Парсер маркетплейсов
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
            Автоматический сбор данных о товарах с популярных маркетплейсов для
            анализа цен и конкурентов
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
                backgroundColor: "#fef3c7",
                color: "#92400e",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Python
            </span>
            <span
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#e0f2fe",
                color: "#0369a1",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Playwright
            </span>
            <span
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#f0f9ff",
                color: "#0284c7",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              PostgreSQL
            </span>
          </div>
        </div>

        {/* Навигация по табам */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "1rem",
            padding: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: "500px",
            margin: "0 auto 2rem auto",
          }}
        >
          {[
            { key: "form", label: "Настройка парсинга", icon: "⚙️" },
            { key: "tasks", label: "Задачи", icon: "📋" },
            { key: "results", label: "Результаты", icon: "📊" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                backgroundColor:
                  activeTab === tab.key ? "#4f46e5" : "transparent",
                color: activeTab === tab.key ? "white" : "#6b7280",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: "0.875rem",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Форма настройки парсинга */}
        {activeTab === "form" && (
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
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "2rem",
                color: "#111827",
                textAlign: "center",
              }}
            >
              Настройка парсинга
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              {/* Выбор маркетплейса */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.75rem",
                  }}
                >
                  Маркетплейс:
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "0.5rem",
                  }}
                >
                  {marketplaces.map((mp) => (
                    <button
                      key={mp.value}
                      onClick={() => setSelectedMarketplace(mp.value)}
                      style={{
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                        border:
                          selectedMarketplace === mp.value
                            ? `2px solid ${mp.color}`
                            : "2px solid #e5e7eb",
                        backgroundColor:
                          selectedMarketplace === mp.value
                            ? `${mp.color}10`
                            : "white",
                        color:
                          selectedMarketplace === mp.value
                            ? mp.color
                            : "#374151",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        fontSize: "0.875rem",
                      }}
                    >
                      {mp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Категория */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.75rem",
                  }}
                >
                  Категория (необязательно):
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                >
                  <option value="">Все категории</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ключевые слова */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.75rem",
                  }}
                >
                  Ключевые слова для поиска:
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Например: iPhone 15, кроссовки Nike, ноутбук"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
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
                />
              </div>

              {/* Фильтры цены */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.75rem",
                  }}
                >
                  Минимальная цена (₽):
                </label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.75rem",
                  }}
                >
                  Максимальная цена (₽):
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Без ограничений"
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Минимальный рейтинг */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.75rem",
                  }}
                >
                  Минимальный рейтинг: {minRating}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  style={{
                    width: "100%",
                    height: "6px",
                    borderRadius: "3px",
                    background: "#e5e7eb",
                    outline: "none",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    marginTop: "0.5rem",
                  }}
                >
                  <span>1.0</span>
                  <span>2.5</span>
                  <span>5.0</span>
                </div>
              </div>
            </div>

            {error && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  marginTop: "1rem",
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}

            <button
              onClick={startParsing}
              disabled={isLoading}
              style={{
                width: "100%",
                maxWidth: "400px",
                margin: "2rem auto 0 auto",
                display: "block",
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
              }}
            >
              {isLoading ? "🔄 Парсинг в процессе..." : "🚀 Запустить парсинг"}
            </button>
          </div>
        )}

        {/* Список задач */}
        {activeTab === "tasks" && (
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
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "2rem",
                color: "#111827",
                textAlign: "center",
              }}
            >
              Задачи парсинга
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
                {parseTasks.length}
              </span>
            </h2>

            {parseTasks.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  color: "#6b7280",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
                <p>У вас пока нет задач парсинга</p>
                <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
                  Перейдите на вкладку "Настройка парсинга" чтобы создать новую
                  задачу
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  maxWidth: "800px",
                  margin: "0 auto",
                }}
              >
                {parseTasks.map((task) => (
                  <div
                    key={task.id}
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
                        gap: "1rem",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            marginBottom: "1rem",
                          }}
                        >
                          <h3
                            style={{
                              fontSize: "1.125rem",
                              fontWeight: "600",
                              color: "#111827",
                            }}
                          >
                            {task.keywords}
                          </h3>
                          <span
                            style={{
                              padding: "0.25rem 0.75rem",
                              borderRadius: "9999px",
                              fontSize: "0.75rem",
                              fontWeight: "500",
                              backgroundColor:
                                task.status === "completed"
                                  ? "#dcfce7"
                                  : task.status === "running"
                                  ? "#fef3c7"
                                  : task.status === "error"
                                  ? "#fecaca"
                                  : "#f3f4f6",
                              color:
                                task.status === "completed"
                                  ? "#166534"
                                  : task.status === "running"
                                  ? "#92400e"
                                  : task.status === "error"
                                  ? "#dc2626"
                                  : "#6b7280",
                            }}
                          >
                            {task.status === "completed" && "✅ Завершено"}
                            {task.status === "running" && "🔄 Выполняется"}
                            {task.status === "error" && "❌ Ошибка"}
                            {task.status === "pending" && "⏳ Ожидание"}
                          </span>
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(150px, 1fr))",
                            gap: "1rem",
                            fontSize: "0.875rem",
                            color: "#6b7280",
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: "500" }}>
                              Маркетплейс:
                            </span>
                            <br />
                            {
                              marketplaces.find(
                                (mp) => mp.value === task.marketplace
                              )?.label
                            }
                          </div>
                          <div>
                            <span style={{ fontWeight: "500" }}>
                              Категория:
                            </span>
                            <br />
                            {task.category}
                          </div>
                          <div>
                            <span style={{ fontWeight: "500" }}>Создана:</span>
                            <br />
                            {task.createdAt}
                          </div>
                          <div>
                            <span style={{ fontWeight: "500" }}>
                              Найдено товаров:
                            </span>
                            <br />
                            {task.itemsFound}
                          </div>
                        </div>

                        {task.completedAt && (
                          <div
                            style={{
                              marginTop: "0.75rem",
                              fontSize: "0.875rem",
                              color: "#059669",
                              fontWeight: "500",
                            }}
                          >
                            Завершено: {task.completedAt}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => deleteTask(task.id)}
                        style={{
                          padding: "0.5rem",
                          color: "#ef4444",
                          backgroundColor: "transparent",
                          border: "none",
                          borderRadius: "0.5rem",
                          cursor: "pointer",
                          fontSize: "1.25rem",
                        }}
                        title="Удалить задачу"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Результаты парсинга */}
        {activeTab === "results" && (
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#111827",
                }}
              >
                Результаты парсинга
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
                  {parsedItems.length}
                </span>
              </h2>

              {parsedItems.length > 0 && (
                <button
                  onClick={exportData}
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#059669",
                    color: "white",
                    borderRadius: "0.5rem",
                    fontWeight: "500",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  📊 Экспорт в JSON
                </button>
              )}
            </div>

            {parsedItems.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem",
                  color: "#6b7280",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📊</div>
                <p>Результаты парсинга появятся здесь</p>
                <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>
                  Запустите парсинг чтобы увидеть найденные товары
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {parsedItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "0.75rem",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      padding: "1.5rem",
                      border: "1px solid #f3f4f6",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLDivElement;
                      target.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLDivElement;
                      target.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "150px",
                        backgroundColor: "#f3f4f6",
                        borderRadius: "0.5rem",
                        marginBottom: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2rem",
                      }}
                    >
                      📦
                    </div>

                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "0.75rem",
                        lineHeight: "1.4",
                        height: "2.8rem",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {item.name}
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "700",
                          color: "#059669",
                        }}
                      >
                        {item.price.toLocaleString("ru-RU")} ₽
                      </span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          fontSize: "0.875rem",
                          color: "#f59e0b",
                        }}
                      >
                        ⭐ {item.rating}
                      </div>
                    </div>

                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                        marginBottom: "1rem",
                      }}
                    >
                      <div style={{ marginBottom: "0.25rem" }}>
                        <span style={{ fontWeight: "500" }}>Продавец:</span>{" "}
                        {item.seller}
                      </div>
                      <div>
                        <span style={{ fontWeight: "500" }}>Отзывов:</span>{" "}
                        {item.reviews}
                      </div>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem 1rem",
                        backgroundColor: "#4f46e5",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLAnchorElement;
                        target.style.backgroundColor = "#3730a3";
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLAnchorElement;
                        target.style.backgroundColor = "#4f46e5";
                      }}
                    >
                      Перейти к товару 🔗
                    </a>
                  </div>
                ))}
              </div>
            )}
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
