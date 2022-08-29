function requestToEmail(triggerSelector, nameSelector, telephoneSelector, directionSelector, citySelector) {

    const requestButton = document.querySelector(triggerSelector);

    requestButton.addEventListener('click', (e) => {
        const name = document.querySelector(nameSelector).value.trim();
        const telephone = document.querySelector(telephoneSelector).value;
        const direction = document.querySelector(directionSelector).value;
        const city = document.querySelector(citySelector).value;
        let error = '';

        if (name.length < 1) {
            error = 'name';
        }

        if (telephone.length < 18) {
            error = 'telephone';
        }

        if (name && telephone && city) {
            e.preventDefault();
            sendRequest(name, telephone, direction, city);
        }
    }); 

    const sendRequest = (name, telephone, direction, city) => {
        console.log(name, telephone, direction, city);
    };

}

export default requestToEmail;