import selectWorksapce from "../assets/images/select-workspace.svg"

export default function MainPage() {
    // add the component div
    const mainPage = document.createElement("div");
    mainPage.classList.add("component");
    mainPage.classList.add("main");

    // create an img element and set its src attribute
    const img = document.createElement("img");
    img.src = selectWorksapce;
    img.alt = "Select Workspace";

    // append the img element to the mainPage div
    mainPage.appendChild(img);
    
    return mainPage;
}