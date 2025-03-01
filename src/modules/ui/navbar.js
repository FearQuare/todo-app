import profilePhoto from "../../assets/profile.jpg"
export default function Navbar() {
    // Creating the nav element
    const navbar = document.createElement("nav");

    // Creating a heading element for displaying app name
    const h1 = document.createElement("h1");
    h1.innerText = "Todo";
    navbar.appendChild(h1);

    const profileContainer = document.createElement("div");
    profileContainer.classList.add("profile-container");

    const profileImage = document.createElement("img");
    profileImage.src = profilePhoto;
    profileImage.alt = "Kyro";

    profileContainer.appendChild(profileImage);
    navbar.appendChild(profileContainer);

    return navbar;
}