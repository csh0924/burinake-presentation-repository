let currentSlide = 1;

const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

const pageIndicator =
document.getElementById("page-indicator");

function showSlide(index){

    if(index < 1) return;
    if(index > totalSlides) return;

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    const target =
    document.getElementById(`slide-${index}`);

    if(target){
        target.classList.add("active");
        currentSlide = index;
    }

    updatePageIndicator();
}

function updatePageIndicator(){

    if(!pageIndicator) return;

    pageIndicator.innerText =
    `${currentSlide} / ${totalSlides}`;
}

document.addEventListener("DOMContentLoaded",()=>{

    updatePageIndicator();

    document
    .querySelectorAll(".index-item")
    .forEach(item=>{

        item.addEventListener("click",(e)=>{

            e.preventDefault();

            const target =
            item.getAttribute("href");

            const page =
            parseInt(
                target.replace("#slide-","")
            );

            showSlide(page);

        });

    });

});

document.addEventListener("keydown",(e)=>{

    switch(e.key){

        case "ArrowRight":
        case "Enter":
        case " ":
        case "PageDown":

            showSlide(currentSlide + 1);
            break;

        case "ArrowLeft":
        case "PageUp":

            showSlide(currentSlide - 1);
            break;

        case "Home":

            showSlide(1);
            break;

        case "End":

            showSlide(totalSlides);
            break;
    }

});

document
.querySelectorAll(".yolo-model-card")
.forEach(card => {

    card.addEventListener("click", () => {

        document
        .querySelectorAll(".yolo-model-card")
        .forEach(c => c.classList.remove("active"));

        document
        .querySelectorAll(".yolo-model-card")
        .forEach(c => c.classList.remove("final-active"));

        document
        .querySelectorAll(".yolo-detail")
        .forEach(d => d.classList.remove("active"));

        card.classList.add("active");

        const target =
            card.dataset.target;

        if(target === "research-2"){
            card.classList.add("final-active");
        }

        document
        .getElementById(target)
        .classList.add("active");
    });

});

const modal =
document.getElementById("imageModal");

const modalImg =
document.getElementById("modalImage");

const images =
document.querySelectorAll(".zoomable-image");

images.forEach(img => {

    img.addEventListener("click", () => {

        modal.classList.add("active");

        modalImg.src = img.src;
    });

});

document
.querySelectorAll(".speed-stat-panel")
.forEach(panel => {

    panel.addEventListener("click", () => {

        if(!modal || !modalImg || !panel.dataset.imageSrc) return;

        modal.classList.add("active");

        modalImg.src = panel.dataset.imageSrc;
    });
});

document
.querySelector(".modal-close")
.addEventListener("click", () => {

    modal.classList.remove("active");

});

modal.addEventListener("click", e => {

    if(e.target === modal){

        modal.classList.remove("active");
    }

});

const vlmResultModal =
document.getElementById("vlmResultModal");

const vlmResultContent =
document.getElementById("vlmResultContent");

const vlmResultTitle =
document.getElementById("vlmResultTitle");

document
.querySelectorAll(".vlm-result-button, .vlm-flow-output-button")
.forEach(button => {

    button.addEventListener("click", () => {

        const template =
        document.getElementById(button.dataset.resultTarget);

        if(!template || !vlmResultModal || !vlmResultContent) return;

        vlmResultContent.textContent =
        template.innerHTML.trim();

        if(vlmResultTitle){
            vlmResultTitle.textContent =
            button.dataset.modalTitle ||
            (
                button.classList.contains("danger")
                ? "실제 화재 VLM 분석 결과"
                : "가짜 화재 VLM 분석 결과"
            );
        }

        vlmResultModal.classList.add("active");
    });
});

document
.querySelector(".vlm-result-close")
?.addEventListener("click", () => {

    vlmResultModal.classList.remove("active");
});

vlmResultModal
?.addEventListener("click", e => {

    if(e.target === vlmResultModal){

        vlmResultModal.classList.remove("active");
    }
});

document
.querySelectorAll("[data-template-source]")
.forEach(target => {

    const template =
    document.getElementById(target.dataset.templateSource);

    if(!template) return;

    target.textContent =
    template.innerHTML.trim();
});
