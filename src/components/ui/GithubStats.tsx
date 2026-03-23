"use client";

import React, { useEffect, useState } from "react";
import { Github, Star, GitCommit, GitPullRequest, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, hoverLift } from "@/lib/animations";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cyberAudio } from "@/lib/audio";

interface GithubData {
  followers: number;
  public_repos: number;
  login: string;
  avatar_url: string;
}

interface RepoData {
  id: number;
  name: string;
  updated_at: string;
  stargazers_count: number;
  html_url: string;
  description: string;
}

export default function GithubStats() {
  const [user, setUser] = useState<GithubData | null>(null);
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState(true);
  const addToHistory = usePortfolioStore(state => state.addToHistory);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/joaofelipe-freitas"),
          fetch("https://api.github.com/users/joaofelipe-freitas/repos?sort=updated&per_page=3")
        ]);

        if (userRes.ok && reposRes.ok) {
          setUser(await userRes.json());
          setRepos(await reposRes.json());
        }
      } catch (error) {
        console.error("Failed to fetch Github data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRepoClick = (repo: RepoData) => {
    cyberAudio.playClick();
    addToHistory({ command: `git clone https://github.com/joaofelipe-freitas/${repo.name}.git` });
    setTimeout(() => {
      cyberAudio.playSuccess();
      addToHistory({
        output: `[+] Cloning into '${repo.name}'...\n[+] remote: Enumerating objects: 100% (done)\n[+] Checking out files: 100% (done)\n[SUCCESS] Repository synchronized with local dashboard.`,
        isSystem: true
      });
      window.open(repo.html_url, "_blank");
    }, 800);
  };

  if (loading || !user) {
    return (
      <div className="w-full flex justify-center py-8">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
          <Activity className="text-brand-neon" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full mt-8 border-t border-white/5 pt-8">
      <div className="flex items-center gap-2 mb-6 text-brand-heading">
        <Github className="text-white" size={24} />
        <h3 className="text-xl font-bold font-mono uppercase tracking-widest">Live GitHub Telemetry</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* User Card */}
        <motion.div 
          className="bg-brand-surface-light border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center min-w-[200px]"
          variants={fadeInUp}
        >
          <img src={user.avatar_url} alt="GitHub Avatar" className="w-20 h-20 rounded-full border-2 border-brand-neon mb-4" />
          <div className="text-brand-heading font-bold">@{user.login}</div>
          <div className="text-sm text-brand-text flex gap-4 mt-2">
            <span className="flex items-center gap-1"><GitCommit size={14} /> {user.public_repos} Repos</span>
            <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400" /> {user.followers} Follows</span>
          </div>
        </motion.div>

        {/* Latest Activity Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, i) => (
            <motion.div
              key={repo.id}
              className="bg-brand-surface-light border border-white/5 rounded-xl p-4 flex flex-col cursor-pointer group"
              variants={fadeInUp}
              whileHover={hoverLift}
              onClick={() => handleRepoClick(repo)}
              title={`Acessar repositório: ${repo.name}`}
            >
              <div className="flex justify-between items-start mb-2">
                <GitPullRequest size={16} className="text-brand-cyan group-hover:text-brand-neon transition-colors" />
                {repo.stargazers_count > 0 && (
                  <span className="flex items-center gap-1 text-xs text-yellow-400">
                    <Star size={12} fill="currentColor" /> {repo.stargazers_count}
                  </span>
                )}
              </div>
              <h4 className="font-bold text-white text-sm md:text-base break-all mb-1">{repo.name}</h4>
              <p className="text-xs text-brand-text/70 line-clamp-2 mb-3 flex-1">{repo.description || "Sem descrição."}</p>
              
              <div className="text-[10px] text-brand-text font-mono mt-auto opacity-50">
                LATEST_PUSH: {new Date(repo.updated_at).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
