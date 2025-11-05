import { promises as fs } from "fs"
import path from "path"
import type { BlogPost, Project, SkillCategory } from "@/data/data"

const DATA_DIR = path.join(process.cwd(), "data", "db")

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

// Generic database operations
class JsonDB {
  private async readFile<T>(filename: string): Promise<T[]> {
    await ensureDataDir()
    const filePath = path.join(DATA_DIR, `${filename}.json`)

    try {
      const data = await fs.readFile(filePath, "utf-8")
      return JSON.parse(data)
    } catch {
      return []
    }
  }

  private async writeFile<T>(filename: string, data: T[]): Promise<void> {
    await ensureDataDir()
    const filePath = path.join(DATA_DIR, `${filename}.json`)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return this.readFile<BlogPost>("blog-posts")
  }

  async saveBlogPosts(posts: BlogPost[]): Promise<void> {
    await this.writeFile("blog-posts", posts)
  }

  async createBlogPost(post: Omit<BlogPost, "slug">): Promise<BlogPost> {
    const posts = await this.getBlogPosts()
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    const newPost: BlogPost = { ...post, slug }
    posts.push(newPost)
    await this.saveBlogPosts(posts)
    return newPost
  }

  async updateBlogPost(slug: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const posts = await this.getBlogPosts()
    const index = posts.findIndex((p) => p.slug === slug)

    if (index === -1) return null

    posts[index] = { ...posts[index], ...updates }
    await this.saveBlogPosts(posts)
    return posts[index]
  }

  async deleteBlogPost(slug: string): Promise<boolean> {
    const posts = await this.getBlogPosts()
    const filteredPosts = posts.filter((p) => p.slug !== slug)

    if (filteredPosts.length === posts.length) return false

    await this.saveBlogPosts(filteredPosts)
    return true
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.readFile<Project>("projects")
  }

  async saveProjects(projects: Project[]): Promise<void> {
    await this.writeFile("projects", projects)
  }

  async createProject(project: Project): Promise<Project> {
    const projects = await this.getProjects()
    projects.push(project)
    await this.saveProjects(projects)
    return project
  }

  async updateProject(title: string, updates: Partial<Project>): Promise<Project | null> {
    const projects = await this.getProjects()
    const index = projects.findIndex((p) => p.title === title)

    if (index === -1) return null

    projects[index] = { ...projects[index], ...updates }
    await this.saveProjects(projects)
    return projects[index]
  }

  async deleteProject(title: string): Promise<boolean> {
    const projects = await this.getProjects()
    const filteredProjects = projects.filter((p) => p.title !== title)

    if (filteredProjects.length === projects.length) return false

    await this.saveProjects(filteredProjects)
    return true
  }

  // Skills
  async getSkills(): Promise<SkillCategory[]> {
    return this.readFile<SkillCategory>("skills")
  }

  async saveSkills(skills: SkillCategory[]): Promise<void> {
    await this.writeFile("skills", skills)
  }

  // Personal Info
  async getPersonalInfo(): Promise<any> {
    const data = await this.readFile<any>("personal-info")
    return data[0] || {}
  }

  async savePersonalInfo(info: any): Promise<void> {
    await this.writeFile("personal-info", [info])
  }

  // Contact Messages
  async getContactMessages(): Promise<any[]> {
    return this.readFile<any>("contact-messages")
  }

  async saveContactMessages(messages: any[]): Promise<void> {
    await this.writeFile("contact-messages", messages)
  }

  async createContactMessage(message: any): Promise<any> {
    const messages = await this.getContactMessages()
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      read: false,
    }
    messages.push(newMessage)
    await this.saveContactMessages(messages)
    return newMessage
  }
}

export const db = new JsonDB()
