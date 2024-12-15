document.addEventListener('DOMContentLoaded', () => {
  // DYNAMIC TABLES
  const categorySelect = document.getElementById('categorySelect');
  const branchTable = document.getElementById('table-branch');
  const accountTable = document.getElementById('table-account');
  const selectedCategories = document.getElementById('selectedCategory');

  const saveCategory = [];

  if (selectedCategories.value == "Accounts") {
    accountTable.style.display = "block";
    branchTable.style.display = "none";
    categorySelect.value = selectedCategories.value;
  }else if (selectedCategories.value === "Branches") {
    branchTable.style.display = "block";
    accountTable.style.display = "none";
  }

  console.log(selectedCategories.value);

  categorySelect.addEventListener('change', async (e) => {
    const selectedCategory = categorySelect.value;

    // Hide both tables by default
    branchTable.style.display = "none";
    accountTable.style.display = "none";

    // Show relevant table based on selected category
    if (selectedCategory === "") {
      branchTable.style.display = "none"; 
    } else if (selectedCategory === "Branches") {
      branchTable.style.display = "block";
      saveCategory.push(selectedCategory);

      const stringCategory = JSON.stringify(saveCategory);

      fetch(`/admin/requests/${stringCategory}`)
        .then(() => {
          // Handle successful request if necessary
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else if (selectedCategory === "Accounts") {
      accountTable.style.display = "block";
      saveCategory.push(selectedCategory);

      const stringCategory = JSON.stringify(saveCategory);

      fetch(`/admin/requests/${stringCategory}`)
        .then(() => {
          // Handle successful request if necessary
        })
        .catch(error => {
          console.error('Error:', error);
        });
        
    }
  });

});
