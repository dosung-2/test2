// 주소 검색 및 저장 기능의 기본 구조
const addressInput = document.getElementById('addressInput');
const searchBtn = document.getElementById('searchBtn');
const saveBtn = document.getElementById('saveBtn');
const addressList = document.getElementById('addressList');

// 임시 저장용 배열
let savedAddresses = [];

searchBtn.addEventListener('click', () => {
    // 실제 주소 검색 기능은 추후 구현
    alert('주소 검색 기능은 추후 구현됩니다.');
});

saveBtn.addEventListener('click', () => {
    const address = addressInput.value.trim();
    if (address) {
        savedAddresses.push(address);
        renderAddressList();
        addressInput.value = '';
    }
});

function renderAddressList() {
    addressList.innerHTML = '';
    savedAddresses.forEach(addr => {
        const li = document.createElement('li');
        li.textContent = addr;
        addressList.appendChild(li);
    });
}
