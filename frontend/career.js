document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const analyzeBtn = document.getElementById('analyzeBtn');

  let selectedRole = 'Software Developer'; // Default selected role

  // Handle Card Click Selection
  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove selected state from all cards
      cards.forEach(c => c.classList.remove('selected'));

      // Add selected state to the clicked card
      card.classList.add('selected');

      // Update the selected role variable
      selectedRole = card.getAttribute('data-role');
    });
  });

  // Handle Action Button Click
  analyzeBtn.addEventListener('click', () => {
    alert(`Target career selected: ${selectedRole}\nProceeding to analysis...`);
  });
});