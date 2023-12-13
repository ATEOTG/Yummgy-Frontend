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
        console.log("data returns: " + data);
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
    })
      .then((result) => {
        // if (!result.ok) {
        //   console.log(result);
        // }

        return result.json();
      })
      .then((data) => {
        // if(data.)
        alert("Your user was created!" + `\nusername: ${data.yumUsername}`);
      })
      .catch((err) => console.log(err));
  },

  loginUser: () => {},
};

export default YummgyApi;
