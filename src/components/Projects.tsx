import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, GitFork, Sparkles, Code2 } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  languages_url: string;
  default_branch: string;
  stargazers_count?: number;
  forks_count?: number;
  homepage?: string | null;
  topics?: string[];
}

interface Languages {
  [key: string]: number;
}

interface CuratedProject {
  id: number;
  name: string;
  title: string;
  description: string;
  category: "fullstack" | "frontend" | "utility";
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  image: string;
  languages: Languages;
  stars: number;
  forks: number;
}

const GITHUB_USERNAME = "Developer-Animesh";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Curated showcase projects with rich previews for reliable rendering
const CURATED_PROJECTS: CuratedProject[] = [
  {
    id: 101,
    name: "animesh-portfolio",
    title: "Animated Developer Portfolio",
    description: "Next-gen 3D developer portfolio featuring Three.js, LiquidEther shaders, Framer Motion, and Pro glassmorphic UI.",
    category: "frontend",
    tags: ["React 19", "Three.js", "TypeScript", "Framer Motion"],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/animesh`,
    demoUrl: "https://animeshpathak.dev",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    languages: { TypeScript: 70, CSS: 20, HTML: 10 },
    stars: 12,
    forks: 4,
  },
  {
    id: 102,
    name: "ai-saas-dashboard",
    title: "AI Automation Platform",
    description: "Full-stack SaaS application with real-time AI workflows, stripe billing, authentication, and customizable dashboards.",
    category: "fullstack",
    tags: ["Node.js", "Express", "PostgreSQL", "React", "Tailwind"],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/ai-saas-dashboard`,
    demoUrl: "https://github.com/" + GITHUB_USERNAME,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    languages: { TypeScript: 55, Python: 30, SQL: 15 },
    stars: 28,
    forks: 8,
  },
  {
    id: 103,
    name: "dev-stream-api",
    title: "High-Performance Stream API",
    description: "Scalable backend microservice delivering low-latency real-time telemetry, websocket feeds, and JWT OAuth security.",
    category: "utility",
    tags: ["Node.js", "Redis", "Docker", "REST API"],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/dev-stream-api`,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    languages: { JavaScript: 80, Dockerfile: 15, Shell: 5 },
    stars: 19,
    forks: 5,
  },
  {
    id: 104,
    name: "3d-product-configurator",
    title: "Interactive 3D Configurator",
    description: "Web-based real-time 3D product customization tool built with React Three Fiber and GLTF material swapping.",
    category: "frontend",
    tags: ["Three.js", "R3F", "GLSL", "React"],
    githubUrl: `https://github.com/${GITHUB_USERNAME}/3d-product-configurator`,
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop",
    languages: { TypeScript: 65, GLSL: 25, HTML: 10 },
    stars: 34,
    forks: 11,
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"all" | "fullstack" | "frontend" | "utility">("all");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [repoLanguages, setRepoLanguages] = useState<Record<number, Languages>>({});
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const repoRes = await axios.get<Repo[]>(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
        {
          headers: TOKEN ? { Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.github+json" } : {},
        }
      );

      if (repoRes.data && Array.isArray(repoRes.data) && repoRes.data.length > 0) {
        setRepos(repoRes.data);
        const langs: Record<number, Languages> = {};
        await Promise.all(
          repoRes.data.map(async (repo) => {
            try {
              const res = await axios.get<Languages>(repo.languages_url);
              langs[repo.id] = res.data;
            } catch {
              langs[repo.id] = { TypeScript: 80, CSS: 20 };
            }
          })
        );
        setRepoLanguages(langs);
      } else {
        setUseFallback(true);
      }
    } catch {
      // Fallback seamlessly to curated projects on API rate-limiting or network error
      setUseFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredCurated = CURATED_PROJECTS.filter((p) => activeTab === "all" || p.category === activeTab);

  return (
    <section id="projects" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Glow Orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0, 255, 204, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ textTransform: "uppercase" }}>
          <span className="pro-badge pro-badge-gold">
            <Sparkles size={14} /> Featured Portfolio
          </span>
        </div>
        <h2 className="pro-section-title" style={{ marginTop: 12 }}>
          Crafted Applications & Systems
        </h2>
        <p className="pro-section-subtitle">
          Explore a collection of high-performance full-stack applications, interactive 3D web experiences, and microservices built with modern web tech.
        </p>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 40,
            flexWrap: "wrap",
          }}
        >
          {[
            { id: "all", label: "All Works" },
            { id: "fullstack", label: "Full Stack" },
            { id: "frontend", label: "Frontend & 3D" },
            { id: "utility", label: "APIs & Tools" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: "10px 22px",
                  borderRadius: 30,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  background: isActive
                    ? "linear-gradient(135deg, #00ffcc 0%, #00bfa6 100%)"
                    : "rgba(255, 255, 255, 0.04)",
                  color: isActive ? "#000" : "#94a3b8",
                  border: isActive ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: isActive ? "0 0 25px rgba(0, 255, 204, 0.3)" : "none",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Showcase Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 30,
          }}
        >
          {/* LOADER */}
          {loading && (
            <div
              style={{
                gridColumn: "1/-1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "80px 0",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{
                  width: 44,
                  height: 44,
                  border: "4px solid rgba(0, 255, 204, 0.2)",
                  borderTop: "4px solid #00ffcc",
                  borderRadius: "50%",
                }}
              />
            </div>
          )}

          {/* CURATED PRO PROJECTS (Fallback & API Hybrid) */}
          {!loading && useFallback &&
            filteredCurated.map((project, idx) => {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="pro-glass-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    textAlign: "left",
                  }}
                >
                  {/* Image Container with Hover Zoom & Gradient */}
                  <div style={{ position: "relative", height: 210, overflow: "hidden" }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(13, 17, 23, 0.95) 0%, rgba(13, 17, 23, 0.2) 60%, transparent 100%)",
                      }}
                    />

                    <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 8 }}>
                      <span className="pro-badge" style={{ fontSize: "0.7rem", padding: "4px 10px" }}>
                        <Code2 size={12} /> {project.category}
                      </span>
                    </div>

                    <div style={{ position: "absolute", bottom: 12, left: 20, right: 20 }}>
                      <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                    <div>
                      <p style={{ color: "#94a3b8", fontSize: "0.93rem", lineHeight: 1.6, marginBottom: 20 }}>
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              padding: "4px 10px",
                              borderRadius: 6,
                              background: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.08)",
                              color: "#cbd5e1",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Language Bars */}
                      <div style={{ marginBottom: 20 }}>
                        {Object.entries(project.languages).map(([lang, pct]) => (
                          <div key={lang} style={{ marginTop: 8 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748b", marginBottom: 4 }}>
                              <span>{lang}</span>
                              <span>{pct}%</span>
                            </div>
                            <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 1 }}
                                style={{
                                  height: "100%",
                                  background: "linear-gradient(90deg, #00ffcc, #00bfa6)",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div
                      style={{
                        paddingTop: 16,
                        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", gap: 14, color: "#64748b", fontSize: "0.8rem" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Star size={14} color="#ffd700" /> {project.stars}
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <GitFork size={14} /> {project.forks}
                        </span>
                      </div>

                      <div style={{ display: "flex", gap: 12 }}>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: 8,
                            borderRadius: 10,
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <Github size={16} />
                        </a>
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: "6px 14px",
                              borderRadius: 10,
                              background: "rgba(0, 255, 204, 0.12)",
                              border: "1px solid rgba(0, 255, 204, 0.3)",
                              color: "#00ffcc",
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            Live Demo <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

          {/* DYNAMIC GITHUB REPOS (When available) */}
          {!loading && !useFallback &&
            repos.map((repo, idx) => {
              const languages = repoLanguages[repo.id] || { TypeScript: 80, CSS: 20 };
              const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);

              return (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="pro-glass-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    textAlign: "left",
                  }}
                >
                  <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                    <img
                      src={`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo.name}/${repo.default_branch}/preview.png`}
                      alt={repo.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop";
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(13, 17, 23, 0.95) 0%, transparent 80%)",
                      }}
                    />

                    <div style={{ position: "absolute", bottom: 12, left: 20, right: 20 }}>
                      <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff" }}>
                        {repo.name}
                      </h3>
                    </div>
                  </div>

                  <div style={{ padding: 20, display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                    <div>
                      <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.5, marginBottom: 16 }}>
                        {repo.description || "Interactive full-stack web application built with modern architecture."}
                      </p>

                      {/* Language distribution */}
                      <div style={{ marginBottom: 16 }}>
                        {Object.entries(languages).slice(0, 3).map(([lang, bytes]) => {
                          const pct = totalBytes ? ((bytes / totalBytes) * 100).toFixed(0) : "50";
                          return (
                            <div key={lang} style={{ marginTop: 6 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#64748b" }}>
                                <span>{lang}</span>
                                <span>{pct}%</span>
                              </div>
                              <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden", marginTop: 2 }}>
                                <div
                                  style={{
                                    height: "100%",
                                    width: `${pct}%`,
                                    background: "#00ffcc",
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between" }}>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: "6px 14px",
                          borderRadius: 8,
                          background: "rgba(0, 255, 204, 0.1)",
                          color: "#00ffcc",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        View Repository <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
