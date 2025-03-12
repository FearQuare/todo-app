import Section from "./section";
import { saveSections, getSections } from "./sectionStorage";

export function addSectionToWorkspace(name, workspaceId) {
    const sections = getSections();
    const id = sections.length;
    const newSection = new Section(name, id, workspaceId);
    
    // Set startDay to current date's 00:00:00 for GMT+3 timezone as Unix timestamp
    const now = new Date();
    const gmt3Offset = 3 * 60 * 60 * 1000;
    const startDay = new Date(now.getTime() + gmt3Offset);
    startDay.setHours(0, 0, 0, 0);
    newSection.startDay = startDay.getTime();

    sections.push(newSection);
    saveSections(sections);
    updateDays();
    return newSection;
}

export function getExistingSectionsWithWorkspaceId(workspaceId) {
    updateDays();
    const sections = getSections();
    const filteredSections = sections.filter(section => section.workspaceId == workspaceId);
    return filteredSections;
}

function updateDays() {
    const sections = getSections();
    sections.forEach(section => {
        let startDay = new Date(section.startDay);
        let today = new Date();
        let dateDiff = Math.floor((today - startDay) / 86400000);
        if (dateDiff == 0) {
            if (Object.keys(section.days).length === 0) {
                section.days[`${startDay.getDate()}-${startDay.getMonth() + 1}-${startDay.getFullYear()}`] = 0;
            }
        } else {
            let currentDate = startDay;
            for (let i = 0; i <= dateDiff; i++) {
                const dateString = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
                if (!(dateString in section.days)) {
                    section.days[dateString] = 0;
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    });
    saveSections(sections);
}

export function setDone(sectionId) {
    const sections = getSections();
    const itemToSetDone = sections.find(section => section.id == sectionId);
    let keys = Object.keys(itemToSetDone.days);
    let lastKey = keys[keys.length - 1];
    itemToSetDone.days[lastKey] = 1;
    saveSections(sections);
}

export function setUndone(sectionId) {
    const sections = getSections();
    const itemToSetUndone = sections.find(section => section.id == sectionId);
    let keys = Object.keys(itemToSetUndone.days);
    let lastKey = keys[keys.length - 1];
    itemToSetUndone.days[lastKey] = 0;
    saveSections(sections);
}