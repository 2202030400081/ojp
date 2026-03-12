// ===== APP.JS — Core interactivity =====

// --- Navbar scroll ---
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// --- Mobile toggle ---
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.position = 'fixed';
    navLinks.style.top = '72px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'var(--bg-secondary)';
    navLinks.style.flexDirection = 'column';
    navLinks.style.padding = '24px';
    navLinks.style.gap = '16px';
    navLinks.style.borderBottom = '1px solid var(--border)';
    navLinks.style.zIndex = '999';
  });
}

// --- Counter animation ---
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value >= 1000 ? (value / 1000).toFixed(value >= 10000 ? 0 : 1) + 'K+' : value + (target < 100 ? '%' : '+');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// --- Intersection Observer for animations ---
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      if (entry.target.querySelectorAll('[data-count]').length) animateCounters();
    }
  });
}, observerOptions);

document.querySelectorAll('.section, .hero-stats').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
// Make hero visible immediately
document.querySelectorAll('.hero').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });

// --- Render Job Card ---
function createJobCard(job) {
  const saved = getSavedJobs().includes(job.id);
  return `
    <div class="job-card" onclick="viewJob(${job.id})" data-id="${job.id}">
      <div class="job-card-header">
        <div class="company-avatar" style="background:${job.gradient}">${job.companyInit}</div>
        <div class="job-card-info">
          <h3>${job.title}</h3>
          <span class="company-name">${job.company}</span>
        </div>
      </div>
      <div class="job-card-details">
        <span class="job-detail-chip"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
        <span class="job-detail-chip"><i class="fas fa-clock"></i> ${job.type}</span>
        <span class="job-detail-chip"><i class="fas fa-calendar"></i> ${job.posted}</span>
      </div>
      <div class="job-card-footer">
        <span class="job-salary">${job.salary}</span>
        <div class="job-card-actions">
          <button class="save-btn ${saved ? 'saved' : ''}" onclick="event.stopPropagation();toggleSave(${job.id},this)" aria-label="Save job">
            <i class="fa${saved ? 's' : 'r'} fa-bookmark"></i>
          </button>
          <a href="job-detail.html?id=${job.id}" class="btn btn-primary btn-sm" onclick="event.stopPropagation()">Apply</a>
        </div>
      </div>
    </div>`;
}

// --- Render Company Card ---
function createCompanyCard(c) {
  const stars = Array(5).fill(0).map((_, i) => `<i class="fas fa-star" style="color:${i < Math.floor(c.rating) ? 'var(--accent)' : 'var(--text-muted)'}"></i>`).join('');
  return `
    <div class="company-card">
      <div class="avatar" style="background:${c.gradient}">${c.init}</div>
      <h4>${c.name}</h4>
      <div class="industry">${c.industry}</div>
      <div class="company-rating">${stars}<span>${c.rating}</span></div>
      <div class="open-positions">${c.openJobs} open positions</div>
    </div>`;
}

// --- Render featured jobs on index page ---
const featuredContainer = document.getElementById('featuredJobs');
if (featuredContainer) {
  featuredContainer.innerHTML = JOBS.slice(0, 6).map(createJobCard).join('');
}

// --- Render featured companies on index page ---
const companiesContainer = document.getElementById('featuredCompanies');
if (companiesContainer) {
  companiesContainer.innerHTML = COMPANIES.slice(0, 4).map(createCompanyCard).join('');
}

// --- Render all jobs on jobs.html ---
const allJobsContainer = document.getElementById('allJobs');
if (allJobsContainer) {
  renderAllJobs(JOBS);
}
function renderAllJobs(jobs) {
  const c = document.getElementById('allJobs');
  if (!c) return;
  if (jobs.length === 0) {
    c.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted);grid-column:1/-1;"><i class="fas fa-search" style="font-size:3rem;margin-bottom:16px;display:block;"></i><p>No jobs found matching your criteria.</p></div>';
    return;
  }
  c.innerHTML = jobs.map(createJobCard).join('');
}

// --- Search & Filter ---
function searchJobs() {
  const keyword = (document.getElementById('searchKeyword')?.value || '').toLowerCase();
  const location = (document.getElementById('searchLocation')?.value || '').toLowerCase();
  const type = document.getElementById('searchType')?.value || '';
  const salaryFilter = document.getElementById('searchSalary')?.value || '';
  let filtered = JOBS.filter(j => {
    const matchK = !keyword || j.title.toLowerCase().includes(keyword) || j.company.toLowerCase().includes(keyword) || j.skills.some(s => s.toLowerCase().includes(keyword));
    const matchL = !location || j.location.toLowerCase().includes(location);
    const matchT = !type || j.type === type;
    return matchK && matchL && matchT;
  });
  if (salaryFilter) {
    filtered = filtered.filter(j => {
      const min = parseInt(j.salary.replace(/[^0-9]/g, ''));
      if (salaryFilter === '0-50') return min < 50;
      if (salaryFilter === '50-100') return min >= 50 && min < 100;
      if (salaryFilter === '100-150') return min >= 100 && min < 150;
      if (salaryFilter === '150+') return min >= 150;
      return true;
    });
  }
  renderAllJobs(filtered);
  const countEl = document.getElementById('jobCount');
  if (countEl) countEl.textContent = filtered.length;
}

function viewJob(id) { window.location.href = `job-detail.html?id=${id}`; }

// --- Save Jobs ---
function getSavedJobs() {
  try { return JSON.parse(localStorage.getItem('savedJobs') || '[]'); } catch { return []; }
}
function toggleSave(id, btn) {
  let saved = getSavedJobs();
  if (saved.includes(id)) {
    saved = saved.filter(s => s !== id);
    btn.classList.remove('saved');
    btn.querySelector('i').className = 'far fa-bookmark';
    showToast('Job removed from saved', 'info');
  } else {
    saved.push(id);
    btn.classList.add('saved');
    btn.querySelector('i').className = 'fas fa-bookmark';
    showToast('Job saved!', 'success');
  }
  localStorage.setItem('savedJobs', JSON.stringify(saved));
}

// --- Toasts ---
function showToast(msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}" style="color:var(--${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'secondary'})"></i><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// --- Job Detail Page ---
function loadJobDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const job = JOBS.find(j => j.id === id);
  if (!job) return;
  const el = document.getElementById('jobDetail');
  if (!el) return;
  el.innerHTML = `
    <div class="job-detail-hero">
      <div class="top-row">
        <div class="company-logo" style="background:${job.gradient}">${job.companyInit}</div>
        <div>
          <h1>${job.title}</h1>
          <a class="company-link" href="#">${job.company}</a>
          <div class="job-meta-row">
            <span class="job-meta-item"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
            <span class="job-meta-item"><i class="fas fa-briefcase"></i> ${job.type}</span>
            <span class="job-meta-item"><i class="fas fa-clock"></i> ${job.posted}</span>
            <span class="job-meta-item"><i class="fas fa-dollar-sign"></i> ${job.salary}</span>
          </div>
        </div>
      </div>
      <div class="job-detail-actions">
        <button class="btn btn-primary btn-lg" onclick="openApplyModal()"><i class="fas fa-paper-plane"></i> Apply Now</button>
        <button class="btn btn-secondary" onclick="toggleSaveDetail(${job.id}, this)"><i class="far fa-bookmark"></i> Save Job</button>
        <button class="btn btn-ghost"><i class="fas fa-share-alt"></i> Share</button>
      </div>
    </div>
    <div class="job-detail-body">
      <div class="detail-main">
        <div class="detail-section"><h3>Job Description</h3><p>${job.description}</p></div>
        <div class="detail-section"><h3>Required Skills</h3><div class="skill-tags">${job.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div></div>
        <div class="detail-section"><h3>What You'll Do</h3><ul>
          <li>Design, develop, and maintain high-quality software solutions</li>
          <li>Collaborate with cross-functional teams to define and ship new features</li>
          <li>Write clean, maintainable, and well-tested code</li>
          <li>Participate in code reviews and mentor junior team members</li>
          <li>Contribute to architectural decisions and technical strategy</li>
        </ul></div>
      </div>
      <div class="detail-sidebar">
        <div class="job-sidebar-card"><h4>Job Overview</h4>
          <div class="sidebar-info-row"><span class="label">Experience</span><span class="value">${job.experience}</span></div>
          <div class="sidebar-info-row"><span class="label">Working Hours</span><span class="value">${job.hours}</span></div>
          <div class="sidebar-info-row"><span class="label">Salary</span><span class="value">${job.salary}</span></div>
          <div class="sidebar-info-row"><span class="label">Leave Policy</span><span class="value">${job.leave}</span></div>
          <div class="sidebar-info-row"><span class="label">Job Type</span><span class="value">${job.type}</span></div>
          <div class="sidebar-info-row" style="border:none;"><span class="label">Location</span><span class="value">${job.location}</span></div>
        </div>
        <div class="job-sidebar-card"><h4>About ${job.company}</h4>
          <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.7;">A leading company in the industry, providing innovative solutions and fostering a culture of growth and excellence.</p>
          <a href="#" class="btn btn-ghost btn-sm" style="margin-top:12px;width:100%;"><i class="fas fa-external-link-alt"></i> View Company</a>
        </div>
      </div>
    </div>`;
}
function toggleSaveDetail(id, btn) {
  let saved = getSavedJobs();
  if (saved.includes(id)) { saved = saved.filter(s => s !== id); btn.innerHTML = '<i class="far fa-bookmark"></i> Save Job'; showToast('Removed from saved', 'info'); }
  else { saved.push(id); btn.innerHTML = '<i class="fas fa-bookmark"></i> Saved'; showToast('Job saved!', 'success'); }
  localStorage.setItem('savedJobs', JSON.stringify(saved));
}

// --- Apply Modal ---
function openApplyModal() {
  const modal = document.getElementById('applyModal');
  if (modal) modal.classList.add('active');
}
function closeApplyModal() {
  const modal = document.getElementById('applyModal');
  if (modal) modal.classList.remove('active');
}
function submitApplication(e) {
  e.preventDefault();
  showToast('Application submitted successfully!', 'success');
  closeApplyModal();
  e.target.reset();
}

// --- Auth Tabs ---
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.add('hidden'));
  document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
  document.getElementById(tab + 'Form')?.classList.remove('hidden');
}

// --- Dashboard Sidebar ---
function switchDashTab(tab) {
  document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
  document.querySelectorAll('.dash-tab-content').forEach(c => c.classList.add('hidden'));
  document.querySelector(`.sidebar-menu a[data-tab="${tab}"]`)?.classList.add('active');
  document.getElementById(tab)?.classList.remove('hidden');
}

// --- Post Job Form ---
function submitPostJob(e) {
  e.preventDefault();
  showToast('Job posted successfully!', 'success');
  e.target.reset();
}

// --- Profile Update ---
function saveProfile(e) {
  e.preventDefault();
  showToast('Profile updated successfully!', 'success');
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('jobDetail')) loadJobDetail();
  // Hash-based tab switching for auth pages
  if (window.location.hash === '#register') switchAuthTab('register');
  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', (e) => { if (e.target === m) m.classList.remove('active'); });
  });
});
