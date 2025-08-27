// frontend/script.js (Final Updated Code for Step 6)

// Application state (Now initialized as empty, will be filled from API)
const appState = {
  currentPage: "login",
  selectedGroup: null,
  isAuthenticated: false,
  user: null,
  studyGroups: [], // <-- STATIC DATA REMOVED, WILL BE FETCHED FROM DB
  resources: [], // <-- STATIC DATA REMOVED FOR FUTURE USE
};

// Utility functions
function createElement(tag, className = "", content = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content) element.innerHTML = content;
  return element;
}

function clearContainer(container) {
  container.innerHTML = "";
}

// Authentication functions
function handleLogout() {
  signOut(); // This function is defined in firebase-auth.js
}

// --- ADD THIS NEW FUNCTION TO FETCH DATA FROM YOUR BACKEND ---
async function fetchStudyGroups() {
  // Get the current user's token from Firebase
  const user = auth.currentUser;
  if (!user) {
    console.log("No user is logged in, cannot fetch groups.");
    return;
  }

  try {
    const token = await user.getIdToken();

    const response = await fetch('http://localhost:5001/api/groups', {
      headers: {
        // Send the token in the Authorization header
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Could not fetch study groups.');
    }

    const groupsFromDB = await response.json();
    console.log("Groups fetched from DB:", groupsFromDB);

    // Replace appState's static data with data from the DB
    appState.studyGroups = groupsFromDB;

  } catch (error)    {
    console.error("Error fetching study groups:", error);
    // If there's an error, set groups to empty
    appState.studyGroups = [];
  }
}
// ----------------------------------------------------------------

// Navigation functions
function navigateTo(page) {
  appState.currentPage = page;
  renderApp();
}

function selectGroup(group) {
  appState.selectedGroup = group;
  appState.currentPage = "study-group";
  renderApp();
}

// Component creation functions
function createLoginForm() {
  const container = createElement("div", "auth-container");
  const form = createElement("div", "form-container");

  form.innerHTML = `
        <div class="page-header" style="border: none; text-align: center;">
            <h1 class="page-title" style="color: var(--primary);">Study Hive</h1>
            <p class="page-subtitle">Sign in to get started</p>
        </div>
        <button type="button" id="googleSignInBtn" class="btn btn-primary" style="width: 100%; margin-bottom: 1rem;">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" style="margin-right: 0.5rem;"/>
            Sign In with Google
        </button>
        <p style="text-align: center; font-size: 0.8rem; color: var(--muted-foreground);">
            More sign-in options are coming soon.
        </p>
    `;

  container.appendChild(form);

  form.querySelector("#googleSignInBtn").addEventListener("click", () => {
    signInWithGoogle(); // This function is from firebase-auth.js
  });

  return container;
}

function createSidebar() {
  const sidebar = createElement("div", "sidebar");

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
    `;

  sidebar.querySelectorAll("[data-page]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo(e.target.dataset.page);
    });
  });

  sidebar.querySelector("#logoutBtn").addEventListener("click", (e) => {
    e.preventDefault();
    handleLogout();
  });

  return sidebar;
}

function createDashboard() {
  const container = createElement("div");

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
    `;

  // --- THIS PART IS UPDATED TO RENDER DATA FROM THE DATABASE ---
  const groupsList = container.querySelector("#studyGroupsList");
  if (appState.studyGroups.length === 0) {
    groupsList.innerHTML = `<p>You haven't joined or created any study groups yet.</p>`;
  } else {
    appState.studyGroups.forEach((group) => {
        const groupCard = createElement("div", "card");
        groupCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                    <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--foreground); margin-bottom: 0.5rem;">${group.name}</h3>
                    <p style="color: var(--muted-foreground); margin-bottom: 0.5rem;">${group.description}</p>
                    <div style="display: flex; gap: 1rem; font-size: 0.875rem; color: var(--muted-foreground);">
                        <span>👥 ${group.members.length} members</span>
                        <span>👤 Created by: ${group.createdBy.name}</span>
                    </div>
                </div>
            </div>
        `;
        groupCard.addEventListener("click", () => selectGroup(group));
        groupsList.appendChild(groupCard);
    });
  }
  // -------------------------------------------------------------

  return container;
}


// NOTE: The rest of the functions (createGroupsPage, createResourcesPage, etc.) still use static data.
// We will update them in later steps as we build more API endpoints.

function createGroupsPage() {
  const container = createElement("div");
  // This page will be updated later to fetch all available groups from the DB
  container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">Discover Groups</h1>
            <p class="page-subtitle">Find and join study groups that match your interests</p>
        </div>
        <p>This feature is coming soon!</p>
    `;
  return container;
}

function createResourcesPage() {
  const container = createElement("div");
  // This page will be updated later to fetch resources from the DB
  container.innerHTML = `
        <div class="page-header">
            <h1 class="page-title">Study Resources</h1>
            <p class="page-subtitle">Access shared materials and upload your own</p>
        </div>
        <p>This feature is coming soon!</p>
    `;
  return container;
}

function createStudyGroupPage() {
  const container = createElement("div");
  const group = appState.selectedGroup;

  if (!group) {
    container.innerHTML = "<p>No group selected. Go back to the dashboard.</p>";
    return container;
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
    `;

  container.querySelector("#backBtn").addEventListener("click", () => {
    navigateTo("dashboard");
  });

  const tabButtons = container.querySelectorAll("[data-tab]");
  tabButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      renderTabContent(e.target.dataset.tab, container.querySelector("#tabContent"));
    });
  });

  renderTabContent("resources", container.querySelector("#tabContent"));

  return container;
}

function renderTabContent(tab, container) {
  clearContainer(container);

  switch (tab) {
    case "resources":
      container.innerHTML = `
                <div style="margin-bottom: 2rem;">
                    <button class="btn btn-primary">📤 Upload Resource</button>
                </div>
                <p>Resource feature for this group is coming soon!</p>
            `;
      break;
    case "chat":
      container.innerHTML = `
                <div class="chat-container">
                    <div class="chat-messages" id="chatMessages">
                        <div class="message other"><strong>Group Chat:</strong> This feature is coming soon!</div>
                    </div>
                    <div class="chat-input-container">
                        <textarea class="chat-input" placeholder="Type your message..." disabled></textarea>
                        <button class="btn btn-primary" id="sendBtn" disabled>Send</button>
                    </div>
                </div>
            `;
      break;
    case "ai":
      container.innerHTML = `
                <div class="chat-container">
                    <div class="chat-messages" id="aiMessages">
                        <div class="message other">
                            <strong>AI Assistant:</strong> Hello! This feature is coming soon. I will be able to help with your studies on ${appState.selectedGroup.subject}.
                        </div>
                    </div>
                    <div class="chat-input-container">
                        <textarea class="chat-input" placeholder="Ask the AI assistant..." disabled></textarea>
                        <button class="btn btn-primary" id="aiSendBtn" disabled>Ask AI</button>
                    </div>
                </div>
            `;
      break;
  }
}

// Main render function
function renderApp() {
  const app = document.getElementById("app");
  clearContainer(app);

  if (!appState.isAuthenticated) {
    app.appendChild(createLoginForm());
  } else {
    const appContainer = createElement("div", "app-container");
    appContainer.appendChild(createSidebar());

    const mainContent = createElement("main", "main-content");
    switch (appState.currentPage) {
      case "dashboard":
        mainContent.appendChild(createDashboard());
        break;
      case "groups":
        mainContent.appendChild(createGroupsPage());
        break;
      case "resources":
        mainContent.appendChild(createResourcesPage());
        break;
      case "study-group":
        mainContent.appendChild(createStudyGroupPage());
        break;
      default:
        mainContent.appendChild(createDashboard());
        break;
    }
    appContainer.appendChild(mainContent);
    app.appendChild(appContainer);
  }
}

// Initialize the app when the DOM is loaded
// Note: renderApp() is also called by onAuthStateChanged in firebase-auth.js
document.addEventListener("DOMContentLoaded", () => {
  renderApp();
});