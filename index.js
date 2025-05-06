const form = document.getElementById("search-form");
const usernameInput = document.getElementById("username");

const profileCard = document.getElementById("profile-card");
const avatarImg = document.getElementById("avatar");
const nameEl = document.getElementById("name");
const followersEl = document.getElementById("followers");
const followingEl = document.getElementById("following");
const dateEl = document.getElementById("date");
const gitsEl = document.getElementById("gits");
const repoEl = document.getElementById("repo");
const updateEl = document.getElementById("update");
const errorEl = document.getElementById("error-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();

  if (!username) {
    showError("Please enter a GitHub username.");
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("User not found");

    const data = await res.json();
    updateUI(data);
  } catch (err) {
    showError("User not found or error occurred.");
  }
});

function updateUI(data) {
  errorEl.classList.add("hidden");
  profileCard.classList.remove("hidden");

  avatarImg.src = data.avatar_url;
  nameEl.textContent = data.name || data.login;
  followersEl.textContent = data.followers;
  followingEl.textContent = data.following;
  dateEl.textContent = new Date(data.created_at).toLocaleDateString();
  gitsEl.textContent = data.public_gists;
  repoEl.textContent = data.public_repos;
  updateEl.textContent = new Date(data.updated_at).toLocaleDateString();
}

function showError(message) {
  profileCard.classList.add("hidden");
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
}
