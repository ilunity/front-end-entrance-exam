import html2pdf from "html-to-pdf-js";

const cvHTML = document.querySelector(".cv__main");
const savePdfButton = document.getElementById("save-pdf-button");
savePdfButton.addEventListener('click', (e) => {
    html2pdf(cvHTML);
})
