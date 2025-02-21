document.addEventListener("DOMContentLoaded", () => {
    const addMenuForm = document.getElementById("add-menu-name");
    const addMenuBtn = document.getElementById("add-menu-btn");
    const inputContainer = document.querySelector(".input-container");
    const menuIngredientBtn = document.getElementById("menu-ingredient-btn");
    const menuIngredientInput = document.getElementById("menu-ingredient");
    const ingredientsList = document.querySelector(".ingredients-list ul");
    const instructionsList = document.querySelector(".instruction-list ul");
    const menuInstructionInput = document.getElementById("menu-instruction");
    const menuInstructionsBtn = document.getElementById("menu-instruction-btn");
    const saveRecipeBtn = document.getElementById("save-recipe-btn");
    const menuInput = document.getElementById("menu-input");
    const myMenuContainer = document.getElementById("my-menu-container").querySelector("ul");
    const displayContainer = document.querySelector(".display-input");
    const recipeDetailsDiv = document.getElementById("recipe-details");
    const displayInputButton = displayContainer.querySelector("button");



    let recipes = {};

    addMenuBtn.addEventListener("click", () => {
        displayContainer.style.border ="none";
        inputContainer.style.visibility = "visible";
        recipeDetailsDiv.style.visibility = "hidden";
    });

    menuIngredientBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const ingredientText = menuIngredientInput.value.trim();
        if (ingredientText !== "") {
            if (!document.getElementById("ingredient-label")) {
                const labelIngredient = document.createElement("h1");
                labelIngredient.textContent = "Ingredients";
                labelIngredient.id = "ingredient-label";
                ingredientsList.parentElement.insertBefore(labelIngredient, ingredientsList);
            }
            const listItem = document.createElement("li");
            listItem.textContent = ingredientText;
            ingredientsList.appendChild(listItem);
            menuIngredientInput.value = "";
            displayInputButton.style.visibility = "visible";
            displayContainer.style.border = "solid 1px black";
        } else {
            alert("Please enter an ingredient");
        }
    });

    menuInstructionsBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const instructionText = menuInstructionInput.value.trim();
        if (instructionText !== "") {
            if (!document.getElementById("instruction-label")) {
                const labelInstruction = document.createElement("h1");
                labelInstruction.textContent = "Instructions";
                labelInstruction.id = "instruction-label";
                instructionsList.parentElement.insertBefore(labelInstruction, instructionsList);
            }
            const listItem = document.createElement("li");
            listItem.textContent = instructionText;
            instructionsList.appendChild(listItem);
            menuInstructionInput.value = "";
            displayInputButton.style.visibility = "visible";
        } else {
            alert("Please enter an instruction");
        }
    });

    saveRecipeBtn.addEventListener("click", () => {
        const menuName = menuInput.value.trim();
        if (menuName === "") {
            alert("Please enter a menu name");
        } else {
            const ingredients = Array.from(ingredientsList.querySelectorAll("li")).map(li => li.textContent);
            const instructions = Array.from(instructionsList.querySelectorAll("li")).map(li => li.textContent);

            recipes[menuName] = { ingredients, instructions };

            const menuItemH1 = document.createElement("h1");
            menuItemH1.classList.add("menu-item-h1-div");
            const menuItem = document.createElement("li");
            menuItemH1.textContent = menuName;
            menuItem.classList.add("menu-item");
            menuItem.style.cursor = "pointer";
            menuItem.addEventListener("click", () => showRecipeDetails(menuName));
            menuItem.appendChild(menuItemH1);


            const buttonDiv = document.createElement("div");
            buttonDiv.classList.add("menu-item-div");
            
            const editButton = document.createElement("button");
            editButton.textContent = "+";
            editButton.classList.add("edit-btn");
            editButton.addEventListener("click", (event) => {
                event.stopPropagation();
                editRecipe(menuName, menuItem);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "-";
            deleteButton.classList.add("delete-btn");
            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation();
                deleteRecipe(menuName, menuItem);
            });

            buttonDiv.appendChild(editButton);
            buttonDiv.appendChild(deleteButton);
            menuItem.appendChild(buttonDiv);
            myMenuContainer.appendChild(menuItem);

            menuInput.value = "";
            ingredientsList.innerHTML = "";
            instructionsList.innerHTML = "";
            const ingredientLabel = document.getElementById("ingredient-label");
            const instructionLabel = document.getElementById("instruction-label");
            if (ingredientLabel) ingredientLabel.remove();
            if (instructionLabel) instructionLabel.remove();
            inputContainer.style.visibility = "hidden";
            recipeDetailsDiv.style.visibility = "visible";
            saveRecipeBtn.style.visibility = "hidden";           
        }
    });

    function showRecipeDetails(menuName) {
        recipeDetailsDiv.innerHTML = ""; // Clear previous content
        recipeDetailsDiv.style.border = "solid 1px black";
        recipeDetailsDiv.style.borderWidth = "0px 0px 1px 0px";

        const h1 = document.createElement("h1");
        h1.textContent = `${menuName}`;
        const ingredientsDiv = document.createElement("div");
        
        ingredientsDiv.classList.add("ingredients-list");
        const instructionsDiv = document.createElement("div");
        instructionsDiv.classList.add("instruction-list");

        const ingredientsUl = document.createElement("ul");
        ingredientsUl.style.border ="solid 1px black";
        ingredientsUl.classList.add("ingUl");

        const instructionsUl = document.createElement("ul");
        instructionsUl.style.border ="solid 1px black";
        instructionsUl.classList.add("insUl");

        const ingredientsHeader = document.createElement("h1");
        ingredientsHeader.textContent = "Ingredients";
        const instructionsHeader = document.createElement("h1");
        instructionsHeader.textContent = "Instructions";

        recipes[menuName].ingredients.forEach((ingredient) => {
            const listItem = document.createElement("li");
            listItem.textContent = ingredient;
            ingredientsUl.appendChild(listItem);
        });

        recipes[menuName].instructions.forEach((instruction) => {
            const listItem = document.createElement("li");
            listItem.textContent = instruction;
            instructionsUl.appendChild(listItem);
        });

        ingredientsDiv.appendChild(ingredientsHeader);
        ingredientsDiv.appendChild(ingredientsUl);
        instructionsDiv.appendChild(instructionsHeader);
        instructionsDiv.appendChild(instructionsUl);

        recipeDetailsDiv.appendChild(h1);
        recipeDetailsDiv.appendChild(ingredientsDiv);
        recipeDetailsDiv.appendChild(instructionsDiv);

        const closeBtn = document.createElement("button");
        closeBtn.classList.add("closeBtn");
        closeBtn.textContent = "Close";
        closeBtn.addEventListener("click", () => {
            recipeDetailsDiv.style.visibility = "hidden";
            closeBtn.style.visibility = "hidden";
        });

        recipeDetailsDiv.appendChild(closeBtn);
        recipeDetailsDiv.style.visibility = "visible";
    }

    function editRecipe(menuName, menuItem) {
        const newMenuName = prompt("Edit Menu Name:", menuName);
        if (newMenuName && newMenuName.trim() !== "") {
            menuItem.firstChild.textContent = newMenuName.trim();
        }
    }

    function deleteRecipe(menuName, menuItem) {
        delete recipes[menuName];
        myMenuContainer.removeChild(menuItem);
    }
});
