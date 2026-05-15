import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const githubBase = repoName ? `/${repoName}/` : '/'

export default defineConfig({
  plugins: [vue()],
  base: process.env.GITHUB_ACTIONS ? githubBase : '/'
})
