document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const loginSection = document.getElementById('login-section');
  const writingSection = document.getElementById('writing-section');
  const logoutBtn = document.getElementById('logout-btn');
  const writingInput = document.getElementById('writing-input');
  const wordCounter = document.getElementById('word-counter');
  const submitWritingBtn = document.getElementById('submit-writing');
  const feedbackContent = document.getElementById('feedback-content');
  const timerElement = document.getElementById('timer');

  let timerInterval;
  let seconds = 0;
  let minutes = 0;

  const token = localStorage.getItem('token');
  if (token) {
    showWritingSection();
    startTimer();
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        showWritingSection();
        startTimer();
      } else {
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  });

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    showLoginSection();
    resetTimer();
    writingInput.value = '';
    updateWordCount();
    feedbackContent.innerHTML = '<p class="placeholder-text">Your AI-powered feedback will appear here after you submit your writing.</p>';
  });

  writingInput.addEventListener('input', updateWordCount);

  function updateWordCount() {
    const text = writingInput.value.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    wordCounter.textContent = wordCount;
    
    submitWritingBtn.disabled = wordCount < 15;
  }

  submitWritingBtn.addEventListener('click', async () => {
    const text = writingInput.value.trim();
    
    if (text.split(/\s+/).length < 25) {
      alert('Please write at least 25 words.');
      return;
    }
    
    try {
      feedbackContent.innerHTML = '<p>Getting feedback...</p>';
      
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ text })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const formattedFeedback = data.feedback
          .replace(/\n\n/g, '<br><br>')
          .replace(/\n/g, '<br>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        feedbackContent.innerHTML = formattedFeedback;
      } else {
        feedbackContent.innerHTML = `<p class="error">${data.message || 'Error getting feedback'}</p>`;
      }
    } catch (error) {
      console.error('Feedback error:', error);
      feedbackContent.innerHTML = '<p class="error">An error occurred while getting feedback. Please try again.</p>';
    }
  });

  function startTimer() {
    resetTimer();
    timerInterval = setInterval(updateTimer, 1000);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    updateTimerDisplay();
  }

  function updateTimer() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  function showLoginSection() {
    loginSection.classList.remove('hidden');
    writingSection.classList.add('hidden');
  }

  function showWritingSection() {
    loginSection.classList.add('hidden');
    writingSection.classList.remove('hidden');
  }
});