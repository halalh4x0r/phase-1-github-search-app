document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('github-form');
  const userList = document.getElementById('user-list');
  const reposList = document.getElementById('repos-list');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const search = document.getElementById('search').value;

    fetch(`https://api.github.com/search/users?q=${search}`)
      .then(response => response.json())
      .then(data => {
        userList.innerHTML = ''; // clear previous results
        reposList.innerHTML = '';
        
        data.items.forEach(user => {
          const li = document.createElement('li');
          li.innerHTML = `
            <img src="${user.avatar_url}" width="50" height="50" />
            <a href="${user.html_url}" target="_blank">${user.login}</a>
          `;
          userList.appendChild(li);

          // Optional: Fetch and display repos
          li.addEventListener('click', () => {
            fetch(`https://api.github.com/users/${user.login}/repos`)
              .then(resp => resp.json())
              .then(repos => {
                reposList.innerHTML = '';
                repos.forEach(repo => {
                  const repoLi = document.createElement('li');
                  repoLi.textContent = repo.name;
                  reposList.appendChild(repoLi);
                });
              });
          });
        });
      })
      .catch(error => {
        console.error('Error fetching GitHub users:', error);
      });
  });
});
