document.addEventListener('DOMContentLoaded', () => {

  // Password Visibility Toggle
  const toggleButtons = document.querySelectorAll('.toggle-password');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);

      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          btn.classList.remove('fa-eye-slash');
          btn.classList.add('fa-eye');
        } else {
          input.type = 'password';
          btn.classList.remove('fa-eye');
          btn.classList.add('fa-eye-slash');
        }
      }
    });
  });

  // Login Form API Call
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const inputs = loginForm.querySelectorAll('input');
      const email = inputs[0].value.trim();
      const password = inputs[1].value;

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          window.location.href = 'profile.html';
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert('Server error. Please make sure server.js is running.');
      }
    });
  }

  // Register Form API Call
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const inputs = registerForm.querySelectorAll('input');
      const fullName = inputs[0].value.trim();
      const email = inputs[1].value.trim();
      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, password })
        });

        const data = await response.json();

        if (data.success) {
          alert('Account created successfully!');
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          window.location.href = 'profile.html';
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert('Server error. Please make sure server.js is running.');
      }
    });
  }

  // Social Login Handler (Google & Microsoft)
  const socialButtons = document.querySelectorAll('.social-btn');
  socialButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const btnText = btn.innerText.toLowerCase();
      const provider = btnText.includes('google') ? 'Google' : 'Microsoft';

      const mockUser = {
        fullName: `${provider} User`,
        email: `user@${provider.toLowerCase()}.com`,
        provider: provider
      };

      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      alert(`Successfully logged in with ${provider}!`);
      window.location.href = 'profile.html';
    });
  });

});