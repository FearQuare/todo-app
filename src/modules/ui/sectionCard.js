import { getExistingSectionsWithWorkspaceId } from "../workspaces/sections/sectionController";

export default function SectionCard(workspaceId, sectionId) {
    const sectionContainer = document.createElement("div");
    sectionContainer.classList("section");
    sectionContainer.id = sectionId;
    sectionContainer.innerText = workspaceId;

    return sectionContainer;
}