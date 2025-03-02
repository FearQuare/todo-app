import "./styles.css";
import MainPage from "./modules/mainPage";
import Navbar from "./modules/ui/navbar";
import Sidebar from "./modules/ui/sidebar";
import WorkspacePage from "./modules/workspacePage";

function addWorkspaceEventListeners() {
    const workspaces = document.querySelectorAll(".workspace");
    workspaces.forEach(workspace => {
        workspace.addEventListener("click", () => {
            app.appendChild(WorkspacePage(workspace.id));
        });
    });
}

const app = document.querySelector("#app");
app.appendChild(Navbar());
app.appendChild(Sidebar());
app.appendChild(MainPage());

addWorkspaceEventListeners();

const addWorkspaceButton = document.querySelector(".add-workspace-button");
addWorkspaceButton.addEventListener("click", addWorkspaceEventListeners);

const logo = document.querySelector(".todo-logo");
logo.addEventListener("click", () => {
    window.location.reload();
});