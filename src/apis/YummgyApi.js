const URL = "http://localhost:8080/api";

const YummgyApi = {
  getAllRecipes: (setRecipeList) => {
    fetch(URL + "/recipes/search/")
      .then((res) => res.json())
      .then((data) => {
        setRecipeList(data);
      })
      .catch((err) => {
        alert(err);
      });
  },
  searchRecipes: (search, setRecipeList) => {
    fetch(URL + `/recipes/search/${search == null ? null : search}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipeList(data);
      })
      .catch((err) => {
        alert(err);
      });
  },

  registerUser: (user) => {
    fetch(URL + "/add/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).catch((err) => {
      console.log(err);
    });
  },

  loginUser: (credentials, setJwt) => {
    fetch(URL + "/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJwt(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default YummgyApi;
