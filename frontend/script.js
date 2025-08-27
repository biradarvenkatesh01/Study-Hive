// Application state
const appState = {
  currentPage: "login",
  selectedGroup: null,
  isAuthenticated: false,
  user: null,
  studyGroups: [
    {
      id: 1,
      name: "Advanced Mathematics",
      subject: "Mathematics",
      members: 12,
      description: "Calculus III and Linear Algebra study group",
      nextSession: "2024-01-15 14:00",
      progress: 75,
    },
    {
      id: 2,
      name: "Computer Science Fundamentals",
      subject: "Computer Science",
      members: 8,
      description: "Data structures and algorithms practice",
      nextSession: "2024-01-16 16:00",
      progress: 60,
    },
    {
      id: 3,
      name: "Organic Chemistry Lab",
      subject: "Chemistry",
      members: 15,
      description: "Lab reports and reaction mechanisms",
      nextSession: "2024-01-17 10:00",
      progress: 45,
    },
  ],
  resources: [
    {
      id: 1,
      title: "Calculus III Study Guide",
      type: "PDF",
      subject: "Mathematics",
      uploadedBy: "Sarah Chen",
      uploadDate: "2024-01-10",
      downloads: 45,
    },
    {
      id: 2,
      title: "Algorithm Visualization Tool",
      type: "Interactive",
      subject: "Computer Science",
      uploadedBy: "Mike Johnson",
      uploadDate: "2024-01-12",
      downloads: 32,
    },
    {
      id: 3,
      title: "Chemistry Lab Safety Video",
      type: "Video",
      subject: "Chemistry",
      uploadedBy: "Dr. Williams",
      uploadDate: "2024-01-08",
      downloads: 67,
    },
  ],
}

// Utility functions
function createElement(tag, className = "", content = "") {
  const element = document.createElement(tag)
  if (className) element.className = className
  if (content) element.innerHTML = content
  return element
}

function clearContainer(container) {
  container.innerHTML = ""
}

// Authentication functions
function handleLogin(email, password) {
  // Simple validation for demo
  if (email && password) {
    appState.isAuthenticated = true
    appState.user = { name: "John Doe", email: email }
    appState.currentPage = "dashboard"
    renderApp()
  }
}

function handleSignup(name, email, password) {
  // Simple validation for demo
  if (name && email && password) {
    appState.isAuthenticated = true
    appState.user = { name: name, email: email }
    appState.currentPage = "dashboard"
    renderApp()
  }
}

function handleLogout() {
  appState.isAuthenticated = false
  appState.user = null
  appState.currentPage = "login"
  renderApp()
}

// Navigation functions
function navigateTo(page) {
  appState.currentPage = page
  renderApp()
}

function selectGroup(group) {
  appState.selectedGroup = group
  appState.currentPage = "study-group"
  renderApp()
}

// Component creation functions
function createLoginForm() {
  const container = createElement("div", "auth-container")
  const form = createElement("div", "form-container")

  form.innerHTML = `
        <div class="page-header" style="border: none; text-align: center;">
            <h1 class="page-title" style="color: var(--primary);">Study Hive</h1>
            <p class="page-subtitle">Sign in to your account</p>
        </div>
        <form id="loginForm">
            <div class="form-group">
                <label class="form-label" for="email">Email</label>
                <input type="email" id="email" class="form-input" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <input type="password" id="password" class="form-input" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-bottom: 1rem;">
                Sign In
            </button>
            <button type="button" id="switchToSignup" class="btn btn-outline" style="width: 100%;">
                Create Account
            </button>
        </form>
    `

  container.appendChild(form)

  // Add event listeners
  form.querySelector("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault()
    const email = form.querySelector("#email").value
    const password = form.querySelector("#password").value
    handleLogin(email, password)
  })

  form.querySelector("#switchToSignup").addEventListener("click", () => {
    appState.currentPage = "signup"
    renderApp()
  })

  return container
}

function createSignupForm() {
  const container = createElement("div", "auth-container")
  const form = createElement("div", "form-container")

  form.innerHTML = `
        <div class="page-header" style="border: none; text-align: center;">
            <h1 class="page-title" style="color: var(--primary);">Study Hive</h1>
            <p class="page-subtitle">Create your account</p>
        </div>
        <form id="signupForm">
            <div class="form-group">
                <label class="form-label" for="name">Full Name</label>
                <input type="text" id="name" class="form-input" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="email">Email</label>
                <input type="email" id="email" class="form-input" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="password">Password</label>
                <input type="password" id="password" class="form-input" required>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-bottom: 1rem;">
                Create Account
            </button>
            <button type="button" id="switchToLogin" class="btn btn-outline" style="width: 100%;">
                Sign In Instead
            </button>
        </form>
    `

  container.appendChild(form)

  // Add event listeners
  form.querySelector("#signupForm").addEventListener("submit", (e) => {
    e.preventDefault()
    const name = form.querySelector("#name").value
    const email = form.querySelector("#email").value
    const password = form.querySelector("#password").value
    handleSignup(name, email, password)
  })

  form.querySelector("#switchToLogin").addEventListener("click", () => {
    appState.currentPage = "login"
    renderApp()
  })

  return container
}

function createSidebar() {
  const sidebar = createElement("div", "sidebar")

  sidebar.innerHTML = `
        <div class="sidebar-logo">
            📚 Study Hive
        </div>
        <nav class="sidebar-nav">
            <li><a href="#" data-page="dashboard" class="${appState.currentPage === "dashboard" ? "active" : ""}">
                📊 Dashboard
            </a></li>
            <li><a href="#" data-page="groups" class="${appState.currentPage === "groups" ? "active" : ""}">
                👥 Groups
            </a></li>
            <li><a href="#" data-page="resources" class="${appState.currentPage === "resources" ? "active" : ""}">
                📁 Resources
            </a></li>
            <li style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--sidebar-border);">
                <div style="padding: 1rem; background: var(--muted); border-radius: var(--radius); margin-bottom: 1rem;">
                    <div style="font-weight: 600; color: var(--foreground); margin-bottom: 0.25rem;">
                        ${appState.user?.name || "User"}
                    </div>
                    <div style="font-size: 0.875rem; color: var(--muted-foreground);">
                        ${appState.user?.email || "user@example.com"}
                    </div>
                </div>
                <a href="#" id="logoutBtn" style="color: var(--destructive);">
                    🚪 Logout
                </a>
            </li>
        </nav>
    `

  // Add event listeners
  sidebar.querySelectorAll("[data-page]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      navigateTo(e.target.dataset.page)
    })
  })

  sidebar.querySelector("#logoutBtn").addEventListener("click", (e) => {
    e.preventDefault()
    handleLogout()
  })

  return sidebar
}

function createDashboard() {
  const container = createElement("div")

  container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">Dashboard</h1>
            <p class="page-subtitle">Welcome back, ${appState.user?.name || "Student"}! Here's your study overview.</p>
        </div>
        
        <div class="cards-grid">
            <div class="card">
                <h3 style="color: var(--primary); margin-bottom: 0.5rem;">📊 Active Groups</h3>
                <div style="font-size: 2rem; font-weight: 700; color: var(--foreground);">${appState.studyGroups.length}</div>
                <p style="color: var(--muted-foreground); margin-top: 0.5rem;">Study groups you're part of</p>
            </div>
            <div class="card">
                <h3 style="color: var(--secondary); margin-bottom: 0.5rem;">📚 Resources</h3>
                <div style="font-size: 2rem; font-weight: 700; color: var(--foreground);">${appState.resources.length}</div>
                <p style="color: var(--muted-foreground); margin-top: 0.5rem;">Available study materials</p>
            </div>
            <div class="card">
                <h3 style="color: var(--accent); margin-bottom: 0.5rem;">⏰ Next Session</h3>
                <div style="font-size: 1.25rem; font-weight: 600; color: var(--foreground);">Today 2:00 PM</div>
                <p style="color: var(--muted-foreground); margin-top: 0.5rem;">Advanced Mathematics</p>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-bottom: 2rem;">
            <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--foreground);">Your Study Groups</h2>
                    <button class="btn btn-primary" id="createGroupBtn">+ Create New Group</button>
                </div>
                <div id="studyGroupsList"></div>
            </div>
            <div>
                <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--foreground); margin-bottom: 1.5rem;">Recent Activity</h3>
                <div style="background: var(--card); border-radius: var(--radius); padding: 1.5rem; border: 1px solid var(--border);">
                    <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
                        <div style="font-weight: 500; color: var(--foreground);">New resource uploaded</div>
                        <div style="font-size: 0.875rem; color: var(--muted-foreground);">Calculus III Study Guide</div>
                        <div style="font-size: 0.75rem; color: var(--muted-foreground); margin-top: 0.25rem;">2 hours ago</div>
                    </div>
                    <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
                        <div style="font-weight: 500; color: var(--foreground);">Group session completed</div>
                        <div style="font-size: 0.875rem; color: var(--muted-foreground);">Computer Science Fundamentals</div>
                        <div style="font-size: 0.75rem; color: var(--muted-foreground); margin-top: 0.25rem;">1 day ago</div>
                    </div>
                    <div>
                        <div style="font-weight: 500; color: var(--foreground);">New member joined</div>
                        <div style="font-size: 0.875rem; color: var(--muted-foreground);">Organic Chemistry Lab</div>
                        <div style="font-size: 0.75rem; color: var(--muted-foreground); margin-top: 0.25rem;">3 days ago</div>
                    </div>
                </div>
            </div>
        </div>
    `

  // Render study groups
  const groupsList = container.querySelector("#studyGroupsList")
  appState.studyGroups.forEach((group) => {
    const groupCard = createElement("div", "card")
    groupCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                    <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--foreground); margin-bottom: 0.5rem;">${group.name}</h3>
                    <p style="color: var(--muted-foreground); margin-bottom: 0.5rem;">${group.description}</p>
                    <div style="display: flex; gap: 1rem; font-size: 0.875rem; color: var(--muted-foreground);">
                        <span>👥 ${group.members} members</span>
                        <span>📅 Next: ${new Date(group.nextSession).toLocaleDateString()}</span>
                    </div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 0.5rem;">Progress</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">${group.progress}%</div>
                </div>
            </div>
            <div style="background: var(--muted); border-radius: var(--radius); height: 8px; margin-bottom: 1rem;">
                <div style="background: var(--primary); height: 100%; border-radius: var(--radius); width: ${group.progress}%; transition: width 0.3s ease;"></div>
            </div>
        `

    groupCard.addEventListener("click", () => selectGroup(group))
    groupsList.appendChild(groupCard)
  })

  return container
}

function createGroupsPage() {
  const container = createElement("div")

  container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">Discover Groups</h1>
            <p class="page-subtitle">Find and join study groups that match your interests</p>
        </div>
        
        <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
            <input type="text" placeholder="Search groups..." class="form-input" style="flex: 1; min-width: 300px;">
            <select class="form-input" style="width: 200px;">
                <option>All Subjects</option>
                <option>Mathematics</option>
                <option>Computer Science</option>
                <option>Chemistry</option>
                <option>Physics</option>
            </select>
            <button class="btn btn-primary">🔍 Search</button>
        </div>
        
        <div class="cards-grid" id="groupsList"></div>
    `

  // Render available groups
  const groupsList = container.querySelector("#groupsList")
  const availableGroups = [
    ...appState.studyGroups,
    {
      id: 4,
      name: "Physics Study Circle",
      subject: "Physics",
      members: 6,
      description: "Quantum mechanics and thermodynamics",
      nextSession: "2024-01-18 15:00",
      progress: 30,
    },
    {
      id: 5,
      name: "Literature Discussion",
      subject: "English",
      members: 10,
      description: "Modern American literature analysis",
      nextSession: "2024-01-19 13:00",
      progress: 55,
    },
  ]

  availableGroups.forEach((group) => {
    const groupCard = createElement("div", "card")
    groupCard.innerHTML = `
            <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--foreground); margin-bottom: 0.5rem;">${group.name}</h3>
            <div style="display: inline-block; background: var(--primary); color: var(--primary-foreground); padding: 0.25rem 0.75rem; border-radius: var(--radius); font-size: 0.75rem; font-weight: 600; margin-bottom: 1rem;">
                ${group.subject}
            </div>
            <p style="color: var(--muted-foreground); margin-bottom: 1rem; line-height: 1.5;">${group.description}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <div style="display: flex; gap: 1rem; font-size: 0.875rem; color: var(--muted-foreground);">
                    <span>👥 ${group.members} members</span>
                    <span>📅 ${new Date(group.nextSession).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-primary" style="width: 100%;">Join Group</button>
        `

    groupCard.addEventListener("click", () => selectGroup(group))
    groupsList.appendChild(groupCard)
  })

  return container
}

function createResourcesPage() {
  const container = createElement("div")

  container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">Study Resources</h1>
            <p class="page-subtitle">Access shared materials and upload your own</p>
        </div>
        
        <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
            <input type="text" placeholder="Search resources..." class="form-input" style="flex: 1; min-width: 300px;">
            <select class="form-input" style="width: 150px;">
                <option>All Types</option>
                <option>PDF</option>
                <option>Video</option>
                <option>Interactive</option>
            </select>
            <select class="form-input" style="width: 200px;">
                <option>All Subjects</option>
                <option>Mathematics</option>
                <option>Computer Science</option>
                <option>Chemistry</option>
            </select>
            <button class="btn btn-secondary">📤 Upload Resource</button>
        </div>
        
        <div id="resourcesList"></div>
    `

  // Render resources
  const resourcesList = container.querySelector("#resourcesList")
  appState.resources.forEach((resource) => {
    const resourceItem = createElement("div", "resource-item")
    resourceItem.innerHTML = `
            <div class="resource-info">
                <h4>${resource.title}</h4>
                <p>Type: ${resource.type} | Subject: ${resource.subject}</p>
                <p style="font-size: 0.75rem; margin-top: 0.5rem;">
                    Uploaded by ${resource.uploadedBy} on ${resource.uploadDate} | ${resource.downloads} downloads
                </p>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-outline" style="padding: 0.5rem 1rem;">👁️ View</button>
                <button class="btn btn-primary" style="padding: 0.5rem 1rem;">⬇️ Download</button>
            </div>
        `
    resourcesList.appendChild(resourceItem)
  })

  return container
}

function createStudyGroupPage() {
  const container = createElement("div")
  const group = appState.selectedGroup

  if (!group) {
    container.innerHTML = "<p>No group selected</p>"
    return container
  }

  container.innerHTML = `
        <div class="page-header">
            <button class="btn btn-outline" id="backBtn" style="margin-bottom: 1rem;">← Back to Dashboard</button>
            <h1 class="page-title">${group.name}</h1>
            <p class="page-subtitle">${group.description}</p>
        </div>
        
        <div class="tabs">
            <div class="tabs-list">
                <button class="active" data-tab="resources">📁 Resources</button>
                <button data-tab="chat">💬 Chat</button>
                <button data-tab="ai">🤖 AI Assistant</button>
            </div>
        </div>
        
        <div id="tabContent"></div>
    `

  // Add event listeners
  container.querySelector("#backBtn").addEventListener("click", () => {
    navigateTo("dashboard")
  })

  const tabButtons = container.querySelectorAll("[data-tab]")
  tabButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      tabButtons.forEach((b) => b.classList.remove("active"))
      e.target.classList.add("active")
      renderTabContent(e.target.dataset.tab, container.querySelector("#tabContent"))
    })
  })

  // Render initial tab content
  renderTabContent("resources", container.querySelector("#tabContent"))

  return container
}

function renderTabContent(tab, container) {
  clearContainer(container)

  switch (tab) {
    case "resources":
      container.innerHTML = `
                <div style="margin-bottom: 2rem;">
                    <button class="btn btn-primary">📤 Upload Resource</button>
                </div>
                <div id="groupResources"></div>
            `

      const groupResources = container.querySelector("#groupResources")
      appState.resources.slice(0, 2).forEach((resource) => {
        const resourceItem = createElement("div", "resource-item")
        resourceItem.innerHTML = `
                    <div class="resource-info">
                        <h4>${resource.title}</h4>
                        <p>Type: ${resource.type} | Uploaded by ${resource.uploadedBy}</p>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-outline" style="padding: 0.5rem 1rem;">👁️ View</button>
                        <button class="btn btn-primary" style="padding: 0.5rem 1rem;">⬇️ Download</button>
                    </div>
                `
        groupResources.appendChild(resourceItem)
      })
      break

    case "chat":
      container.innerHTML = `
                <div class="chat-container">
                    <div class="chat-messages" id="chatMessages">
                        <div class="message other">
                            <strong>Sarah Chen:</strong> Hey everyone! Ready for today's study session?
                        </div>
                        <div class="message user">
                            <strong>You:</strong> Yes! I've prepared the practice problems.
                        </div>
                        <div class="message other">
                            <strong>Mike Johnson:</strong> Great! Let's start with derivatives.
                        </div>
                    </div>
                    <div class="chat-input-container">
                        <textarea class="chat-input" placeholder="Type your message..." id="chatInput"></textarea>
                        <button class="btn btn-primary" id="sendBtn">Send</button>
                    </div>
                </div>
            `

      container.querySelector("#sendBtn").addEventListener("click", () => {
        const input = container.querySelector("#chatInput")
        if (input.value.trim()) {
          const messagesContainer = container.querySelector("#chatMessages")
          const message = createElement("div", "message user")
          message.innerHTML = `<strong>You:</strong> ${input.value}`
          messagesContainer.appendChild(message)
          input.value = ""
          messagesContainer.scrollTop = messagesContainer.scrollHeight
        }
      })
      break

    case "ai":
      container.innerHTML = `
                <div class="chat-container">
                    <div class="chat-messages" id="aiMessages">
                        <div class="message other">
                            <strong>AI Assistant:</strong> Hello! I'm here to help with your studies. Ask me anything about ${appState.selectedGroup.subject}!
                        </div>
                    </div>
                    <div class="chat-input-container">
                        <textarea class="chat-input" placeholder="Ask the AI assistant..." id="aiInput"></textarea>
                        <button class="btn btn-primary" id="aiSendBtn">Ask AI</button>
                    </div>
                </div>
            `

      container.querySelector("#aiSendBtn").addEventListener("click", () => {
        const input = container.querySelector("#aiInput")
        if (input.value.trim()) {
          const messagesContainer = container.querySelector("#aiMessages")

          // Add user message
          const userMessage = createElement("div", "message user")
          userMessage.innerHTML = `<strong>You:</strong> ${input.value}`
          messagesContainer.appendChild(userMessage)

          // Add AI response (simulated)
          setTimeout(() => {
            const aiMessage = createElement("div", "message other")
            aiMessage.innerHTML = `<strong>AI Assistant:</strong> That's a great question! Let me help you understand that concept better...`
            messagesContainer.appendChild(aiMessage)
            messagesContainer.scrollTop = messagesContainer.scrollHeight
          }, 1000)

          input.value = ""
          messagesContainer.scrollTop = messagesContainer.scrollHeight
        }
      })
      break
  }
}

// Main render function
function renderApp() {
  const app = document.getElementById("app")
  clearContainer(app)

  if (!appState.isAuthenticated) {
    if (appState.currentPage === "signup") {
      app.appendChild(createSignupForm())
    } else {
      app.appendChild(createLoginForm())
    }
    return
  }

  // Create main app container
  const appContainer = createElement("div", "app-container")

  // Add sidebar
  appContainer.appendChild(createSidebar())

  // Add main content
  const mainContent = createElement("main", "main-content")

  switch (appState.currentPage) {
    case "dashboard":
      mainContent.appendChild(createDashboard())
      break
    case "groups":
      mainContent.appendChild(createGroupsPage())
      break
    case "resources":
      mainContent.appendChild(createResourcesPage())
      break
    case "study-group":
      mainContent.appendChild(createStudyGroupPage())
      break
    default:
      mainContent.appendChild(createDashboard())
  }

  appContainer.appendChild(mainContent)
  app.appendChild(appContainer)
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  renderApp()
})