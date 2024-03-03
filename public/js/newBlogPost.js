const newFormHandler = async function (event) {
  event.preventDefault();
  const title = document.querySelector('input[name="blogPost-title"]').value;
  const body = document.querySelector('textarea[name="blogPost-body"]').value;
  await fetch(`/api/blogs`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  document.location.replace('/dashboard');
};
document
  .querySelector('#new-blogPost-form')
  .addEventListener('submit', newFormHandler);





