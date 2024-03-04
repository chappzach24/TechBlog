const commentFormHandler = async function (event) {
  event.preventDefault();
  const blogPost_id = document.querySelector('input[name="blogPost-id"]').value;
  const comment = document.querySelector('textarea[name="comment-body"]').value;
  console.log(comment);
  if (comment) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        blogPost_id,
        comment,
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