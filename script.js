document.addEventListener('DOMContentLoaded', () => {
  const previewHead = document.getElementById('preview-head');
  const previewFace = document.getElementById('preview-face');
  const previewBody = document.getElementById('preview-body');

  const stepButtons = document.querySelectorAll('.stepper button');
  const thumbnails = document.querySelectorAll('.bento-grid img');

  let currentStep = 'face';

  function updateThumbnails() {
    thumbnails.forEach(img => {
      img.style.display = img.dataset.step === currentStep ? 'block' : 'none';
    });
  }

  function updatePreview(src) {
    if (currentStep === 'head') previewHead.src = src;
    else if (currentStep === 'face') previewFace.src = src;
    else if (currentStep === 'body') previewBody.src = src;
  }

  stepButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      stepButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentStep = btn.dataset.step;
      updateThumbnails();
    });
  });

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      updatePreview(thumb.src);

      thumbnails.forEach(t => {
        if (t.dataset.step === currentStep) t.classList.remove('selected');
      });
      thumb.classList.add('selected');
    });
  });

  // ✅ Initial setup
  updateThumbnails();

  // ✅ Mettre une image par défaut pour chaque step
  ['head', 'face', 'body'].forEach(step => {
    const firstThumb = Array.from(thumbnails).find(t => t.dataset.step === step);
    if (firstThumb) {
      if (step === 'head') previewHead.src = firstThumb.src;
      else if (step === 'face') previewFace.src = firstThumb.src;
      else if (step === 'body') previewBody.src = firstThumb.src;

      firstThumb.classList.add('selected');
    }
  });

  const downloadBtn = document.querySelector('.download-btn');

  downloadBtn.addEventListener('click', () => {
    const scale = 10; // ✅ Export en x4
    const baseWidth = previewBody.naturalWidth;
    const baseHeight = previewBody.naturalHeight;

    const width = baseWidth * scale;
    const height = baseHeight * scale;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(previewBody, 0, 0, width, height);
    ctx.drawImage(previewHead, 0, 0, width, height);
    ctx.drawImage(previewFace, 0, 0, width, height);

    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'avatar.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  });
});
