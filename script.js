//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-button');
  const clearButton = document.getElementById('clear-button');
  const toastsContainer = document.getElementById('toasts');
  const successRadio = document.getElementById('success');
  const errorRadio = document.getElementById('error');
  const messageContent = document.getElementById('message-content');
  const durationInput = document.getElementById('duration');
  const cancelableCheckbox = document.getElementById('cancelable');

  addButton.addEventListener('click', createToast);
  clearButton.addEventListener('click', clearToasts);

  function createToast() {
    const isSuccess = successRadio.checked;
    const isError = errorRadio.checked;
    const message = messageContent.value.trim() || (isSuccess ? 'Success!' : 'Error.');
    let duration = parseInt(durationInput.value);
    if (isNaN(duration) || duration < 500) {
      duration = 500;
    }
    const isCancelable = cancelableCheckbox.checked;

    const toast = document.createElement('div');
    toast.classList.add('toast', isSuccess ? 'success-toast' : 'error-toast');

    const messageParagraph = document.createElement('p');
    messageParagraph.classList.add('message');
    messageParagraph.textContent = message;
    toast.appendChild(messageParagraph);

    if (isCancelable) {
      const cancelButton = document.createElement('button');
      cancelButton.classList.add('cancel-button');
      cancelButton.textContent = 'X';
      cancelButton.addEventListener('click', () => {
        toastsContainer.removeChild(toast);
      });
      toast.appendChild(cancelButton);
    }

    toastsContainer.prepend(toast);

    setTimeout(() => {
      if (toast.parentElement === toastsContainer) {
        toastsContainer.removeChild(toast);
      }
    }, duration);
  }

  function clearToasts() {
    toastsContainer.innerHTML = '';
  }
});
