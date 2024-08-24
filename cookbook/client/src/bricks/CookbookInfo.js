import React from "react";
import styles from "../css/cookbook.module.css";
function CookbookInfo(props){
    return(
        <h1>
            <span className={styles.cookbookNameHeader}>
                {props.cookbook.name}
            </span>
        </h1>
    );
}

export default CookbookInfo;