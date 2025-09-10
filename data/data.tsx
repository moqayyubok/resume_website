import type React from "react"
import {
  Brain,
  Code,
  Database,
  Globe,
  Cpu,
  BarChart,
  Shield,
  MessageSquare,
  Github,
  Mail,
  Phone,
  MapPin,
  Linkedin,
} from "lucide-react"

// Types
export interface BlogPost {
  title: string
  excerpt: string
  content?: string
  date: string
  slug: string
  readTime: string
  category: string
  author?: string
}

export interface Project {
  title: string
  description: string
  tech: string[]
  icon: React.ReactNode
  github: string
  demo: string
  featured: boolean
}

export interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: string[]
}

export interface NavLink {
  href: string
  label: string
}

export interface ContactInfo {
  icon: React.ReactNode
  title: string
  value: string
  href?: string
}

export interface SocialLink {
  icon: React.ReactNode
  href: string
  label: string
}

// Navigation Data
export const navLinks: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
  { href: "/services", label: "Services" },
]

// Personal Information
export const personalInfo = {
  name: "Qayyum Bokhari",
  title: "AI & Robotics Student | Full-Stack Developer",
  description:
    "Artificial Intelligence and Robotics student at Aston University with a proven ability to design and build complex applications that integrate advanced machine learning algorithms and full software ecosystems. I bring both technical expertise and entrepreneurial drive, capable of turning ideas into fully functional, scalable systems.",
  email: "qayyumbokhari77@gmail.com",
  resumeUrl: "/Qayyum_Bokharicv.pdf",
}

// Social Links
export const socialLinks: SocialLink[] = [
  {
    icon: <Github className="w-6 h-6" />,
    href: "https://github.com/moqayyubok",
    label: "GitHub",
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    href: "https://www.linkedin.com/in/mohammad-bokhari-aa99701a6/",
    label: "LinkedIn",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    href: `mailto:${personalInfo.email}`,
    label: "Email",
  },
]

// Contact Information
export const contactInfo: ContactInfo[] = [
  {
    icon: <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  // {
  //   icon: <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
  //   title: "Phone",
  //   value: personalInfo.phone,
  //   href: `tel:${personalInfo.phone}`,
  // },
  // {
  //   icon: <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
  //   title: "Location",
  //   value: personalInfo.location,
  // },
]

// Skills Data
export const skillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    icon: <Brain className="w-8 h-8" />,
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "NLP", "Computer Vision"],
  },
  {
    title: "Robotics & Hardware",
    icon: <Cpu className="w-8 h-8" />,
    skills: ["ROS", "Arduino", "Raspberry Pi", "Sensors", "Actuators", "Embedded Systems"],
  },
  {
    title: "Full-Stack Development",
    icon: <Code className="w-8 h-8" />,
    skills: ["React", "Next.js", "Node.js", "TypeScript", "JavaScript", "REST APIs"],
  },
  {
    title: "Data Science & Analytics",
    icon: <BarChart className="w-8 h-8" />,
    skills: ["Pandas", "NumPy", "Matplotlib", "Data Visualization", "Statistical Analysis", "Jupyter"],
  },
  {
    title: "Cloud & DevOps",
    icon: <Globe className="w-8 h-8" />,
    skills: ["AWS", "Docker", "Git", "GitHub", "CI/CD", "Linux", "Version Control"],
  },
  {
    title: "Databases & Tools",
    icon: <Database className="w-8 h-8" />,
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Firebase", "Supabase", "SQL"],
  },
]

// Projects Data
export const projects: Project[] = [
  {
    title: "AI Spam Detector",
    description: "Advanced email spam detection system using machine learning algorithms with 95% accuracy rate.",
    tech: ["Python", "XGBoost", "NLP", "Flask", "React"],
    icon: <Shield className="w-8 h-8" />,
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    title: "Smart Chatbot Assistant",
    description: "Intelligent conversational AI powered by large language models with context awareness.",
    tech: ["OpenAI API", "LangChain", "Next.js", "Vector DB"],
    icon: <MessageSquare className="w-8 h-8" />,
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    title: "AI Content Generator",
    description: "Multi-modal content generation platform for blogs, social media, and marketing materials.",
    tech: ["GPT-4", "DALL-E", "React", "Node.js", "MongoDB"],
    icon: <Brain className="w-8 h-8" />,
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
  },
]

// Blog Posts Data
export const blogPosts: BlogPost[] = [
  {
    title: "Building My AI Spam Detector",
    excerpt:
      "Learn how I built an advanced spam detection system using machine learning algorithms and achieved 95% accuracy. This comprehensive guide covers data preprocessing, feature engineering, model selection, and deployment strategies.",
    date: "2025-01-05",
    slug: "building-ai-spam-detector",
    readTime: "8 min read",
    category: "Machine Learning",
    author: "Qayyum",
    content: `
# Building My AI Spam Detector

In this comprehensive guide, I'll walk you through the process of building an advanced spam detection system using machine learning algorithms. This project achieved a 95% accuracy rate and demonstrates practical applications of natural language processing and classification algorithms.

## The Problem

Email spam continues to be a significant issue, with billions of spam emails sent daily. Traditional rule-based filters often fail to catch sophisticated spam attempts while sometimes flagging legitimate emails as spam.

## Approach

I decided to use a machine learning approach that combines multiple techniques:

### 1. Data Collection and Preprocessing

First, I gathered a diverse dataset of emails, including both spam and legitimate messages. The preprocessing steps included:

- Text cleaning and normalization
- Removing HTML tags and special characters
- Tokenization and stemming
- Feature extraction using TF-IDF

### 2. Feature Engineering

Key features that proved most effective:

- **Text Features**: TF-IDF vectors, n-grams
- **Metadata Features**: Email length, number of links, sender reputation
- **Linguistic Features**: Sentiment analysis, readability scores

### 3. Model Selection

I experimented with several algorithms:

- **Naive Bayes**: Great baseline performance
- **Random Forest**: Good feature importance insights
- **XGBoost**: Best overall performance
- **Neural Networks**: Competitive but more complex

## Implementation

Here's a simplified version of the core classification logic:

\`\`\`python
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Load and preprocess data
def preprocess_text(text):
    # Text cleaning logic here
    return cleaned_text

# Feature extraction
vectorizer = TfidfVectorizer(max_features=5000, stop_words='english')
X = vectorizer.fit_transform(emails['text'])
y = emails['is_spam']

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = XGBClassifier()
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f"Accuracy: {accuracy:.2%}")
\`\`\`

## Results

The final model achieved:

- **95% accuracy** on the test set
- **Low false positive rate** (< 2%)
- **Fast inference time** (< 100ms per email)

## Deployment

I deployed the model using Flask and Docker, creating a REST API that can process emails in real-time. The system includes:

- API endpoints for single and batch processing
- Model versioning and A/B testing capabilities
- Monitoring and logging for production use

## Lessons Learned

1. **Data quality matters more than quantity**
2. **Feature engineering is crucial for NLP tasks**
3. **Regular model retraining is essential**
4. **Production deployment requires careful monitoring**

## Next Steps

Future improvements could include:

- Multi-language support
- Real-time learning from user feedback
- Integration with popular email clients
- Advanced deep learning models

This project demonstrates the practical application of machine learning in solving real-world problems. The combination of proper data preprocessing, thoughtful feature engineering, and robust model selection led to a highly effective spam detection system.
    `,
  },
  {
    title: "Getting Started with LangChain",
    excerpt:
      "A comprehensive guide to building AI applications with LangChain and large language models. Explore chains, agents, memory, and vector stores to create powerful AI-driven applications.",
    date: "2025-01-03",
    slug: "getting-started-langchain",
    readTime: "12 min read",
    category: "AI Development",
    author: "Qayyum",
    content: `
# Getting Started with LangChain

LangChain is a powerful framework for developing applications powered by language models. In this guide, we'll explore how to build sophisticated AI applications using LangChain's core components.

## What is LangChain?

LangChain is a framework designed to simplify the creation of applications using large language models (LLMs). It provides a standard interface for chains, agents, and memory, making it easier to build complex AI applications.

## Core Components

### 1. Chains
Chains are the core of LangChain. They combine multiple components to create a sequence of operations.

### 2. Agents
Agents use LLMs to determine which actions to take and in what order.

### 3. Memory
Memory gives LLMs the ability to remember previous interactions.

### 4. Vector Stores
Vector stores allow you to store and search through unstructured data.

## Getting Started

Let's build a simple question-answering system using LangChain.

This guide covers the fundamentals of building AI applications with LangChain and provides practical examples for getting started.
    `,
  },
  {
    title: "Next.js 15 Features You Should Know",
    excerpt:
      "Exploring the latest features in Next.js 15 and how they can improve your web development workflow. From improved performance to new developer experience enhancements.",
    date: "2025-01-01",
    slug: "nextjs-15-features",
    readTime: "6 min read",
    category: "Web Development",
    author: "Qayyum",
    content: `
# Next.js 15 Features You Should Know

Next.js 15 brings exciting new features and improvements that enhance both developer experience and application performance. Let's explore the key updates.

## New Features

### 1. Improved App Router
The App Router continues to evolve with better performance and new capabilities.

### 2. Enhanced Server Components
Server Components now offer better streaming and improved performance.

### 3. Better TypeScript Support
Enhanced TypeScript integration with improved type checking and IntelliSense.

## Performance Improvements

Next.js 15 includes significant performance optimizations that make applications faster and more efficient.

This overview covers the most important features and improvements in Next.js 15.
    `,
  },
  {
    title: "Vector Databases for AI Applications",
    excerpt:
      "Understanding vector databases and their role in modern AI applications. Learn about embeddings, similarity search, and how to choose the right vector database for your project.",
    date: "2024-12-28",
    slug: "vector-databases-ai",
    readTime: "10 min read",
    category: "AI Development",
    author: "Qayyum",
    content: `
# Vector Databases for AI Applications

Vector databases are becoming increasingly important in the AI landscape. This guide explains what they are and how to use them effectively.

## What are Vector Databases?

Vector databases are specialized databases designed to store and query high-dimensional vectors efficiently.

## Use Cases

- Semantic search
- Recommendation systems
- RAG applications
- Image similarity search

## Popular Vector Databases

- Pinecone
- Weaviate
- Chroma
- Qdrant

This comprehensive guide covers everything you need to know about vector databases for AI applications.
    `,
  },
  {
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt:
      "Master the art of creating beautiful, responsive user interfaces with Tailwind CSS. Tips, tricks, and best practices for modern web design.",
    date: "2024-12-25",
    slug: "responsive-ui-tailwind",
    readTime: "7 min read",
    category: "Web Development",
    author: "Qayyum",
    content: `
# Building Responsive UIs with Tailwind CSS

Tailwind CSS makes it easy to build responsive, beautiful user interfaces. This guide covers best practices and advanced techniques.

## Responsive Design Principles

- Mobile-first approach
- Flexible layouts
- Scalable typography
- Optimized images

## Tailwind CSS Features

- Utility-first approach
- Responsive modifiers
- Dark mode support
- Custom components

## Best Practices

Learn the best practices for building maintainable and scalable UIs with Tailwind CSS.
    `,
  },
]

// Blog Categories
export const blogCategories = ["All", "Machine Learning", "AI Development", "Web Development"]

// Education Data
export const educationData = [
  {
    institution: "Aston University",
    degree: "Bachelor of Science in Artificial Intelligence and Robotics",
    location: "Birmingham, UK",
    status: "Current Student",
    expectedGraduation: "2027",
    description: "Studying cutting-edge AI and robotics technologies, focusing on machine learning, computer vision, and autonomous systems.",
    highlights: [
      "Machine Learning and RAG (Retrieval-Augmented Generation) coursework",
      "Experience with Design Factory Birmingham",
      "Full-stack development projects using Laravel and Django frameworks",
      "Integration of AI algorithms with robotics applications"
    ]
  }
]

// Certifications Data
export const certificationsData = [
  {
    name: "Machine Learning Course (RAG)",
    status: "Currently Pursuing",
    description: "Advanced studies in Retrieval-Augmented Generation and machine learning applications",
    skills: ["Machine Learning", "RAG", "AI Applications"]
  }
]

// Statistics
export const stats = [
  {
    value: "50+",
    label: "Projects Completed",
  },
  {
    value: "3+",
    label: "Years Experience",
  },
]

// AI Chat Responses
export const aiChatResponses = [
  "That's a great question! Qayyum specializes in AI, robotics and machine learning projects.",
  "I'd be happy to tell you more about Qayyum's experience with robotics, AI and full-stack development.",
  "Qayyum has worked on various projects integrating AI, robotics and full-stack development.",
  "Feel free to check out the projects section to see Qayyum's latest work!",
  "Qayyum is passionate about building intelligent systems, robotics applications and scalable solutions.",
  "You can find more details about Qayyum's skills in the skills section above.",
]

// Footer Links
export const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
]

// Services
export const services = ["AI Development", "Web Development", "Machine Learning", "Consulting"]

// Helper Functions
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug)
}

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((project) => project.featured)
}

export const getLatestBlogPosts = (limit = 3): BlogPost[] => {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit)
}

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  if (category === "All") return blogPosts
  return blogPosts.filter((post) => post.category === category)
}
