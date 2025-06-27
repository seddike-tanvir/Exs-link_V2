const db = firebase.database();

db.ref('urls').on('value', snapshot => {
  const tableBody = document.querySelector("#urlTable tbody");
  tableBody.innerHTML = "";
  snapshot.forEach(childSnapshot => {
    const key = childSnapshot.key;
    const val = childSnapshot.val();

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${key}</td>
      <td><a href="${val.longURL}" target="_blank">${val.longURL}</a></td>
      <td>${val.password ? 'Yes' : 'No'}</td>
      <td>${val.clicks || 0}</td>
      <td>
        <button onclick="deleteURL('${key}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
});

function deleteURL(key) {
  if (confirm("Are you sure?")) {
    db.ref('urls/' + key).remove();
  }
}