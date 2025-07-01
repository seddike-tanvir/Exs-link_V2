
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "/user_login/";
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

          // Date formatting
        let createdAt = "";
        if (data.createdAt) {
          const date = new Date(data.createdAt);
          createdAt = date.toLocaleString(); // Date & time together
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td class="td_srtURL"><a href="https://exs-link.web.app/${code}" target="_blank">exs-link.web.app/${code}</a></td>
          <td class="td_realURL"><a href="${data.originalUrl}" target="_blank" class="realURL">${data.originalUrl}</a></td>
          <td class="center_Td_TH">${createdAt}</td>
          <td class="center_Td_TH">${data.clicks || 0}</td>
          <td class="center_Td_TH">${data.password || ""}</td>
          <td class="center_Td_TH"><span class="btn-del" onclick="deleteLink('${code}')">🗑 Delete</span></td>
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


  function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#linkTableBody tr");
  
    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      let match = false;
  
      cells.forEach(cell => {
        // আগের highlight clear করার জন্য innerHTML reset করছি
        if (cell.querySelector("a")) {
          // যদি cell এর ভিতরে <a> থাকে, সেটা আলাদা করে highlight করবো
          const link = cell.querySelector("a");
          const text = link.textContent.toLowerCase();
          const originalText = link.textContent;
  
          if (input && text.includes(input)) {
            match = true;
            const regex = new RegExp(`(${input})`, "gi");
            const highlighted = originalText.replace(regex, `<span class="highlight">$1</span>`);
            link.innerHTML = highlighted;
          } else {
            // reset highlight
            link.innerHTML = originalText;
          }
  
        } else {
          // সাধারণ টেক্সট (non-link) এর জন্য
          const text = cell.textContent.toLowerCase();
          const originalText = cell.textContent;
          if (input && text.includes(input)) {
            match = true;
            const regex = new RegExp(`(${input})`, "gi");
            cell.innerHTML = originalText.replace(regex, `<span class="highlight">$1</span>`);
          } else {
            // reset highlight
            cell.innerHTML = originalText;
          }
        }
      });
  
      row.style.display = match || input === "" ? "" : "none";
    });
  }
  
  
  
