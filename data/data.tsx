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
  title: "AI and Software Engineer",
  description:
    "Full-Stack Developer transitioning to AI Engineering with hands-on experience building production ML systems. Delivered 23% reduction in client return rates through predictive analytics and developed AI-powered applications using OpenAI API, Hugging Face Transformers, and Django. Currently pursuing BSc in AI & Robotics at Aston University (2024-2027) while building intelligent web applications. Seeking junior AI engineer roles to combine software engineering expertise with machine learning implementation.",
  email: "qayyumbokhari77@gmail.com",
  phone: "07743827727",
  location: "406 Kingstanding Road, B448LD",
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
    href: "https://www.linkedin.com/in/mohammad-bokhari-aa99701a6",
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
    title: "Core Languages",
    icon: <Code className="w-8 h-8" />,
    skills: ["Python", "JavaScript (ES6+)", "PHP", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Backend Frameworks",
    icon: <Database className="w-8 h-8" />,
    skills: ["Django", "Flask", "Laravel", "Node.js"],
  },
  {
    title: "Frontend",
    icon: <Globe className="w-8 h-8" />,
    skills: ["React", "jQuery", "Bootstrap", "Tailwind CSS"],
  },
  {
    title: "AI/ML",
    icon: <Brain className="w-8 h-8" />,
    skills: ["TensorFlow", "Hugging Face Transformers", "OpenAI API", "Scikit-learn"],
  },
  {
    title: "Databases",
    icon: <Database className="w-8 h-8" />,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
  },
  {
    title: "DevOps & Cloud",
    icon: <Shield className="w-8 h-8" />,
    skills: ["Docker", "Git", "GitHub", "CI/CD", "Jenkins", "Linux", "AWS (EC2, S3, RDS)", "Vercel", "Heroku"],
  },
]

// Projects Data
export const projects: Project[] = [
  {
    title: "AI-Powered CV Chatbot",
    description: "Intelligent chatbot using Retrieval-Augmented Generation (RAG) architecture to provide context-aware responses about CV content. Integrated OpenAI GPT-3.5 API and Llama 2 via Hugging Face Transformers. Achieved 92% response accuracy with FAISS vector database.",
    tech: ["Python", "Django", "OpenAI API", "Hugging Face", "FAISS", "AWS EC2", "Docker"],
    icon: <Brain className="w-8 h-8" />,
    github: "https://github.com/moqayyubok",
    demo: "https://royaltap.shop/",
    featured: true,
  },
  {
    title: "DF Baston Inventory UK",
    description: "Comprehensive inventory management system with real-time tracking, reducing stock discrepancies by 45% and saving 12 hours/week in manual processes. Implemented RESTful APIs and JWT authentication.",
    tech: ["Django", "Laravel", "PostgreSQL", "MySQL", "Redis", "Docker", "CI/CD"],
    icon: <Database className="w-8 h-8" />,
    github: "https://github.com/moqayyubok",
    demo: "https://www.dfbastoninventory.co.uk/",
    featured: true,
  },
  {
    title: "Retro App - Team Collaboration Platform",
    description: "Secure team collaboration application enabling cross-functional teams to work together. Optimized database queries and implemented Redis caching, improving response time by 60% (2.1s → 0.8s).",
    tech: ["Django", "PostgreSQL", "Redis", "JWT", "REST API", "Docker"],
    icon: <Code className="w-8 h-8" />,
    github: "https://github.com/moqayyubok",
    demo: "#",
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
    title: "Building DF Baston Inventory System",
    excerpt:
      "A comprehensive look at developing a full-stack inventory management system with real-time tracking, user authentication, and dashboard analytics. Learn about the architecture, challenges, and solutions implemented.",
    date: "2025-01-10",
    slug: "building-df-baston-inventory-system",
    readTime: "12 min read",
    category: "Web Development",
    author: "Qayyum",
    content: `
# Building DF Baston Inventory System

The DF Baston Inventory System represents a comprehensive solution for modern inventory management, combining real-time tracking, robust authentication, and powerful analytics in a full-stack web application.

## Project Overview

The DF Baston Inventory System was designed to solve common inventory management challenges faced by businesses of all sizes. The system provides:

- **Real-time inventory tracking** with instant updates
- **User authentication and role-based access control**
- **Comprehensive dashboard analytics** with visual charts
- **Multi-location inventory management**
- **Automated low-stock alerts and notifications**

## Technical Architecture

### Frontend Development
The frontend was built using React.js with a focus on user experience and performance:

- **React.js** for the user interface with functional components and hooks
- **Chart.js** for data visualization and analytics dashboards
- **Responsive design** ensuring compatibility across all devices
- **Real-time updates** using WebSocket connections for live inventory changes

### Backend Infrastructure
The backend provides a robust API and data management layer:

- **Node.js with Express.js** for the server framework
- **MongoDB** as the primary database for flexible data storage
- **JWT authentication** for secure user sessions
- **RESTful API design** for clear and maintainable endpoints

### Key Features Implemented

#### 1. Real-Time Inventory Tracking
${'```'}javascript
// Real-time inventory updates using WebSocket
const updateInventory = (itemId, newQuantity) => {
  io.emit('inventoryUpdate', {
    itemId,
    quantity: newQuantity,
    timestamp: new Date()
  });
};
${'```'}

#### 2. User Authentication System
- Secure login/logout functionality
- Role-based permissions (Admin, Manager, Staff)
- Password encryption using bcrypt
- JWT token-based session management

#### 3. Dashboard Analytics
The analytics dashboard provides:
- **Inventory value tracking** over time
- **Stock movement patterns** and trends
- **Low stock alerts** and recommendations
- **Sales performance metrics** with visual charts

## Development Challenges and Solutions

### Challenge 1: Real-Time Updates
**Problem**: Ensuring all users see inventory changes immediately
**Solution**: Implemented WebSocket connections for real-time data synchronization

### Challenge 2: Data Consistency
**Problem**: Preventing inventory conflicts during concurrent updates
**Solution**: Used MongoDB transactions and optimistic locking

### Challenge 3: Performance Optimization
**Problem**: Handling large datasets efficiently
**Solution**: Implemented pagination, indexing, and data caching strategies

## Deployment and Infrastructure

The system is deployed with:
- **Frontend hosting** on modern CDN for fast global access
- **Backend API** on cloud infrastructure with auto-scaling
- **Database** with automated backups and replica sets
- **SSL encryption** for secure data transmission

## Live Demo Features

Visit [dfbastoninventory.xyz](https://dfbastoninventory.xyz/) to explore:

1. **Dashboard Overview**: Real-time inventory metrics and charts
2. **Product Management**: Add, edit, and track inventory items
3. **User Management**: Role-based access control demonstration
4. **Reports**: Generate detailed inventory and sales reports
5. **Mobile Responsive**: Full functionality on mobile devices

## Lessons Learned

Building this inventory system taught valuable lessons about:

1. **Database Design**: Proper schema design for scalability
2. **Real-Time Systems**: Handling concurrent users and data updates
3. **User Experience**: Creating intuitive interfaces for complex data
4. **Security**: Implementing proper authentication and authorization
5. **Performance**: Optimizing for large datasets and high traffic

## Future Enhancements

Planned improvements include:
- **Barcode scanning** integration for mobile devices
- **Automated supplier ordering** based on stock levels
- **Advanced reporting** with custom date ranges
- **Multi-language support** for international users
- **API integrations** with popular e-commerce platforms

The DF Baston Inventory System demonstrates practical application of modern web development technologies to solve real business problems while maintaining high standards for user experience and system reliability.
    `,
  },
  {
    title: "DF Baston Inventory UK: Enhanced Features and Localization",
    excerpt:
      "Exploring the UK-specific version of the inventory system with enhanced features, localized settings, and advanced reporting capabilities. A deep dive into internationalization and regional customization.",
    date: "2025-01-08",
    slug: "df-baston-inventory-uk-enhanced-features",
    readTime: "10 min read",
    category: "Web Development",
    author: "Qayyum",
    content: `
# DF Baston Inventory UK: Enhanced Features and Localization

The UK version of the DF Baston Inventory System represents an evolution of the original platform, incorporating region-specific features, enhanced functionality, and improved user experience tailored for the UK market.

## What Makes the UK Version Different

### Localization Features
- **Currency Support**: Full GBP integration with proper formatting
- **Date Formats**: UK date standards (DD/MM/YYYY)
- **VAT Calculations**: Automatic VAT handling for UK tax requirements
- **Address Formatting**: UK postcode validation and formatting
- **Time Zones**: GMT/BST automatic adjustment

### Enhanced Analytics
The UK version includes advanced reporting features:

#### Financial Reporting
- **VAT reports** for HMRC compliance
- **Profit margins** with UK tax considerations
- **Monthly/Quarterly summaries** aligned with UK business cycles
- **Export functionality** for accounting software integration

#### Advanced Dashboard
${'```'}javascript
// Enhanced UK-specific dashboard metrics
const ukDashboardMetrics = {
  totalValue: formatGBP(inventoryValue),
  vatLiability: calculateVAT(sales),
  profitMargin: calculateUKProfitMargin(sales, costs),
  compliance: checkHMRCCompliance(records)
};
${'```'}

## Technical Enhancements

### Improved Architecture
The UK version features:

1. **Microservices Architecture**: Better scalability and maintenance
2. **Advanced Caching**: Redis integration for improved performance
3. **Enhanced Security**: Additional layers for data protection
4. **API Rate Limiting**: Protection against abuse and overuse

### New Features

#### Multi-Warehouse Management
- **Location-specific tracking** across multiple UK warehouses
- **Transfer management** between locations
- **Regional stock allocation** based on demand patterns
- **Shipping cost calculations** for UK postal codes

#### Advanced User Roles
- **Warehouse Manager**: Location-specific permissions
- **Financial Controller**: Access to VAT and financial reports
- **Regional Manager**: Multi-location oversight
- **Auditor**: Read-only access for compliance checks

## Performance Optimizations

### Database Improvements
- **Indexed queries** for faster data retrieval
- **Partitioning** for large historical datasets
- **Automated archiving** of old records
- **Backup strategies** with UK data residency requirements

### Frontend Enhancements
- **Lazy loading** for better initial page performance
- **Progressive Web App** features for offline functionality
- **Optimized bundling** reducing load times by 40%
- **Image optimization** with WebP format support

## UK-Specific Integrations

### Third-Party Services
- **Royal Mail API** for shipping calculations
- **HMRC MTD** readiness for Making Tax Digital
- **UK banking APIs** for payment processing
- **Companies House** integration for business verification

### Compliance Features
- **GDPR compliance** with data protection controls
- **Audit trails** for all system changes
- **Data retention policies** according to UK regulations
- **Secure data export** for compliance requests

## Live Demo Highlights

Visit [dfbastoninventory.co.uk](https://www.dfbastoninventory.co.uk/) to experience:

1. **UK Dashboard**: Localized metrics with GBP currency
2. **VAT Management**: Automatic VAT calculations and reporting
3. **Multi-Location**: Warehouse management across UK regions
4. **Compliance Tools**: HMRC-ready reporting features
5. **Enhanced Analytics**: Advanced business intelligence tools

## Development Process

### Challenges Overcome
1. **Data Migration**: Seamlessly upgrading from the original system
2. **Regulatory Compliance**: Meeting UK business and tax requirements
3. **Performance Scaling**: Handling increased user load and data volume
4. **Feature Parity**: Maintaining existing functionality while adding new features

### Testing Strategy
- **Unit testing** with 95% code coverage
- **Integration testing** for all third-party services
- **User acceptance testing** with UK-based businesses
- **Performance testing** under realistic load conditions

## Technical Stack Evolution

### Backend Improvements
- **Node.js 18+** with latest performance optimizations
- **Express.js** with enhanced middleware for security
- **MongoDB 6.0** with improved aggregation pipelines
- **Redis** for caching and session management

### Frontend Modernization
- **React 18** with concurrent features
- **TypeScript** for better code quality and developer experience
- **Tailwind CSS** for consistent and maintainable styling
- **Chart.js 4.0** for enhanced data visualization

## Deployment and DevOps

### Infrastructure
- **AWS UK regions** for data residency compliance
- **Auto-scaling groups** for handling traffic spikes
- **CloudWatch monitoring** with UK business hours alerting
- **Automated backups** with 30-day retention

### CI/CD Pipeline
- **GitHub Actions** for automated testing and deployment
- **Staging environment** for pre-production testing
- **Blue-green deployment** for zero-downtime updates
- **Rollback capabilities** for quick issue resolution

## Impact and Results

The UK version has delivered significant improvements:

- **50% faster load times** compared to the original
- **99.9% uptime** since launch
- **Increased user satisfaction** with localized features
- **HMRC compliance** ready for Making Tax Digital

## Future Roadmap

Upcoming features for the UK version:
- **AI-powered demand forecasting** using UK market data
- **Automated supplier integration** with major UK wholesalers
- **Mobile app** for warehouse staff and managers
- **Advanced analytics** with machine learning insights
- **Brexit-related features** for international trade management

The DF Baston Inventory UK system demonstrates how localization and continuous improvement can transform a good system into an exceptional one, tailored specifically for regional business needs while maintaining global standards of quality and performance.
    `,
  },
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
