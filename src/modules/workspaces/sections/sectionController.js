import Section from "./section";
import { saveSections, getSections } from "./sectionStorage";

export function addSectionToWorkspace(name, workspaceId) {
    const sections = getSections();
    const id = sections.length;
    const newSection = new Section(name, id, workspaceId);
    sections.push(newSection);
    saveSections(sections);
    return newSection;
}

export function getExistingSectionsWithWorkspaceId(workspaceId) {
    const sections = getSections();
    return sections.filter(section => section.workspaceId == workspaceId);
}