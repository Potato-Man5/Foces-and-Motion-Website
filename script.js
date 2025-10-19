// script.js — behaviour for the community-oriented site

// Basic section navigation
const navButtons = Array.from(document.querySelectorAll('.nav-btn'));
const ctaButtons = Array.from(document.querySelectorAll('[data-target]'));
const sections = Array.from(document.querySelectorAll('.section'));
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.querySelector('.modal-close');
const mobileToggle = document.getElementById('mobileToggle');
const mainNav = document.querySelector('.main-nav');
const yearSpan = document.getElementById('year');

yearSpan.textContent = new Date().getFullYear();

// show/hide sections
function showSection(id) {
  sections.forEach(s => {
    if (s.id === id) s.classList.add('active');
    else s.classList.remove('active');
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// attach nav behaviour
navButtons.forEach(btn => {
  btn.addEventListener('click', () => showSection(btn.dataset.target));
});
ctaButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const t = btn.dataset.target;
    if (t) showSection(t);
  });
});

// mobile menu toggle
mobileToggle.addEventListener('click', () => {
  if (mainNav.style.display === 'flex') {
    mainNav.style.display = '';
  } else {
    mainNav.style.display = 'flex';
    mainNav.style.flexDirection = 'column';
    mainNav.style.gap = '8px';
    mainNav.style.background = 'white';
    mainNav.style.padding = '10px';
    mainNav.style.position = 'absolute';
    mainNav.style.right = '18px';
    mainNav.style.top = '64px';
    mainNav.style.borderRadius = '10px';
    mainNav.style.boxShadow = '0 8px 22px rgba(2,6,23,0.12)';
  }
});

// Modal content for each community problem
const problems = {
  road: {
    title: "Road Safety & Braking Distance",
    content: `
      <h3>Road Safety & Braking Distance</h3>
      <p class="muted">Why it matters: stopping distance increases with speed and with slippery roads. In communities, this affects pedestrian safety and crash risk.</p>
      <h4>Physics idea</h4>
      <p>Braking distance is influenced by friction (f = μN) and the kinetic energy that must be dissipated. A rough rule: stopping distance grows roughly with the square of speed.</p>
      <h4>Community actions</h4>
      <ul>
        <li>Maintain road surfaces (reduce water pooling and oil buildup).</li>
        <li>Use public awareness (reduce speed in school zones, install speed humps where needed).</li>
        <li>Encourage vehicle upkeep (good tires significantly improve friction).</li>
      </ul>
      <p class="small muted">Example: reducing speed from 60 km/h to 50 km/h significantly shortens stopping distance — a small change with big safety impact.</p>
    `
  },
  roof: {
    title: "Typhoon Winds & Roof Stability",
    content: `
      <h3>Typhoon Winds & Roof Stability</h3>
      <p class="muted">Why it matters: uplift forces during storms can tear off roofs, causing injury and secondary damage.</p>
      <h4>Physics idea</h4>
      <p>Wind creates areas of low pressure above a roof; the pressure difference can create an uplift force. Fastening, aerodynamic shapes, and continuous ties reduce uplift.</p>
      <h4>Community actions</h4>
      <ul>
        <li>Use proper fasteners and clip systems to secure roof sheeting.</li>
        <li>Community workshops on reinforcing roofs using affordable techniques.</li>
        <li>Barangay inspections to identify at-risk houses and priority retrofits.</li>
      </ul>
      <p class="small muted">Small preventive reinforcement often costs far less than rebuilding after failure.</p>
    `
  },
  ramp: {
    title: "Carrying Loads & Ramps",
    content: `
      <h3>Carrying Loads & Ramps</h3>
      <p class="muted">Why it matters: too-steep ramps are dangerous and make daily work much harder for vendors, wheelchair users, and barangay staff.</p>
      <h4>Physics idea</h4>
      <p>On a slope, the component of gravity along the ramp is mg sin(θ). Lowering θ (the slope angle) reduces the force needed to push or hold a load.</p>
      <h4>Community actions</h4>
      <ul>
        <li>Set maximum slope guidelines for public ramps (e.g., follow local accessibility standards).</li>
        <li>Local simple audits: measure ramp slope with a smartphone protractor app.</li>
        <li>Simple repair campaigns to reduce steepness where possible.</li>
      </ul>
      <p class="small muted">Example activity: students measure ramp angles and calculate push force estimates to propose improvements.</p>
    `
  },
  bridge: {
    title: "Bridges & Public Structure Safety",
    content: `
      <h3>Bridges & Public Structure Safety</h3>
      <p class="muted">Why it matters: overloaded or poorly maintained structures risk sudden failure with large community impact.</p>
      <h4>Physics idea</h4>
      <p>Structures distribute loads through tension and compression. Knowing safe load limits and inspecting for damage is essential.</p>
      <h4>Community actions</h4>
      <ul>
        <li>Install clear signage for weight limits and vehicle restrictions.</li>
        <li>Schedule regular inspections and minor repairs before problems grow.</li>
        <li>Train local volunteers to spot corrosion, cracks, and obvious deformation.</li>
      </ul>
    `
  },
  transport: {
    title: "Sustainable Transport & Fuel Efficiency",
    content: `
      <h3>Sustainable Transport & Fuel Efficiency</h3>
      <p class="muted">Why it matters: small driving behavior changes and simple vehicle maintenance reduce fuel use and pollution.</p>
      <h4>Physics idea</h4>
      <p>Smoother acceleration and avoiding unnecessary braking reduce wasted energy. Work = force × distance and much energy is lost in stop-and-go traffic.</p>
      <h4>Community actions</h4>
      <ul>
        <li>Driver education for smoother acceleration and steady speeds.</li>
        <li>Route planning and proper vehicle servicing to improve MPG (miles per gallon).</li>
        <li>Encourage walking, cycling, and safe micro-mobility where feasible.</li>
      </ul>
    `
  }
};

// open modal with content
document.querySelectorAll('.problem .learn').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    const info = problems[id];
    if (!info) return;
    modalContent.innerHTML = info.content;
    openModal();
  });
});

// Allow clicking problem card as well
document.querySelectorAll('.problem').forEach(card => {
  card.addEventListener('click', (e) => {
    // ignore clicks on nested buttons (they also trigger)
    if (e.target.tagName.toLowerCase() === 'button' || e.target.closest('button')) return;
    const id = card.dataset.id;
    const info = problems[id];
    if (!info) return;
    modalContent.innerHTML = info.content;
    openModal();
  });
});

function openModal() {
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// --- Dark mode ---
const themeSelect = document.getElementById('theme');
const root = document.documentElement;

function applyTheme(mode) {
  if (mode === 'dark') root.classList.add('dark');
  else if (mode === 'light') root.classList.remove('dark');
  else {
    // System preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      root.classList.add('dark');
    else
      root.classList.remove('dark');
  }
}

// Initialize + event
applyTheme('system');
themeSelect.addEventListener('change', (e) => applyTheme(e.target.value));


// initialize default view
showSection('home');
