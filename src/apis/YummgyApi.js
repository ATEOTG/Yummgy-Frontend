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

  recipesSortByLatest: (setRecipeList) => {
    fetch(URL + "/api/recipes/latest/20")
      .then((res) => res.json())
      .then((data) => {
        setRecipeList(data);
      })
      .catch((err) => {
        alert(err);
      });
  },

  recipesSortByPrep: (setRecipeList) => {
    fetch(URL + "/api/recipes/search/preptime/")
      .then((res) => res.json())
      .then((data) => {
        setRecipeList(data);
      })
      .catch((err) => {
        alert(err);
      });
  },

  getAllAccounts: (setAccountList) => {
    fetch(URL + "/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAccountList(data);
      })
      .catch((err) => {
        alert(err);
      });
  },

  getLoggedInUserRecipes: (setUserRecipe) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getUserRecipes: (userId, setUserRecipe) => {
    console.log("UserId: " + userId);
    fetch(URL + `/api/users/${userId}/recipes`)
      .then((res) => res.json())
      .then((data) => {
        setUserRecipe(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getLoggedInUserFavoriteRecipes: (setFavoriteRecipes, setSearchRecipeList) => {
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
      .catch((err) => {});
  },

  getUserFavoriteRecipes: (userId, setFavoriteRecipes, setUserRecipe) => {
    console.log("userId: " + userId);
    fetch(URL + `/api/users/${userId}/favorites`)
      .then((res) => res.json())
      .then((data) => {
        setFavoriteRecipes(data);
        setUserRecipe(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  searchRecipes: (ordering, isAscending, amount, search, setRecipeList) => {
    fetch(
      URL +
        `/api/recipes/search/${ordering}/${
          isAscending ? "ASC" : "DESC"
        }/${amount}/${search == null ? null : search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRecipeList(data);
      })
      .catch((err) => {
        alert(err);
      });
  },

  searchRecipesAll: (setRecipeList) => {
    fetch(URL + `/api/recipes/search/recipeId/DESC/100/`)
      .then((res) => res.json())
      .then((data) => {
        setRecipeList(data);
      })
      .catch((err) => {
        alert(err);
      });
  },

  searchAccount: (search, setAccountList) => {
    fetch(URL + `/api/users/search/${search == null ? null : search}`)
      .then((res) => res.json())
      .then((data) => {
        setAccountList(data);
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

  updateRecipeAdmin: (recipeObj) => {
    const token = JSON.parse(sessionStorage.getItem("jwt")).token;
    fetch(URL + "/api/admin/patch/recipe", {
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
        console.log("Recipe Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  deleteRecipeAdmin: (id) => {
    const token = JSON.parse(sessionStorage.getItem("jwt")).token;

    fetch(URL + `/api/admin/delete/recipe/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Recipe Deleted (Admin)");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  addRecipe: (recipe) => {
    const token = JSON.parse(sessionStorage.getItem("jwt")).token;

    return new Promise((resolve, reject) => {
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
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addFavorite: (recipeId) => {
    const token = JSON.parse(sessionStorage.getItem("jwt")).token;

    fetch(URL + `/api/add/recipe/favorite/${recipeId}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Recipe Favorited");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  deleteFavorite: (id) => {
    const token = JSON.parse(sessionStorage.getItem("jwt")).token;

    fetch(URL + `/api/add/recipe/favorite/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    }).catch((err) => {
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

  loginUser: (credentials, setIsUserLogged) => {
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
          setIsUserLogged(true);
          resolve(); // Resolve the promise if login is successful
        })
        .catch((err) => {
          reject(err); // Reject the promise if there is an error
        });
    });
  },

  getRecipeFavoritedList: (setUserFavoritedList, recipeId) => {
    fetch(URL + `/api/recipes/favorites/users/${recipeId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserFavoritedList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default YummgyApi;
