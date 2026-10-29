const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const analyzeBtn = document.getElementById('analyzeBtn');
const status = document.querySelector('.status');

const scrollButtons = document.querySelectorAll('[data-scroll-target]');

scrollButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-scroll-target');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const renderFiles = (files) => {
  if (!files || files.length === 0) {
    fileList.innerHTML = '<li>No files selected</li>';
    return;
  }

  fileList.innerHTML = Array.from(files)
    .map((file) => `<li>${file.name}</li>`)
    .join('');
};

fileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  renderFiles(files);
  status.textContent = files.length > 0 ? `${files.length} files queued` : 'Ready';
  status.className = 'status idle';
});

analyzeBtn.addEventListener('click', () => {
  const files = fileInput.files;

  if (!files || files.length === 0) {
    status.textContent = 'Select files first';
    status.className = 'status idle';
    return;
  }

  status.textContent = 'Analyzing…';
  status.className = 'status idle';

  analyzeBtn.textContent = 'Processing…';
  analyzeBtn.disabled = true;

  setTimeout(() => {
    status.textContent = 'Ready for review';
    status.className = 'status idle';
    analyzeBtn.textContent = 'Analyze evidence';
    analyzeBtn.disabled = false;

    const cards = document.querySelectorAll('.result-card');
    cards.forEach((card, index) => {
      card.style.transform = 'translateY(-3px)';
      card.style.transition = '180ms ease';
      setTimeout(() => {
        card.style.transform = 'translateY(0)';
      }, 160 + index * 60);
    });
  }, 1400);
});
