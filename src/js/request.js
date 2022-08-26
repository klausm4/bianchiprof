function req() {

    const requestButton = document.querySelector('.send-request');

    requestButton.addEventListener('click', (e) => {
        const name = document.querySelector('#validationName').value;
        const telephone = document.querySelector('#validationTelephone').value;
        if (name && telephone) {
            e.preventDefault();
            sendRequest(name, telephone);
        }
    }); 

    const sendRequest = (name, telephone) => {
        console.log(name, telephone);
    };

}

export default req;