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

  loginUser: () => {},
};

export default YummgyApi;
