const URL = "http://localhost:8080";

const YummgyApi = {
  getAllRecipes: (setRecipeList) => {
    fetch(URL + "/api/recipes/search/")
      .then((res) => res.json())
      .then((data) => {
        setRecipeList(data);
      })
      .catch((err) => {
        alert(err);
      });
  },
  searchRecipes: (search, setRecipeList) => {
    fetch(URL + `/api/recipes/search/${search == null ? null : search}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipeList(data);
      })
      .catch((err) => {
        alert(err);
      });
  },

  registerUser: (user) => {
    fetch(URL + "/api/add/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).catch((err) => {
      console.log(err);
    });
  },

  loginUser: (credentials) => {
    fetch(URL + "/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.jwt);
        localStorage.setItem(
          "jwt",
          JSON.stringify({
            token: data.jwt,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default YummgyApi;
