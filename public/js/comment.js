const commentFormHandler = async function (event) {
  event.preventDefault();
  const blogPostId = document.querySelector('input[name="blogPost-id"]').value;
  const body = document.querySelector('textarea[name="comment-body"]').value;
  if (body) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        blogPostId,
        body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      document.location.replace('/login');
    }
  }
};
document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);