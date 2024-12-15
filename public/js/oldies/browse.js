const finderForm = document.getElementById('finder-form');
const byVillage = document.getElementById('village');
const byPostcode = document.getElementById('postcode');
const byAddress = document.getElementById('address');
const clinicResults = document.getElementById('clinic-results');

finderForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    try{  
        const byVillageValue = byVillage.value;
        const byPostcodeValue = byPostcode.value;
        const byAddressValue = byAddress.value;
        
        fetch('/patient/available-clinics', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({byVillageValue, byPostcodeValue, byAddressValue})
        })
        .then(res => res.json())
        .then(async() => {
            await fetchData();
            window.location.reload();
        });
        

    }catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

async function fetchData() {
    const response = await fetch('/patient/browse', {
        method:'GET'
    });
}

