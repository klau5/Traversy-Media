class Github {
	constructor() {
		this.client_ID = "";
		this.client_secret = "";
		this.repos_count = 5;
		this.repos_sort = "created: asc";
	}

	async getUser(user) {
		const profileResponse = await fetch(
			`https://api.github.com/users/${user}?client_id=${this.client_ID}&client_secret=${this.client_secret}`
		);

		const repoResponse = await fetch(
			`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_ID}&client_secret=${this.client_secret}`
		);

		const profileData = await profileResponse.json();

		const repos = await repoResponse.json();

		return {
			profile: profileData,
			repo: repos,
		};
	}
}
