// Initialize members array from existing table data
let members = initializeMembersFromTable();

// Delete functionality
const deleteButton = document.querySelector('.btn-del');
deleteButton.onclick = handleDeleteMembers;

// Form submission functionality
const addMemberForm = document.querySelector('.my-form');
if (addMemberForm) {
    addMemberForm.addEventListener('submit', handleAddMember);
}

// Initialize members array from the existing table
function initializeMembersFromTable() {
    let members = [];
    let tableRows = document.querySelectorAll('.data-table tbody tr');
    
    for (let i = 0; i < tableRows.length; i++) {
        let name = tableRows[i].querySelector('.member-name').textContent;
        let startDate = tableRows[i].querySelector('.start-date').textContent;
        let profileImg = tableRows[i].querySelector('.profile_img img').src;
        
        members.push({
            name: name,
            startDate: startDate,
            profileImg: profileImg,
            selected: tableRows[i].querySelector('input[type="checkbox"]').checked
        });
    }
    
    return members;
}

// Handle delete members functionality
function handleDeleteMembers(event) {
    
    let checkboxes = document.querySelectorAll('input[name="employee"]:checked');
    
    if (checkboxes.length === 0) {
        alert('Please select at least one offer');
        return;
    }
    
    let confirmDelete = confirm('Are you sure you want to delete the selected members?');
    
    if (confirmDelete) {
        deleteSelectedMembers();
    }
}

// Delete selected members and update the table 
function deleteSelectedMembers() {
    let checkboxes = document.querySelectorAll('input[name="employee"]');
    let tableBody = document.querySelector('.data-table tbody');
    
    // Get indices of checked checkboxes
    let indicesToDelete = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            indicesToDelete.unshift(i);
        }
    }
    
    // Remove rows and update members array
    for (let i = 0; i < indicesToDelete.length; i++) {
        let index = indicesToDelete[i];
        if (tableBody.rows[index]) {
            tableBody.deleteRow(index);
            members.splice(index, 1);
        }
    }
    
    alert('Members deleted successfully!');
}

// Handle add member form submission
function handleAddMember(event) {
    event.preventDefault();
    
    if (!validateFields()) {
        alert('Please fill in all required fields');
        return;
    }

    if (!validateprofile()) {
        alert('Please upload a profile picture');
        return;
    }
    
    // Add new member
    addNewMember(event.target);
    
    // Reset form and show success message
    event.target.reset();
    alert('Member added successfully!');
}

// Validate form fields 
function validateFields() {
    let isValid = true;
    const form = document.querySelector('.my-form');
    
    // Text and textarea fields
    const requiredFields = form.querySelectorAll('input[type="text"], input[type="date"], input[type="email"], textarea');
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!field.value) {
            isValid = false;
        }
    }
    
    return isValid;
}

function validateprofile() {
    let isValid = true;

    // File input
    const fileInput = document.getElementById('pic');
    if (!fileInput.files || fileInput.files.length === 0) {
        isValid = false;
    }
    
    return isValid;
}

// Add new member to the table and members array
function addNewMember(form) {

    const name = form.querySelector('.field-name input').value;
    const birthDate = form.querySelector('.field-date input').value;
    const email = form.querySelector('input[type="email"]').value;
    const experiences = form.querySelector('.exp textarea').value;
    const skills = form.querySelector('.skills textarea').value;
    const education = form.querySelector('.field-education textarea').value;

    // Get uploaded image
    const fileInput = document.getElementById('pic');
    const profileImgURL = URL.createObjectURL(fileInput.files[0]);

    // Start Date = Today
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    const newMember = {
        name: name,
        startDate: formattedDate,
        profileImg: profileImgURL,   // ⬅ YOUR UPLOADED IMAGE
        selected: false,
        email: email,
        birthDate: birthDate,
        experiences: experiences,
        skills: skills,
        education: education
    };

    members.push(newMember);
    addMemberToTable(newMember);
}


// Add member row to the table
function addMemberToTable(member) {
    const tableBody = document.querySelector('.data-table tbody');
    const newRow = tableBody.insertRow();
    
    newRow.innerHTML = `
        <td><input type="checkbox" name="employee" value=""></td>
        <td class="member-name">${member.name}</td>
        <td class="start-date">${member.startDate}</td>
        <td class="profile_img"><img src="${member.profileImg}" alt=""></td>
    `;
}
