import { useEffect, useState } from "react";
import CookbookInfo from "../bricks/CookbookInfo"
import { useSearchParams } from "react-router-dom";
import Recipe from "../bricks/Recipe";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "../css/recipeList.module.css";

function RecipeList() {

  const cookbook = {
    name: "Kucharka"
  };

  const [recipeLoadCall, setRecipeLoadCall] = useState({
    state: "pending",
  });
  let [searchParams] = useSearchParams();

  const recipeId = searchParams.get("id");

  useEffect(() => {
    setRecipeLoadCall({
      state: "pending",
    });
    fetch(`http://localhost:3000/recipe/load?id=${recipeId}`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeLoadCall({ state: "error", error: responseJson });
      } else {
        setRecipeLoadCall({ state: "success", data: responseJson });
      }
    });
  }, [recipeId]);

  function getChild() {
    switch (recipeLoadCall.state) {
      case "pending":
        return (
          <div className={styles.loading}>
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case "success":
        return (
          <>
            <Recipe classroom={recipeLoadCall.data} />
          </>
        );
      case "error":
        return (
          <div className={styles.error}>
            <div>Nepodařilo se načíst data o receptu.</div>
            <br />
            <pre>{JSON.stringify(recipeLoadCall.error, null, 2)}</pre>
          </div>
        );
      default:
        return null;
    }
  }

  return <div>
  <CookbookInfo cookbook={cookbook}/>
  {getChild()}
</div>;
}

export default RecipeList;