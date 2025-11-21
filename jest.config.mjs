// jest.config.mjs
import nextJest from "next/jest.js";

/**
 * Integra o Jest com o ambiente do Next (App Router, TS, CSS, etc.).
 */
const createJestConfig = nextJest({
  dir: "./", // raiz do projeto
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
};

export default createJestConfig(config);
