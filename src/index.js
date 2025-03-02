import "./styles.css";
import MainPage from "./modules/mainPage";
import Navbar from "./modules/ui/navbar";
import Sidebar from "./modules/ui/sidebar";

const app = document.querySelector("#app");
app.appendChild(Navbar());
app.appendChild(Sidebar());
app.appendChild(MainPage());

function getCurrentWorkspaces() {
    const workspaces = document.querySelectorAll(".workspace");
    return workspaces
}

let currentWorkspaces = getCurrentWorkspaces();


const logo = document.querySelector(".todo-logo");
logo.addEventListener("click", () => {
    window.location.reload();
});

currentWorkspaces.forEach(workspace => {
    workspace.addEventListener("click", () => {
        // if there is a workspace that is already selected remove the styling from it
        if (document.querySelector(".active-workspace") != null) {
            const prevSelectedWorkspace = document.querySelector(".active-workspace");
            prevSelectedWorkspace.classList.remove("active-workspace");
        }

        workspace.classList.add("active-workspace");
    })
});

const addWorkspaceButton = document.querySelector(".add-workspace-button");
addWorkspaceButton.addEventListener("click", () => {
    currentWorkspaces = getCurrentWorkspaces();
    let lastAddedWorkspace = currentWorkspaces[currentWorkspaces.length - 1];
    lastAddedWorkspace.addEventListener("click", () => {
        // if there is a workspace that is already selected remove the styling from it
        if (document.querySelector(".active-workspace") != null) {
            const prevSelectedWorkspace = document.querySelector(".active-workspace");
            prevSelectedWorkspace.classList.remove("active-workspace");
        }

        lastAddedWorkspace.classList.add("active-workspace");
    })
});