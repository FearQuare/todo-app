// actually, instead of getting all the workspaces each time, I can write a function which gets the specific
// workspace by id
import { getExistingWorkspaces, updateWorkspaceName } from "./workspaces/workspaceController";
import EditIcon from "../assets/icons/edit-icon.svg";
import CheckBoxIcon from "../assets/icons/check-box-icon.svg";
import RejectIcon from "../assets/icons/reject-icon.svg";
import TickIcon from "../assets/icons/tick-icon.svg";
import { addSectionToWorkspace, getExistingSectionsWithWorkspaceId, setDone, setUndone } from "./workspaces/sections/sectionController";

export default function WorkspacePage(workspaceId) {
    // get the previous div and remove it because we need space to show our workspace
    const prevDiv = document.querySelector(".component");
    prevDiv.remove();

    // create our workspace component
    const workspaceComponent = document.createElement("div");
    workspaceComponent.classList.add("component");
    workspaceComponent.classList.add("workspace-component");

    // retrieve all workspaces and pick the one we needed.
    let workspaces = getExistingWorkspaces();
    let workspaceToBeDisplayed = workspaces[workspaceId];

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
        workspaces = getExistingWorkspaces();
        workspaceToBeDisplayed = workspaces[workspaceId];
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

    const blocksContainer = document.createElement("div");
    blocksContainer.classList.add("blocks-container");

    let keys = Object.keys(section.days)

    if (keys.length >= 7) {
        for (let i = 6; i >= 0; i--) {
            if (section.days[keys[(keys.length - 1) - i]] == 0) {
                let uncheckedBlock = document.createElement("div");
                uncheckedBlock.classList.add("unchecked-block");
                uncheckedBlock.classList.add("block")
                uncheckedBlock.classList.add(`section-${section.id}`);
                uncheckedBlock.id = i;
                blocksContainer.appendChild(uncheckedBlock);
            } else {
                let checkedBlock = document.createElement("div");
                checkedBlock.classList.add("checked-block");
                checkedBlock.classList.add("block");
                checkedBlock.classList.add(`section-${section.id}`);
                checkedBlock.id = i;
                blocksContainer.appendChild(checkedBlock);
            }
        }
    } else {
        for (let i= (keys.length - 1); i >= 0; i--) {
            if (section.days[keys[(keys.length - 1) - i]] == 0) {
                let uncheckedBlock = document.createElement("div");
                uncheckedBlock.classList.add("unchecked-block");
                uncheckedBlock.classList.add("block")
                uncheckedBlock.classList.add(`section-${section.id}`);
                uncheckedBlock.id = i;
                blocksContainer.appendChild(uncheckedBlock);
            } else {
                let checkedBlock = document.createElement("div");
                checkedBlock.classList.add("checked-block");
                checkedBlock.classList.add("block");
                checkedBlock.classList.add(`section-${section.id}`);
                checkedBlock.id = i;
                blocksContainer.appendChild(checkedBlock);
            }
        }
    }

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    const setDoneButton = document.createElement("button");
    setDoneButton.classList.add("set-done-button");
    const tick = document.createElement("img");
    tick.src = TickIcon;

    setDoneButton.appendChild(tick);

    setDoneButton.addEventListener("click", () => {
        setDone(section.id);
        const blocks = document.querySelectorAll(`.section-${section.id}`);
        if (blocks[blocks.length - 1].classList[0] != "checked-block") {
            blocks[blocks.length - 1].classList.remove("unchecked-block");
            blocks[blocks.length - 1].classList.add("checked-block");
        }
    });

    const setUndoneButton = document.createElement("button");
    setUndoneButton.classList.add("set-undone-button");
    const cross = document.createElement("img");
    cross.src = RejectIcon;

    setUndoneButton.appendChild(cross);

    setUndoneButton.addEventListener("click", () => {
        setUndone(section.id);
        const blocks = document.querySelectorAll(`.section-${section.id}`);
        if (blocks[blocks.length - 1].classList[0] == "checked-block") {
            blocks[blocks.length - 1].classList.remove("checked-block");
            blocks[blocks.length - 1].classList.add("unchecked-block");
        }
    })

    buttonsContainer.appendChild(setDoneButton);
    buttonsContainer.appendChild(setUndoneButton);

    sectionElement.appendChild(sectionName);
    sectionElement.appendChild(blocksContainer);
    sectionElement.appendChild(buttonsContainer);
    return sectionElement;
}