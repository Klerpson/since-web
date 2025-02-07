// WhatsApp functionality
document.addEventListener("DOMContentLoaded",function(){var e=/iPhone|Android|iPad|iPod|Windows Phone|webOS|BlackBerry|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent),t=window.location.href,o=document.querySelectorAll("a#lead_whatsapp");o.forEach(function(o){var n="Hi! I need more info about this: "+encodeURIComponent(t),a="https://wa.me/16143843087?text="+n,r="https://web.whatsapp.com/send?phone=16143843087&text="+n;e?o.setAttribute("href",a):o.setAttribute("href",r)})});

document.addEventListener('DOMContentLoaded', () => {
  const toggleArrows = document.querySelectorAll('.toggle-arrow');
  const isMobile = () => window.innerWidth <= 1200;

  toggleArrows.forEach(arrow => {
    arrow.addEventListener('click', (e) => {
      // Solo prevenir navegación y manejar clic en móvil
      if (isMobile()) {
        e.preventDefault();
        const submenuWrapper = arrow.closest('.has-submenu').querySelector('.submenu');
        
        // Cerrar otros submenús abiertos
        document.querySelectorAll('.submenu.open').forEach(menu => {
          if (menu !== submenuWrapper) {
            menu.classList.remove('open');
            menu.closest('.has-submenu').querySelector('.toggle-arrow').classList.remove('rotated');
          }
        });

        // Toggle del submenú actual
        submenuWrapper.classList.toggle('open');
        arrow.classList.toggle('rotated');
      }
    });
  });

  // Cerrar submenús al hacer clic fuera (solo en móvil)
  document.addEventListener('click', (e) => {
    if (isMobile() && !e.target.closest('.has-submenu')) {
      document.querySelectorAll('.submenu.open').forEach(menu => {
        menu.classList.remove('open');
        menu.closest('.has-submenu').querySelector('.toggle-arrow').classList.remove('rotated');
      });
    }
  });
});


// Social float functionality
document.addEventListener('scroll', function() {
  const postContainer = document.querySelector('.post-container');
  
  if (!postContainer) return;
  
  const socialFloat = document.querySelector('.social-float');
  const postHeader = document.querySelector('.post-header');
  const footer = document.querySelector('.footer');
  
  if (!socialFloat || !postHeader || !footer) return;
  
  const headerBottom = postHeader.offsetTop + postHeader.offsetHeight;
  const footerTop = footer.offsetTop;
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > headerBottom && scrollPosition < footerTop - 500) {
    socialFloat.style.opacity = '1';
    socialFloat.style.visibility = 'visible';
  } else {
    socialFloat.style.opacity = '0';
    socialFloat.style.visibility = 'hidden';
  }
});

// Slider functionality
document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll('.slider-container');
  
  sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;
    let momentum = 0;
    let lastX;
    let requestId;

    const start = (e) => {
      isDown = true;
      slider.classList.add('dragging');
      startX = e.pageX || e.touches?.[0].pageX;
      lastX = startX;
      scrollLeft = slider.scrollLeft;
      momentum = 0;
      
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
    };

    const move = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX || e.touches?.[0].pageX;
      const walk = (x - startX) * 1.5; 

      momentum = x - lastX;
      lastX = x;
      
      slider.scrollLeft = scrollLeft - walk;
    };

    const end = () => {
      if (!isDown) return;
      isDown = false;
      slider.classList.remove('dragging');
      
      if (Math.abs(momentum) > 1) {
        applyMomentum();
      }
    };

    const applyMomentum = () => {
      const deceleration = 0.95; 
      
      const animate = () => {
        if (Math.abs(momentum) > 0.1) {
          slider.scrollLeft -= momentum;
          momentum *= deceleration;
          requestId = requestAnimationFrame(animate);
        }
      };
      
      requestId = requestAnimationFrame(animate);
    };

    slider.addEventListener('mousedown', start);
    slider.addEventListener('mousemove', move);
    slider.addEventListener('mouseleave', end);
    slider.addEventListener('mouseup', end);

    slider.addEventListener('touchstart', start);
    slider.addEventListener('touchmove', move);
    slider.addEventListener('touchend', end);
  });
});

/*funcionalidad de el scroll*/

document.addEventListener('DOMContentLoaded', function() {
  const scrollButton = document.getElementById('scroll-to-top');

  // Mostrar/ocultar el botón basado en el scroll
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) { // Mostrar después de 300px de scroll
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  });

  // Función para scroll hacia arriba
  scrollButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
