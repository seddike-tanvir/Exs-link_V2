
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "/login/";
    } else {
      loadLinks();
    }
  });

  function loadLinks() {
    const tbody = document.getElementById("linkTableBody");
    firebase.database().ref("urls").once("value").then(snapshot => {
      tbody.innerHTML = "";
      snapshot.forEach(childSnap => {
        const code = childSnap.key;
        const data = childSnap.val();

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="td_srtURL"><a href="https://exs-link.web.app/${code}" target="_blank">exs-link.web.app/${code}</a></td>
          <td class="td_realURL"><a href="${data.originalUrl}" target="_blank" class="realURL">${data.originalUrl}</a></td>
          <td>${data.clicks || 0}</td>
          <td>${data.password || ""}</td>
          <td><span class="btn-del" onclick="deleteLink('${code}')">🗑 Delete</span></td>
        `;
        tbody.appendChild(tr);
      });
    });
  }

  function deleteLink(code) {
    if (confirm(`Are you sure you want to delete "${code}"?`)) {
      firebase.database().ref("urls/" + code).remove().then(() => {
        loadLinks();
      });
    }
  }

  function logout() {
    firebase.auth().signOut().then(() => {
      window.location.href = "/login/";
    });
  }

  
