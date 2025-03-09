export default class Section {
    constructor(name, id, workspaceId, startDay = Date.now()) {
        this.name = name;
        this.id = id;
        this.workspaceId = workspaceId;
        this.startDay = startDay;
        this.days = {};
    }
}

/* days should be calculated this way:
1. example day structure: days = {("01-01-2025", 1),("02-01-2025", 0)} // 1 means completed, 0 means not completed
2. when the user loads the page missing days should automatically be added with the 0 initial value
3. new day (today) should be added with initial 0 value as well, but the user is able to edit it.
*/