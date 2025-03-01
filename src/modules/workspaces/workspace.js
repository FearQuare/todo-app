// Workspace class
// Workspaces should have: name, id, and sections

export default class Workspace {
    constructor (name, id, sections = null) {
        this.name = name;
        this.id = id;
        this.sections = sections;
    }
}