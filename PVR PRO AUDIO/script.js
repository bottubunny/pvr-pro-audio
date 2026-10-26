
const WHATSAPP_NUMBER = "919177080706";

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isExpanded = navLinks.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isExpanded);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Automatically update the footer year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Prevent selecting a past event date
const eventDateInput = document.getElementById("eventDate");

if (eventDateInput) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  eventDateInput.min = `${year}-${month}-${day}`;
}

// Service buttons automatically select the service
const serviceButtons = document.querySelectorAll(".service-btn");
const serviceSelect = document.getElementById("service");

serviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const serviceName = button.dataset.service;

    if (serviceSelect && serviceName) {
      serviceSelect.value = serviceName;
    }

    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// Enquiry form: prepare a WhatsApp message
const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!enquiryForm.checkValidity()) {
      enquiryForm.reportValidity();
      return;
    }

    const formData = new FormData(enquiryForm);

    const name = formData.get("name") || "";
    const phone = formData.get("phone") || "";
    const service = formData.get("service") || "";
    const eventDate = formData.get("eventDate") || "";
    const location = formData.get("location") || "";
    const message = formData.get("message") || "";

    const whatsappMessage =
      `Hello PVR Pro Audio! I would like to make an enquiry.\n\n` +
      `Name: ${name}\n` +
      `My Phone: ${phone}\n` +
      `Service Required: ${service}\n` +
      `Event Date: ${eventDate}\n` +
      `Event Location: ${location}\n` +
      `Additional Details: ${message}`;

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank");
  });
}
