import { createClient } from "@supabase/supabase-js"
import type { BlogPost, Project } from "@/data/data"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl !== 'https://placeholder.supabase.co' && 
                             supabaseAnonKey !== 'placeholder-key'

// Admin client with service role for backend operations
// const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Public client for frontend operations
export const supabase = isSupabaseConfigured ? 
  createClient(supabaseUrl, supabaseAnonKey) : 
  null

// Types for new entities
export interface Skill {
  id: string
  category: string
  name: string
  level: number
  icon?: string
  color?: string
  years_experience: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field_of_study?: string
  start_date: string
  end_date?: string
  is_current: boolean
  grade?: string
  description?: string
  location?: string
  logo_url?: string
  achievements?: string[]
  created_at: string
  updated_at: string
}

export interface Certification {
  id: string
  name: string
  issuing_organization: string
  issue_date: string
  expiration_date?: string
  credential_id?: string
  credential_url?: string
  description?: string
  logo_url?: string
  skills?: string[]
  is_featured: boolean
  created_at: string
  updated_at: string
}

class Database {
  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    if (!supabase) {
      // Return empty array if Supabase is not configured
      return []
    }

    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })

      if (error) throw error

      return data.map((post) => ({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        date: post.created_at.split("T")[0],
        readTime: post.read_time || "5 min read",
        category: post.category,
        author: post.author || "Qayyum",
      }))
    } catch (error) {
      console.error('Error fetching blog posts:', error)
      return []
    }
  }

  // async createBlogPost(post: Omit<BlogPost, "slug">): Promise<BlogPost> {
  //   const slug = post.title
  //     .toLowerCase()
  //     .replace(/[^a-z0-9]+/g, "-")
  //     .replace(/(^-|-$)/g, "")

  //   const { data, error } = await supabaseAdmin
  //     .from("blog_posts")
  //     .insert({
  //       title: post.title,
  //       slug,
  //       excerpt: post.excerpt,
  //       content: post.content,
  //       category: post.category,
  //       author: post.author || "Talha",
  //       read_time: post.readTime,
  //       published: true,
  //     })
  //     .select()
  //     .single()

  //   if (error) throw error

  //   return {
  //     title: data.title,
  //     slug: data.slug,
  //     excerpt: data.excerpt,
  //     content: data.content,
  //     date: data.created_at.split("T")[0],
  //     readTime: data.read_time,
  //     category: data.category,
  //     author: data.author,
  //   }
  // }

  // async updateBlogPost(slug: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  //   const { data, error } = await supabaseAdmin
  //     .from("blog_posts")
  //     .update({
  //       title: updates.title,
  //       excerpt: updates.excerpt,
  //       content: updates.content,
  //       category: updates.category,
  //       read_time: updates.readTime,
  //       updated_at: new Date().toISOString(),
  //     })
  //     .eq("slug", slug)
  //     .select()
  //     .single()

  //   if (error) return null

  //   return {
  //     title: data.title,
  //     slug: data.slug,
  //     excerpt: data.excerpt,
  //     content: data.content,
  //     date: data.created_at.split("T")[0],
  //     readTime: data.read_time,
  //     category: data.category,
  //     author: data.author,
  //   }
  // }

  // async deleteBlogPost(slug: string): Promise<boolean> {
  //   const { error } = await supabaseAdmin.from("blog_posts").delete().eq("slug", slug)
  //   return !error
  // }

  // // Projects
  // async getProjects(): Promise<Project[]> {
  //   const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  //   if (error) throw error

  //   return data.map((project) => ({
  //     title: project.title,
  //     description: project.description,
  //     tech: project.technologies || [],
  //     icon: project.icon || "Code",
  //     github: project.github_url || "",
  //     demo: project.demo_url || "",
  //     featured: project.is_featured || false,
  //   }))
  // }

  // async createProject(project: Project): Promise<Project> {
  //   const { data, error } = await supabaseAdmin
  //     .from("projects")
  //     .insert({
  //       title: project.title,
  //       description: project.description,
  //       technologies: project.tech,
  //       github_url: project.github,
  //       demo_url: project.demo,
  //       is_featured: project.featured,
  //     })
  //     .select()
  //     .single()

  //   if (error) throw error

  //   return {
  //     title: data.title,
  //     description: data.description,
  //     tech: data.technologies || [],
  //     icon: "Code",
  //     github: data.github_url || "",
  //     demo: data.demo_url || "",
  //     featured: data.is_featured || false,
  //   }
  // }

  // async updateProject(title: string, updates: Partial<Project>): Promise<Project | null> {
  //   const { data, error } = await supabaseAdmin
  //     .from("projects")
  //     .update({
  //       title: updates.title,
  //       description: updates.description,
  //       technologies: updates.tech,
  //       github_url: updates.github,
  //       demo_url: updates.demo,
  //       is_featured: updates.featured,
  //       updated_at: new Date().toISOString(),
  //     })
  //     .eq("title", title)
  //     .select()
  //     .single()

  //   if (error) return null

  //   return {
  //     title: data.title,
  //     description: data.description,
  //     tech: data.technologies || [],
  //     icon: "Code",
  //     github: data.github_url || "",
  //     demo: data.demo_url || "",
  //     featured: data.is_featured || false,
  //   }
  // }

  // async deleteProject(title: string): Promise<boolean> {
  //   const { error } = await supabaseAdmin.from("projects").delete().eq("title", title)
  //   return !error
  // }

  // Skills
  async getSkills(): Promise<Skill[]> {
    if (!supabase) {
      return []
    }

    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("category", { ascending: true })
        .order("name", { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching skills:', error)
      return []
    }
  } 

  // async createSkill(skill: Omit<Skill, "id" | "created_at" | "updated_at">): Promise<Skill> {
  //   const { data, error } = await supabaseAdmin.from("skills").insert(skill).select().single()

  //   if (error) throw error
  //   return data
  // }

  // async updateSkill(id: string, updates: Partial<Skill>): Promise<Skill | null> {
  //   const { data, error } = await supabaseAdmin
  //     .from("skills")
  //     .update({ ...updates, updated_at: new Date().toISOString() })
  //     .eq("id", id)
  //     .select()
  //     .single()

  //   if (error) return null
  //   return data
  // }

  // async deleteSkill(id: string): Promise<boolean> {
  //   const { error } = await supabaseAdmin.from("skills").delete().eq("id", id)
  //   return !error
  // }

  // Education
  async getEducation(): Promise<Education[]> {
    if (!supabase) {
      return []
    }

    try {
      const { data, error } = await supabase.from("education").select("*").order("start_date", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching education:', error)
      return []
    }
  }

  // async createEducation(education: Omit<Education, "id" | "created_at" | "updated_at">): Promise<Education> {
  //   const { data, error } = await supabaseAdmin.from("education").insert(education).select().single()

  //   if (error) throw error
  //   return data
  

  // async updateEducation(id: string, updates: Partial<Education>): Promise<Education | null> {
  //   const { data, error } = await supabaseAdmin
  //     .from("education")
  //     .update({ ...updates, updated_at: new Date().toISOString() })
  //     .eq("id", id)
  //     .select()
  //     .single()

  //   if (error) return null
  //   return data
  // }

  // async deleteEducation(id: string): Promise<boolean> {
  //   const { error } = await supabaseAdmin.from("education").delete().eq("id", id)
  //   return !error
  // } 

  // Certifications
  async getCertifications(): Promise<Certification[]> {
    if (!supabase) {
      return []
    }

    try {
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .order("issue_date", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching certifications:', error)
      return []
    }
  }

  // async createCertification(
  //   certification: Omit<Certification, "id" | "created_at" | "updated_at">,
  // ): Promise<Certification> {
  //   const { data, error } = await supabaseAdmin.from("certifications").insert(certification).select().single()

  //   if (error) throw error
  //   return data
  // }

  // async updateCertification(id: string, updates: Partial<Certification>): Promise<Certification | null> {
  //   const { data, error } = await supabaseAdmin
  //     .from("certifications")
  //     .update({ ...updates, updated_at: new Date().toISOString() })
  //     .eq("id", id)
  //     .select()
  //     .single()

  //   if (error) return null
  //   return data
  // }

  // async deleteCertification(id: string): Promise<boolean> {
  //   const { error } = await supabaseAdmin.from("certifications").delete().eq("id", id)
  //   return !error
  // }

  // Personal Info
  async getPersonalInfo(): Promise<any> {
    if (!supabase) {
      return {}
    }

    try {
      const { data, error } = await supabase.from("personal_info").select("*").single()

      if (error) return {}
      return data || {}
    } catch (error) {
      console.error('Error fetching personal info:', error)
      return {}
    }
  }

  // async savePersonalInfo(info: any): Promise<void> {
  //   const { error } = await supabaseAdmin.from("personal_info").upsert(info)

  //   if (error) throw error
  // }
}

export const db = new Database()

