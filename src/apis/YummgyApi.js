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

  getUserRecipes: (setUserRecipe) => {
    const token = JSON.parse(sessionStorage.getItem("jwt")).token;

    fetch(URL + "/api/users/recipes", {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserRecipe(data);
        console.log("USER RECIPES ----");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getUserFavoriteRecipes: (setFavoriteRecipes, setSearchRecipeList) => {
    const token = JSON.parse(sessionStorage.getItem("jwt")).token;

    fetch(URL + "/api/users/favorites", {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFavoriteRecipes(data);
        setSearchRecipeList(data);
      })
      .catch((err) => {
        console.log(err);
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

  getLoggedInUser: (setUserInfo) => {
    const token = JSON.parse(sessionStorage.getItem("jwt")).token;
    fetch(URL + "/api/users/loggedin", {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updateRecipe: (recipeObj) => {
    const token = JSON.parse(sessionStorage.getItem("jwt")).token;
    fetch(URL + "/api/patch/recipe", {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
      body: JSON.stringify(recipeObj),
    })
      .then((res) => {
        if (res.status !== 200) {
          alert("Did not update since Prep Time must be a string!");
          throw new Error("Invalid input in prep time");
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  deleteRecipe: (id) => {
    const token = JSON.parse(sessionStorage.getItem("jwt")).token;

    fetch(URL + `/api/delete/recipe/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Recipe Deleted: " + data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  addRecipe: (recipe) => {
    const token = JSON.parse(sessionStorage.getItem("jwt")).token;

    fetch(URL + `/api/add/recipe`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
      body: JSON.stringify(recipe),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Recipe Created: " + data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  favoriteRecipe: () => {},

  registerUser: (user) => {
    fetch(URL + "/api/add/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).catch((err) => {
      console.log(err);
    });
  },

  loginUser: (credentials, setJwt) => {
    return new Promise((resolve, reject) => {
      fetch(URL + "/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })
        .then((res) => {
          if (res.status !== 201) {
            throw new Error("invalid login");
          }

          return res.json();
        })
        .then((data) => {
          sessionStorage.setItem(
            "jwt",
            JSON.stringify({
              token: data.jwt,
            })
          );
          setJwt(sessionStorage.getItem("jwt"));
          resolve(); // Resolve the promise if login is successful
        })
        .catch((err) => {
          reject(err); // Reject the promise if there is an error
        });
    });
  },
};

export default YummgyApi;
