import { useEffect, useRef, useState } from 'react'
import { portfolioFaqs, projects } from './portfolio-data'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  suggestions?: string[]
}

const welcomeMessage: ChatMessage = {
  role: 'assistant',
  content: 'Hi, I’m Dismas’ portfolio guide. Choose a question below to learn about his background, design approach, and selected projects.',
}

const projectAliases: Record<string, string[]> = {
  DP: ['drive point', 'drivepoint'],
  PN: ['pinn'],
  DJ: ['desire journeys'],
  IE: ['ironwood'],
  SA: ['st ambrose', 'ambrose parish'],
  XX: ['selected experiments', 'experiments'],
}

function normalizeQuestion(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function findPortfolioFaq(question: string) {
  const normalized = normalizeQuestion(question)
  return portfolioFaqs.find(item =>
    [item.question, ...item.matches].some(match =>
      normalized.includes(normalizeQuestion(match)),
    ),
  )
}

function findProject(question: string) {
  const normalized = normalizeQuestion(question)
  return projects.find(item =>
    [item.title, ...(projectAliases[item.code] ?? [])]
      .some(alias => normalized.includes(normalizeQuestion(alias))),
  )
}

function findFaqAnswer(question: string) {
  const faq = findPortfolioFaq(question)
  if (faq) return faq.answer

  const project = findProject(question)
  if (!project) return null

  const normalized = normalizeQuestion(question)
  if (/\b(role|team|client|result|outcome|metric|impact|conversion|launch)\b/.test(normalized)) {
    return 'That detail is not included in the saved offline information for this project.'
  }

  const asksChallenge = /\b(challenge|problem|brief|difficult)\b/.test(normalized)
  const asksApproach = /\b(approach|design|visual|identity|solution|method)\b/.test(normalized)
  if (asksChallenge && asksApproach) return `${project.challenge} ${project.approach}`
  if (asksChallenge) return project.challenge
  if (asksApproach) return project.approach
  return project.description
}

function getFollowUpQuestions(question: string) {
  const faq = findPortfolioFaq(question)
  if (faq) {
    return portfolioFaqs
      .filter(item => item !== faq)
      .slice(0, 3)
      .map(item => item.question)
  }

  const project = findProject(question)
  if (!project) return portfolioFaqs.slice(0, 3).map(item => item.question)

  const normalized = normalizeQuestion(question)
  const asksDescription = /\b(what is|tell me about|describe|overview)\b/.test(normalized)
  const asksChallenge = /\b(challenge|problem|brief|difficult)\b/.test(normalized)
  const asksApproach = /\b(approach|design|visual|identity|solution|method)\b/.test(normalized)
  const suggestions: string[] = []

  if (!asksDescription) suggestions.push(`What is ${project.title}?`)
  if (!asksChallenge) suggestions.push(`What was the main design challenge for ${project.title}?`)
  if (!asksApproach) suggestions.push(`How was ${project.title} approached?`)

  return [...suggestions, ...portfolioFaqs.map(item => item.question)].slice(0, 3)
}

export default function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage])
  const toggleRef = useRef<HTMLButtonElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  const sendMessage = (rawMessage: string) => {
    const content = rawMessage.trim()
    if (!content) return

    const userMessage: ChatMessage = { role: 'user', content }
    const answer = findFaqAnswer(content)
    const suggestions = getFollowUpQuestions(content)
    setMessages(current => [
      ...current,
      userMessage,
      {
        role: 'assistant',
        content: answer ?? 'I don’t have a saved answer for that yet. Try asking about Dismas’ background, skills, experience, design process, or one of the selected projects.',
        suggestions,
      },
    ])
  }

  return (
    <div className="portfolio-chat">
      {isOpen && (
        <section className="portfolio-chat__panel" id="portfolio-chat-panel" role="dialog" aria-label="Frequently asked questions about Dismas and his work">
          <header className="portfolio-chat__header">
            <div>
              <span className="portfolio-chat__eyebrow">DISMAS® / FAQs</span>
              <p><i aria-hidden="true" /> Select a question to explore</p>
            </div>
            <button type="button" className="portfolio-chat__close" onClick={() => setIsOpen(false)} aria-label="Close chat">×</button>
          </header>

          <div className="portfolio-chat__messages" aria-live="polite" aria-relevant="additions">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`}>
                <div className={`portfolio-chat__message portfolio-chat__message--${message.role}`}>
                  {message.content}
                </div>
                {index === messages.length - 1 && message.role === 'assistant' && message.suggestions && (
                  <div className="portfolio-chat__suggestions" aria-label="Suggested follow-up questions">
                    {message.suggestions.map(suggestion => (
                      <button type="button" key={suggestion} onClick={() => sendMessage(suggestion)}>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {messages.length === 1 && (
              <div className="portfolio-chat__suggestions" aria-label="Frequently asked questions">
                {projects.map(project => (
                  <button
                    type="button"
                    key={project.code}
                    onClick={() => sendMessage(`Tell me about the challenge and design approach for ${project.title}.`)}
                  >
                    {project.title}
                  </button>
                ))}
                <button type="button" onClick={() => sendMessage('What is Dismas’ product design process?')}>
                  Product design process
                </button>
                <button type="button" onClick={() => sendMessage('Who is Dismas?')}>
                  About Dismas
                </button>
                <button type="button" onClick={() => sendMessage('What design tools does Dismas use?')}>
                  Design tools
                </button>
                <button type="button" onClick={() => sendMessage('What did Dismas study?')}>
                  Education
                </button>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <p className="portfolio-chat__privacy">Answers use saved CV and portfolio details. This guide works without a network connection.</p>
        </section>
      )}

      <button
        type="button"
        ref={toggleRef}
        className="portfolio-chat__toggle"
        aria-expanded={isOpen}
        aria-controls="portfolio-chat-panel"
        aria-label={isOpen ? 'Close FAQs' : 'Open FAQs'}
        onClick={() => setIsOpen(open => !open)}
      >
        {isOpen ? (
          <span className="portfolio-chat__toggle-close" aria-hidden="true">×</span>
        ) : (
          <span className="portfolio-chat__toggle-label" aria-hidden="true">FAQs</span>
        )}
      </button>
    </div>
  )
}
