// 주소 검색 및 저장 기능의 기본 구조
const addressInput = document.getElementById('addressInput');
const searchBtn = document.getElementById('searchBtn');
const saveBtn = document.getElementById('saveBtn');
const addressList = document.getElementById('addressList');

// 임시 저장용 배열
let savedAddresses = [];

// 카카오 주소 검색 연동 및 입력값 실시간 확인
const addressConfirm = document.getElementById('addressConfirm');
searchBtn.addEventListener('click', () => {
    const query = addressInput.value.trim();
    if (!query) {
        addressConfirm.innerHTML = '<span style="color:red">검색어를 입력하세요.</span>';
        return;
    }
    addressConfirm.innerHTML = '검색 중...';
    // 카카오 REST API 키를 아래에 입력하세요
    const KAKAO_API_KEY = '여기에_본인_REST_API_KEY_입력';
    fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}`, {
        headers: { 'Authorization': `KakaoAK ${KAKAO_API_KEY}` }
    })
    .then(res => res.json())
    .then(data => {
        if (data.documents && data.documents.length > 0) {
            const place = data.documents[0];
            let infoHtml = `<div><strong>장소명:</strong> ${place.place_name}</div>`;
            infoHtml += `<div><strong>주소:</strong> ${place.road_address_name || place.address_name}</div>`;
            if (place.phone) infoHtml += `<div><strong>전화번호:</strong> ${place.phone}</div>`;
            addressConfirm.innerHTML = infoHtml;
            addressInput.value = place.road_address_name || place.address_name;
        } else {
            addressConfirm.innerHTML = '<span style="color:red">검색 결과가 없습니다.</span>';
        }
    })
    .catch(() => {
        addressConfirm.innerHTML = '<span style="color:red">검색 오류가 발생했습니다.</span>';
    });
});

// 입력창에서 직접 입력해도 확인칸에 표시
addressInput.addEventListener('input', function() {
    const addr = addressInput.value.trim();
    if (addr) {
        addressConfirm.innerHTML = `<div><strong>확인:</strong> ${addr}</div>`;
    } else {
        addressConfirm.textContent = '';
    }
});

saveBtn.addEventListener('click', () => {
    const address = addressInput.value.trim();
    if (address) {
        savedAddresses.push(address);
        renderAddressList();
        addressInput.value = '';
        addressConfirm.textContent = '';
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
