import Section from "./section";
import { saveSections, getSections } from "./sectionStorage";

export function addSectionToWorkspace(name, workspaceId) {
    const sections = getSections();
    const id = sections.length;
    const newSection = new Section(name, id, workspaceId);
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

function updateDays() { // burayla ilgili gün loglama hakkında sıkıntımız var mesela 7-8-9 diye giderken ayların günleri bi anda 11'e atladı. Bu hata ile ayın 11'i gece 1 gibi karşılaştım.
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
                currentDate = new Date(currentDate.getTime() + 86400000);
            }
        }
    });
    saveSections(sections);
}

export function setDone(sectionId) {
    
}