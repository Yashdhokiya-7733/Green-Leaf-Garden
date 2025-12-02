# 🌿 Green Leaf Garden - Luxury Landscaping Portfolio

**Green Leaf Garden** is a high-end, responsive portfolio website designed for a luxury landscaping firm specializing in Miyawaki forests, resort-style gardens, and sustainable commercial landscapes.

The project features a modern, elegant design with advanced interactive elements, ensuring a premium user experience that reflects the quality of the services offered.

## ✨ Key Features

  * **Luxury Aesthetic:** A sophisticated color palette (Deep Forest Green & Gold) using CSS variables and a custom design system.
  * **Interactive Hero Section:** Features a dynamic particle system and parallax scrolling effects.
  * **Before/After Portfolio Sliders:** Custom-built interactive image sliders to showcase landscape transformations.
  * **Miyawaki Forest Focus:** Dedicated sections highlighting sustainable forest development services.
  * **Smooth Animations:**
      * Scroll-triggered fade-ins (Intersection Observer).
      * Animated statistical counters.
      * Floating service icons.
  * **Functional Contact Form:** Includes real-time validation and UI feedback states.
  * **Responsive Design:** Fully optimized for mobile, tablet, and desktop with a custom mobile hamburger menu.
  * **Lightbox Gallery:** Custom modal implementation for viewing project details.
  * **Direct Communication:** Integrated WhatsApp floating action button.

## 🛠️ Tech Stack

This project is built using **Vanilla Web Technologies** with no external framework dependencies (No Bootstrap, jQuery, or Tailwind), ensuring high performance and clean code.

  * **HTML5:** Semantic markup structure.
  * **CSS3:**
      * Extensive use of CSS Custom Properties (Variables) for theming.
      * Flexbox & CSS Grid layouts.
      * Backdrop filters and gradients.
      * Keyframe animations.
  * **JavaScript (ES6+):**
      * Object-Oriented Programming (Class-based structure).
      * `IntersectionObserver` API for scroll animations.
      * DOM manipulation for sliders and modals.

## 📂 File Structure

```text
/
├── index.html    # Main structure and content
├── style.css     # Design system, variables, and responsive styling
├── app.js        # Logic for animations, sliders, and form validation
└── README.md     # Project documentation
```

## 🚀 How to Run

1.  **Clone or Download** the repository to your local machine.
2.  Ensure `index.html`, `style.css`, and `app.js` are in the same directory.
3.  **Open** `index.html` in your preferred web browser (Chrome, Firefox, Safari, Edge).

*Note: For the best development experience, it is recommended to run this using a local server (like Live Server in VS Code) to avoid CORS issues with local image loading, although the current implementation uses external Unsplash URLs and should work directly.*

## 🎨 Customization Guide

### Changing Colors

The entire color scheme is managed via CSS variables in `style.css`. Look for the `:root` selector at the top of the file to adjust the "Luxury Theme":

```css
:root {
  --luxury-gold: #DAA520;
  --luxury-green: #0D2B1D;
  /* ... */
}
```

### Updating Images

The project currently uses **Unsplash** source URLs. To use your own images:

1.  Create an `images/` folder.
2.  Add your image files.
3.  Update the `src` attributes in `index.html` and background URLs in `style.css`.

### Contact Information

To update the contact details, edit the **Contact Section** in `index.html`:

  * **Phone:** Line \~475 (`+91 75671 22716`)
  * **Email:** Line \~481 (`yash7733@aol.com`)
  * **Address:** Line \~487

## 🧩 Javascript Logic Overview

The `app.js` file is organized into a single class `EliteLandscapes`. The initialization process sets up all event listeners automatically:

```javascript
class EliteLandscapes {
  constructor() {
    this.init();
  }
  
  init() {
    // Sets up particles, scroll animations, sliders, forms, etc.
  }
}
```

Key methods include:

  * `initPortfolioSliders()`: Handles the drag logic for Before/After images.
  * `initScrollAnimations()`: A lightweight alternative to the AOS library.
  * `initContactForm()`: Handles validation and simulated submission.

## 📄 License

This project is open-source and available for personal and commercial use.
