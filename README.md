# Playwright E2E Test Suite (Docker & GitHub Actions)

A containerized, cross-browser End-to-End (E2E) testing framework built with **Playwright**, **TypeScript**, **Docker**, and automated with **GitHub Actions**.

---

## 🚀 Key Features

- **Cross-Browser Testing:** Validates scenarios across Chromium, Firefox, and WebKit engines simultaneously.
- **Docker Integration:** Runs tests in a completely isolated, reproducible environment matching CI using official Playwright base images.
- **Automated CI/CD Pipeline:** GitHub Actions pipeline validates runs inside an isolated Docker container.
- **Anti-Bot Resilient Tests:** Implements real-world user interactions avoiding common headless browser automation blocks.

---

## 🛠️ Tech Stack & Setup

### 1. Framework Infrastructure

- **Core:** [Playwright](https://playwright.dev/) + TypeScript
- **Target App/Test:** Wikipedia search validation (designed to verify input fields, form submission, dynamic routing, and page elements).

### 2. Docker Architecture

The container setup relies on two main components:

- **[Dockerfile](file:///Users/sakthivelnathan/Code/Docker-Playwright/Dockerfile):** Builds on top of `mcr.microsoft.com/playwright:v1.44.0-jammy` to skip manual browser binary downloads (`PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`) and packages the source code.
- **[.dockerignore](file:///Users/sakthivelnathan/Code/Docker-Playwright/.dockerignore):** Keeps the Docker context lightweight by ignoring folders like `node_modules/`, `playwright-report/`, and `test-results/`.

### 3. CI/CD Workflow (GitHub Actions)

Located in **[.github/workflows/playwright.yml](file:///Users/sakthivelnathan/Code/Docker-Playwright/.github/workflows/playwright.yml)**, the pipeline automatically runs on every `push` or `pull_request` to the main branches:

- **playwright-docker Job:** Builds the Docker image from the project's custom `Dockerfile` and runs the test suite inside the container to ensure the environment is fully verified in isolation.
- **Artifacts:** HTML reports and test results from the Docker execution are copied out and uploaded as run artifacts for debugging.

---

## 💻 Local Quickstart

### Prerequisites

- Node.js (v18+)
- Docker (optional, for container tests)

### Running with Docker

1. Build the docker image:
   ```bash
   docker build -t playwright-tests .
   ```
2. Run the test suite inside the container:
   ```bash
   docker run --rm playwright-tests
   ```

---

## 📂 Project Structure

```
├── .github/workflows/
│   └── playwright.yml         # GitHub Actions pipeline
├── tests/
│   └── duckduckgo-search.spec.ts  # E2E test specs (Wikipedia search)
├── Dockerfile                  # Container instructions
├── .dockerignore               # Container file exclusions
├── .gitignore                  # Git file exclusions
├── playwright.config.ts        # Playwright run configuration
├── package.json                # Project scripts & dependencies
└── tsconfig.json               # TypeScript config compiler settings
```
