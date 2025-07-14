const preview = document.getElementById('preview-img');
const selectors = document.querySelectorAll('.selector');

selectors.forEach(sel => {
  sel.addEventListener('click', () => {
    preview.src = sel.dataset.preview;
  });
});
