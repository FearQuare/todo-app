export default class Section {
    constructor(name, id, workspaceId, currentDay = 0) {
        this.name = name;
        this.id = id;
        this.workspaceId = workspaceId;
        this.currentDay = currentDay;
        this.startDay = Date.now();
    }
}