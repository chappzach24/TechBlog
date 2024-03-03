const blogPostId = document.querySelector('input[name="blogPost-id"]').value;
const editFormHandler = async function (event) {
  event.preventDefault();
  const title = document.querySelector('input[name="blogPost-title"]').value;
  const body = document.querySelector('textarea[name="blogPost-body"]').value;

  await fetch(`/api/blogs/${blogPostId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  document.location.replace("/dashboard");
};

const deleteClickHandler = async function () {
  await fetch(`/api/blogs/${blogPostId}`, {
    method: "DELETE",
  });
  document.location.replace("/dashboard");
};
document
  .querySelector("#edit-blogPost-form")
  .addEventListener("submit", editFormHandler);
document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteClickHandler);
