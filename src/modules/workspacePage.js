// actually, instead of getting all the workspaces each time, I can write a function which gets the specific
// workspace by id
import { getExistingWorkspaces, updateWorkspaceName } from "./workspaces/workspaceController";
import EditIcon from "../assets/icons/edit-icon.svg";
import CheckBoxIcon from "../assets/icons/check-box-icon.svg";
import RejectIcon from "../assets/icons/reject-icon.svg";
import { addSectionToWorkspace, getExistingSectionsWithWorkspaceId } from "./workspaces/sections/sectionController";

export default function WorkspacePage(workspaceId) {
    // get the previous div and remove it because we need space to show our workspace
    const prevDiv = document.querySelector(".component");
    prevDiv.remove();

    // create our workspace component
    const workspaceComponent = document.createElement("div");
    workspaceComponent.classList.add("component");
    workspaceComponent.classList.add("workspace-component");

    // retrieve all workspaces and pick the one we needed.
    const workspaces = getExistingWorkspaces();
    const workspaceToBeDisplayed = workspaces[workspaceId];

    // display the name of the choosen workspace
    const nameSection = document.createElement("div");
    nameSection.classList.add("workspace-name");
    const name = document.createElement("h1");
    name.innerText = workspaceToBeDisplayed.name;

    // edit button attributes
    const editButton = document.createElement("button");
    const editIcon = document.createElement("img");

    editButton.classList.add("edit-button");

    editIcon.src = EditIcon;
    editIcon.alt = "Edit Icon";

    editButton.appendChild(editIcon);

    // name changing input attributes
    const nameInput = document.createElement("input");
    nameInput.classList.add("hidden");
    nameInput.type = "text";
    nameInput.defaultValue = workspaceToBeDisplayed.name;
    nameInput.classList.add("text-input");

    // apply the name change button attributes
    const applyButton = document.createElement("button");
    const applyIcon = document.createElement("img");
    applyButton.classList.add("apply-button");
    applyButton.classList.add("hidden");
    applyIcon.src = CheckBoxIcon;
    applyIcon.alt = "Apply Icon";
    applyButton.appendChild(applyIcon);

    // reject button for name changing attributes
    const rejectButton = document.createElement("button");
    const rejectIcon = document.createElement("img");
    rejectButton.classList.add("reject-button");
    rejectButton.classList.add("hidden");
    rejectIcon.src = RejectIcon;
    rejectIcon.alt = "Reject Icon";
    rejectButton.appendChild(rejectIcon);

    // appending everything to the nameSection
    nameSection.appendChild(name);
    nameSection.appendChild(editButton);
    nameSection.appendChild(nameInput);
    nameSection.appendChild(applyButton);
    nameSection.appendChild(rejectButton);

    // add section's attributes
    const addSectionSection = document.createElement("div");
    addSectionSection.classList.add("add-section-section");

    // add section button attributes
    const addSectionButton = document.createElement("button");
    addSectionButton.classList.add("add-section-button");
    addSectionButton.innerText = "Add A Section";

    addSectionSection.appendChild(addSectionButton);

    // container for the sections
    const sectionList = getExistingSectionsWithWorkspaceId(workspaceId);
    const sections = document.createElement("div");
    sections.classList.add("sections");

    sectionList.forEach(section => {
        sections.appendChild(displaySection(section));
    });

    workspaceComponent.appendChild(nameSection);
    workspaceComponent.appendChild(addSectionSection);
    workspaceComponent.appendChild(sections);

    editButton.addEventListener("click", () => {
        name.classList.add("hidden");
        editButton.classList.add("hidden");
        nameInput.classList.remove("hidden");
        applyButton.classList.remove("hidden");
        rejectButton.classList.remove("hidden");
        addSectionButton.classList.add("hidden");
    });

    rejectButton.addEventListener("click", () => {
        nameInput.value = workspaceToBeDisplayed.name;
        nameInput.classList.add("hidden");
        applyButton.classList.add("hidden");
        rejectButton.classList.add("hidden");
        name.classList.remove("hidden");
        editButton.classList.remove("hidden");
        addSectionButton.classList.remove("hidden");
    });

    applyButton.addEventListener("click", () => {
        updateWorkspaceName(workspaceId, nameInput.value);
        name.innerText = nameInput.value;
        nameInput.classList.add("hidden");
        applyButton.classList.add("hidden");
        rejectButton.classList.add("hidden");
        name.classList.remove("hidden");
        editButton.classList.remove("hidden");
        addSectionButton.classList.remove("hidden");
        const sidebarDisplay = document.querySelectorAll(".workspace");
        sidebarDisplay[workspaceId].innerText = nameInput.value;
    });

    addSectionButton.addEventListener("click", () => {
        let sectionName = prompt("Please enter the name of the section");
        if (sectionName == null || sectionName == "") {
            window.alert("Section name cannot be empty!");
        } else {
            let newSection = addSectionToWorkspace(sectionName, workspaceId);
            let date = new Date(newSection.startDay);
            sections.appendChild(displaySection(newSection));
        }
    });

    return workspaceComponent;
}

function displaySection(section) {
    const sectionElement = document.createElement("div");
    sectionElement.classList.add("section");
    sectionElement.id = section.id;
    
    const sectionName = document.createElement("h1");
    sectionName.innerText = section.name;

    const streak = document.createElement("div");
    streak.classList.add("streak");

    var flameText = String.fromCodePoint(0x1F525);
    const flame = document.createElement("p");
    flame.classList.add("flame");
    flame.innerText = flameText;

    streak.appendChild(flame);

    sectionElement.append(sectionName);
    sectionElement.append(streak);

    return sectionElement;
}