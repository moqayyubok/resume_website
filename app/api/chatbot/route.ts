import { NextResponse } from "next/server";
import { dataFetcher } from "@/lib/data-fetcher";
import { personalInfo, skillCategories, projects, blogPosts, educationData, certificationsData } from "@/data/data";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OpenRouter API key not set." }, { status: 500 });
    }

    // Fetch portfolio data to provide context to the AI
    let portfolioData;
    try {
      portfolioData = await dataFetcher.getAllData();
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      // Fallback to static data if database fetch fails
      portfolioData = {
        skills: [],
        education: [],
        certifications: [],
        blogPosts,
        projects,
        personalInfo,
        lastUpdated: new Date().toISOString(),
        
      };
    }

    // Create a comprehensive context about Qayyum's portfolio
    const portfolioContext = `
You are Qayyum's AI assistant for his portfolio website. You have access to comprehensive information about Qayyum's background, skills, projects, education, and certifications. Use this information to answer questions accurately and helpfully.

PERSONAL INFORMATION:
- Name: ${personalInfo.name}
- Title: ${personalInfo.title}
- Description: ${personalInfo.description}
- Email: ${personalInfo.email}

SKILLS AND EXPERTISE:
${skillCategories.map(category => `
${category.title}:
${category.skills.join(", ")}
`).join("")}

DATABASE SKILLS (from live data):
${portfolioData.skills.map(skill => `
- ${skill.name} (${skill.category}) - ${skill.years_experience} years experience, Level: ${skill.level}/10
`).join("")}

EDUCATION:
${educationData.map(edu => `
- ${edu.degree} from ${edu.institution}, ${edu.location}
  Status: ${edu.status} (Expected graduation: ${edu.expectedGraduation})
  Description: ${edu.description}
  Key Highlights:
${edu.highlights.map(highlight => `    • ${highlight}`).join('\n')}
`).join("")}

DATABASE EDUCATION (from live data):
${portfolioData.education.map(edu => `
- ${edu.degree} in ${edu.field_of_study || 'N/A'} from ${edu.institution} (${edu.start_date} - ${edu.end_date || 'Present'})
  ${edu.description ? `Description: ${edu.description}` : ''}
  ${edu.grade ? `Grade: ${edu.grade}` : ''}
`).join("")}

CERTIFICATIONS & CURRENT STUDIES:
${certificationsData.map(cert => `
- ${cert.name} (${cert.status})
  Description: ${cert.description}
  Skills: ${cert.skills.join(", ")}
`).join("")}

DATABASE CERTIFICATIONS (from live data):
${portfolioData.certifications.map(cert => `
- ${cert.name} from ${cert.issuing_organization} (Issued: ${cert.issue_date})
  ${cert.description ? `Description: ${cert.description}` : ''}
  ${cert.credential_url ? `Credential URL: ${cert.credential_url}` : ''}
`).join("")}

FEATURED PROJECTS:
${projects.filter(p => p.featured).map(project => `
- ${project.title}: ${project.description}
  Technologies: ${project.tech.join(", ")}
  GitHub: ${project.github}
  Demo: ${project.demo}
`).join("")}

RECENT BLOG POSTS:
${portfolioData.blogPosts.slice(0, 3).map(post => `
- ${post.title} (${post.category}) - ${post.date}
  ${post.excerpt}
`).join("")}

GUIDELINES:
1. Answer questions based on the provided portfolio data
2. Be helpful and informative about Qayyum's skills, experience, and projects
3. If asked about contact information, provide the email: ${personalInfo.email}
4. If asked about specific projects, provide details from the projects list
5. For technical questions, reference Qayyum's relevant skills and experience
6. Keep responses concise but informative
7. If you don't have specific information, acknowledge it and suggest contacting Qayyum directly
8. Always maintain a professional and friendly tone
9. Focus on publicly available information only - no private or sensitive data
`;

    // Add the portfolio context as a system message
    const messagesWithContext = [
      {
        role: "system",
        content: portfolioContext
      },
      ...messages
    ];

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-site-url.com";
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Qayyum Portfolio";
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": siteUrl,
        "X-Title": siteName,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        messages: messagesWithContext,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Chatbot API error:", error);
    return NextResponse.json({ error: error?.message || String(error) || "Unknown error" }, { status: 500 });
  }
}
