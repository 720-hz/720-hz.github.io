(function () {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('contact-status');
  var submitBtn = document.getElementById('contact-submit');
  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/ziadkhaledshatah@gmail.com';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'contact-status';

    var payload = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      _subject: form._subject.value,
      _template: form._template.value
    };

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().then(function (data) { return { ok: res.ok, data: data }; });
      })
      .then(function (result) {
        if (result.ok) {
          status.textContent = "Sent — thanks! I'll reply from ziadkhaledshatah@gmail.com.";
          status.classList.add('ok');
          form.reset();
        } else {
          throw new Error((result.data && result.data.message) || 'Submission failed');
        }
      })
      .catch(function (err) {
        status.textContent = 'Something went wrong (' + err.message + '). Email me directly instead.';
        status.classList.add('err');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      });
  });
})();
