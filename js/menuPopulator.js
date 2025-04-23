
fetch('./Menu.xlsx')
    .then(response =>{
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          console.log("✅ Excel file fetched successfully.");
          return response.arrayBuffer();
    })
    .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });

        const tabList = document.getElementById('menuTabs');
        const tabContent = document.getElementById('menuTabContent');

        workbook.SheetNames.forEach((sheetName, index) => {
          const sheet = workbook.Sheets[sheetName];
          const items = XLSX.utils.sheet_to_json(sheet);

          // Create tab nav item
          const tabId = 'tab-' + index;
          const tabNav = document.createElement('li');
          tabNav.className = 'nav-item';
          tabNav.innerHTML = `
            <a class="nav-link text-white ${index === 0 ? 'active' : ''}" data-bs-toggle="pill" data-bs-target="#${tabId}" href="${tabId}-tab" id="${tabId}-tab" aria-controls="${tabId}" aria-selected="${index === 0}">
              ${sheetName}
            </a>
          `;
          tabList.appendChild(tabNav);

          // Create tab pane
          const tabPane = document.createElement('div');
          tabPane.className = `tab-pane fade ${index === 0 ? 'show active p-0' : ''}`;
          tabPane.id = tabId;
          tabPane.setAttribute('role', 'tabpanel');
          tabPane.setAttribute('aria-labelledby', `${tabId}-tab`);

          const row = document.createElement('div');
          row.className = 'row g-3 item-menu';

          items.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-lg-6';

            const hasImage = item.Image && item.Image.trim() !== '';
            const itemToPopup = `{ 
              title: '${item.Title || ''}', 
              description: '${item.Description || ''}', 
              price: '${item.Price || '0.00'}', 
              ${hasImage ?
                `image: '${item.Image}'` :
                ''
              }
            }`;
            const html = `
              <div class="d-flex h-100 bg-secondary border-inner" onclick="showMenuItemDetails(${itemToPopup})">
                <div class="d-flex flex-column justify-content-center text-start">
                  <h5 class="par1-e">${item.Title || ''}</h5>
                  <span class="par2-e">${item.Description || ''}</span>
                  <h6>${item.Price || '0.00'}</h6>
                </div>
                ${hasImage ? `
                  <div class="flex-shrink-0 menu-image-container">
                    <img class="img-fluid" src="${item.Image}" alt="">
                  </div>` : ''}
              </div>
            `;

            col.innerHTML = html;
            row.appendChild(col);
          });

          tabPane.appendChild(row);
          tabContent.appendChild(tabPane);
        });
    })
    .catch(error => {
        console.error("Error loading Excel file:", error);
    });