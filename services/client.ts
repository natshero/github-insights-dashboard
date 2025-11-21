import axios from "axios";

export const githubClient = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    "User-Agent": "NextJS-GitHub-Insights",
  },
  timeout: 8000,
});
