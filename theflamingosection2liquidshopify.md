{% schema %}
{
  "name": "Product Carousel",
  "settings": [
    {
      "type": "collection",
      "id": "collection",
      "label": "Select Collection"
    },
    {
      "type": "range",
      "id": "limit",
      "min": 3,
      "max": 20,
      "step": 1,
      "default": 8,
      "label": "Number of products"
    }
  ],
  "presets": [
    {
      "name": "Product Carousel"
    }
  ]
}
{% endschema %}

<section id="section-{{ section.id }}" class="relative h-screen flex items-center overflow-hidden px-[5vw]">

  <!-- Carousel -->
  <div id="carousel-{{ section.id }}" class="flex gap-6 md:gap-10 transition-transform duration-700">

    {% assign collection = collections[section.settings.collection] %}

    {% for product in collection.products limit: section.settings.limit %}
      <div class="item w-[220px] md:w-[300px] h-[320px] md:h-[450px] shrink-0 cursor-pointer transition-all duration-500">

        <a href="{{ product.url }}" class="block w-full h-full relative">
          
          {% if product.featured_image %}
            <img 
              src="{{ product.featured_image | image_url: width: 600 }}" 
              alt="{{ product.title }}"
              class="w-full h-full object-cover"
            >
          {% endif %}

          <!-- Optional overlay -->
          <div class="absolute bottom-2 left-2 text-white text-sm">
            {{ product.title }}
          </div>

        </a>

      </div>
    {% endfor %}

  </div>

</section>

<!-- Cursor -->
<div id="cursor-{{ section.id }}" class="fixed text-2xl pointer-events-none z-50 hidden md:block">→</div>

<script>
(function() {
  const section = document.getElementById("section-{{ section.id }}");
  const carousel = document.getElementById("carousel-{{ section.id }}");
  const cursor = document.getElementById("cursor-{{ section.id }}");

  const items = carousel.querySelectorAll(".item");

  let index = 0;

  function update() {
    if (!items.length) return;

    const itemWidth = items[0].offsetWidth;
    const gap = window.innerWidth < 768 ? 24 : 40;

    const center = (window.innerWidth / 2) - (itemWidth / 2);
    const offset = index * (itemWidth + gap);

    carousel.style.transform = `translateX(${center - offset}px)`;

    items.forEach((el, i) => {
      el.classList.toggle("scale-125", i === index);
      el.classList.toggle("opacity-100", i === index);
      el.classList.toggle("z-10", i === index);

      if (i !== index) {
        el.classList.add("scale-90", "opacity-40");
      } else {
        el.classList.remove("scale-90", "opacity-40");
      }
    });
  }

  // Click / Tap
  section.addEventListener("click", (e) => {
    const clicked = e.target.closest(".item");

    if (clicked) {
      index = Array.from(items).indexOf(clicked);
    } else {
      const rect = section.getBoundingClientRect();
      const x = e.clientX;

      if (x > rect.width / 2) index = Math.min(index + 1, items.length - 1);
      else index = Math.max(index - 1, 0);
    }

    update();
  });

  // Swipe
  let startX = 0;

  section.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  section.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      index = Math.min(index + 1, items.length - 1);
    } else if (endX - startX > 50) {
      index = Math.max(index - 1, 0);
    }

    update();
  });

  // Cursor
  section.addEventListener("mousemove", (e) => {
    if (!cursor) return;

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;

    cursor.innerHTML = x > rect.width / 2 ? "→" : "←";
  });

  window.addEventListener("resize", update);

  // Init
  setTimeout(update, 200);
})();
</script>

<!-- Tailwind CDN (only if not already loaded in theme) -->
<script src="https://cdn.tailwindcss.com"></script>



🧠 How to Use (Step-by-Step)
1. Add section file
Go to Shopify Admin → Online Store → Themes
Click Edit Code
Create file:
sections/product-carousel.liquid
Paste code
2. Add to page
Go to Customize
Click Add Section
Select:
👉 Product Carousel
3. Select collection
Choose any collection
Set number of products

✅ Done — it updates automatically forever

🔥 What You Now Have

✔ Fully dynamic carousel
✔ No JS data arrays
✔ Shopify-controlled content
✔ Reusable section
✔ Scalable for real store

🚀 Next Upgrade (highly recommended)

I can enhance this with:

✨ Price + compare price
✨ Add to cart button (AJAX)
✨ Hover second image (like luxury stores)
✨ Auto-scroll / drag support

Just tell me 👍