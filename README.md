# 🚀 Welcome! Follow these steps to run the project smoothly!

Clone the repository:

```bash
git clone https://github.com/alejandronoss1017/dev-hub.git
```

Navigate to the project directory:

```bash
cd dev-hub
```

## 🛠️ Environment Setup

Before running Docker Compose, make sure to set up the environment variables for your system:

For Windows PowerShell 🪟:
```bash
$env:COMPOSE_EXPERIMENTAL_GIT_REMOTE=1
```
For Linux 🐧:
```bash
export COMPOSE_EXPERIMENTAL_GIT_REMOTE=1
```
## 🐳 Docker Compose

Run the following command to start the docker compose:

```bash
docker compose -f compose.backend.yaml up -d     
```
### 🖥️ Running the Frontend Locally

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.