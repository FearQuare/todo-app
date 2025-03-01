import profilePhoto from "../../assets/images/profile.jpg"
export default function Navbar() {
    // Creating the nav element
    const navbar = document.createElement("nav");

    // Creating a heading element for displaying app name
    const h1 = document.createElement("h1");
    h1.innerText = "Todo";
    navbar.appendChild(h1);

    // Creating the profile photo container
    const profileContainer = document.createElement("div");
    profileContainer.classList.add("profile-container");

    // Adding the photo
    const profileImage = document.createElement("img");
    profileImage.src = profilePhoto;
    profileImage.alt = "Kyro";

    // Inserting the component to the navbar
    profileContainer.appendChild(profileImage);
    navbar.appendChild(profileContainer);

    return navbar;
}