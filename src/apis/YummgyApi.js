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
    fetch(
      URL +
        "/api/patch/recipe/?" +
        new URLSearchParams({
          prep_time: recipeObj.prep_time,
          directions: recipeObj.directions,
          recipeId: recipeObj.recipeId,
          title: recipeObj.title,
          ingredients: recipeObj.ingredients,
          food_image_url: recipeObj.food_image_url,
        }),
      {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  deleteRecipe: (id, setUserRecipe) => {
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
      .then(() => {
        this.getUserRecipes(setUserRecipe);
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
        Authorization: "Bearer " + token}),
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
    fetch(URL + "/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem(
          "jwt",
          JSON.stringify({
            token: data.jwt,
          })
        );
        setJwt(sessionStorage.getItem("jwt"));
      })

      .catch((err) => {
        console.log(err);
      });
  },
};

export default YummgyApi;
