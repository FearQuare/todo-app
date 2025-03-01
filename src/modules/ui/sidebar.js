import Workspace from "../ui/workspace";

export default function Sidebar() {
    // Creating the sidebar
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    // Add workspace section
    sidebar.appendChild(Workspace());
    
    return sidebar;
}