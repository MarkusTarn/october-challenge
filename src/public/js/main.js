const getId = (id) => document.getElementById(id);
const json = (data) => data.json();
const alert = async (message) => M.toast({ html: message, classes: 'red lighten-2', displayLength: 3000 });
const handleErrors = async (data) => { 
    if (data.status !== 200) alert(data.message) 
};


const authenticate = async (action) => {
    const name = getId('name').value;
    const password = getId('password').value;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password, action })
    };

    fetch('/auth', options)
    .then(json)
    .then(response => {
        if (response.status === 200) window.location.href = '/';
        else alert(response.message);
    });
}

// const getScores = async () => {
//     const item = getId('item').value;
//     const quantity = getId('quantity').value;

//     const options = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ item, quantity })
//     };

//     fetch('/scores')
//     .then(json)
//     .then(response => {
//         if (response.status === 200) window.location.href = '/';
//         else alert(response.message);
//     });
// }

const postScore = async () => {
    const item = getId('item').value;
    const quantity = getId('quantity').value;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item, quantity })
    };

    fetch('/scores', options)
    .then(json)
    .then(response => {
        if (response.status === 200) location.reload();
        else alert(response.message);
    });
}

const addParty = async () => {
    const party = getId('newPartyName').value;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ party })
    };

    fetch('/parties', options)
    .then(json)
    .then(response => {
        if (response.status === 200) location.reload();
        else alert(response.message);
    });
}

const getPartyList = async () => {
    return fetch('/parties')
    .then(json)
    .then(response => {
        if (response.status === 200) return response.data;
        else alert(response.message);
    });
}
// async function deleteScore(id) {
// 	fetch('/scores' + id, { method: 'DELETE' })
// 		.then(document.getElementById(id).parentNode.removeChild(document.getElementById(id)))
// 		.then(M.toast({ html: 'Process definition deleted' }))
// 		.catch(error => alert(error));
// }

let onlongtouch; 
let timer, lockTimer;
const touchduration = 800;

function touchstart(e) {
	e.preventDefault();
	if (lockTimer) return;
    timer = setTimeout(onlongtouch, touchduration); 
	lockTimer = true;
}

function touchend() {
    if (timer) {
        clearTimeout(timer);
		lockTimer = false;
	}
}

onlongtouch = function(id) { 
    alert(id)
	// document.getElementById('ping').innerText+='ping\n'; 
};