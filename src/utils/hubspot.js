import axios from "axios";
import Swal from "sweetalert2";

export const submitToHubspot = async (data, pathname, pageName, t) => {
  // Determine standard CRM values based on the pathname
  let category = "";
  let training = "";

  if (pathname.includes("web-dev-essentials")) {
    category = "Computer science"; // CRM value as requested
    training = "Web DevStarter";
  } else if (pathname.includes("ui-ux-design")) {
    category = "Design";
    training = "UX/UI Design";
  } else if (pathname.includes("ecommerce")) {
    category = "Digital Marketing";
    training = "E-commerce";
  } else if (pathname.includes("generative-ai-automation")) {
    category = "Data and AI";
    training = "Generative AI & Automation";
  } else if (pathname.includes("power-bi")) {
    category = "Data and AI";
    training = "Data Analytics & Visualization";
  } else if (pathname.includes("cybersecurity")) {
    category = "Cyber security";
    training = pathname.includes("introduction") 
      ? "CyberStarter" 
      : "Cybersecurity Bootcamp";
  }

  // Split name if only one field is provided, or use provided firstname/lastname
  let firstname = data.firstName || "";
  let lastname = data.lastName || "";
  if (data.name) {
    const parts = data.name.trim().split(" ");
    firstname = parts[0] || "";
    lastname = parts.slice(1).join(" ") || "";
  }

  // Format phone number
  const fullPhone = `+213${data.phone?.replace(/^0+/, "") || ""}`;

  const payload = {
    fields: [
      { name: "firstname", value: firstname },
      { name: "lastname", value: lastname },
      { name: "phone", value: fullPhone },
      { name: "email", value: data.email || "" },
      { name: "categorie_de_formation", value: data.category || category },
      { name: "formation", value: data.training || training },
      { name: "message", value: data.message || "" },
      { name: "hs_lead_status", value: "NEW" },
    ],
    context: {
      pageUri: window.location.href,
      pageName: pageName || document.title,
    },
  };

  try {
    const portalId = "146288650";
    const formId = "b67c0977-273e-44bb-8ff4-1ae763675160";

    await axios.post(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    Swal.fire({
      icon: "success",
      title: t ? t('contact.successTitle', "Merci pour ton inscription !") : "Merci pour ton inscription !",
      html: t 
        ? t('contact.successMessage', `Votre formulaire a bien été envoyé.<br/>Notre équipe pédagogique vous contactera sous 24h.`) 
        : `Votre formulaire a bien été envoyé.<br/>Notre équipe pédagogique vous contactera sous 24h.`,
      confirmButtonText: "OK",
      confirmButtonColor: "#294CFF"
    });

    return true;
  } catch (error) {
    console.error("HubSpot form error:", error);
    Swal.fire({
      icon: "error",
      title: "Oups...",
      text: t ? t('contact.errorMessage', "Une erreur est survenue. Merci de réessayer.") : "Une erreur est survenue. Merci de réessayer.",
      confirmButtonText: "OK",
      confirmButtonColor: "#294CFF"
    });
    return false;
  }
};
