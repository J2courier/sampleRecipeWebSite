document.addEventListener("DOMContentLoaded", () => {
    const filterSelect = document.getElementById("Filter");
    const recipeContainer = document.querySelector(".recipe-container");
    const removeFilterButton = document.querySelector(".removeFilter");

    filterSelect.addEventListener("change", () => {
        const filterValue = filterSelect.value;
        const recipeItems = recipeContainer.children;
        

        for (let item of recipeItems) {
            if (item.classList.contains(filterValue)) {
                item.style.display = "flex";
                removeFilterButton.style.visibility = "visible";
            } else {
                item.style.display = "none";
            }
        }
    });

    removeFilterButton.addEventListener("click", () => {
        const recipeItems = recipeContainer.children;
        removeFilterButton.style.visibility = "hidden";
        for (let item of recipeItems) {
            item.style.display = "flex";
        }
        filterSelect.value = "Filter";
       
    });
});
