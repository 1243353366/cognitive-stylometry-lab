const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const analyzeBtn = document.getElementById('analyzeBtn');
const status = document.querySelector('.status');

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
});

analyzeBtn.addEventListener('click', () => {
  if (!fileInput.files || fileInput.files.length === 0) {
    status.textContent = 'Select files first';
    return;
  }

  status.textContent = 'Analyzing…';
  analyzeBtn.textContent = 'Processing…';
  analyzeBtn.disabled = true;

  setTimeout(() => {
    status.textContent = 'Ready for review';
    analyzeBtn.textContent = 'Analyze evidence';
    analyzeBtn.disabled = false;
  }, 1200);
});

