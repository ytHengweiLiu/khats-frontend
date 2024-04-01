const pages = ['login', 'validation', 'summary'];

const goToPage = (newPage) => {
    document.getElementById('PEPPOLerror').innerHTML = '';
    document.getElementById('UBLerror').innerHTML = '';
    for (const page of pages) {
        document.getElementById(`page-${page}`).style.display = 'none';
    }
    document.getElementById(`page-${newPage}`).style.display = 'flex';
}

goToPage('validation');

document.getElementById('login-go').addEventListener('click', () => {
    goToPage('validation');
});

// const uploadForm = document.getElementById('validate-go')
// uploadForm.addEventListener('click', function(e) {
//    e.preventDefault()
//    let file = e.target.uploadFile.files[0]
//    let formData = new FormData()
//    formData.append('file', file);
//    console.log(formData);
// })

const uploadForm = document.getElementById('uploadForm');
uploadForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let file = e.target.uploadFile.files[0]
    fileName = file.name;
    let formData = new FormData()
    formData.append('file', file)
    console.log(formData);
    fetch('https://asish.alwaysdata.net/invoice-validator/upload-invoice', {
        method: 'POST',
        body: formData
    })
    .then(resp => resp)
    .then(data => {
        if (data.errors) {
            alert(data.errors)
        }
        else {
            console.log(data)
        }
    })
    goToPage('summary');
    viladateFile(fileName);
});

const uploadFormAgain = document.getElementById('uploadFormAgain');
uploadFormAgain.addEventListener('submit', function(e) {
    e.preventDefault()
    let file = e.target.uploadFile.files[0]
    fileName = file.name;
    let formData = new FormData()
    formData.append('file', file)
    console.log(formData);
    fetch('https://asish.alwaysdata.net/invoice-validator/upload-invoice', {
        method: 'POST',
        body: formData
    })
    .then(resp => resp)
    .then(data => {
        if (data.errors) {
            alert(data.errors)
        }
        else {
            console.log(data)
        }
    })
    goToPage('summary');
    viladateFile(fileName);
});

// document.getElementById('validate-go').addEventListener('click', () => {
//     console.log(document.getElementById('UBL-error-amount').innerText);
//     megFromBackend();
//     console.log(document.getElementById('upload-first').files);
//     let file = document.getElementById('upload-first').files[0]
//     let formData = new FormData()
//     formData.append('file', file)
//     console.log(formData);
//     goToPage('summary');
// });

document.getElementById('summary-validate-go').addEventListener('click', () => {
    console.log(document.getElementById('UBL-error-amount').innerText);
    goToPage('summary');
});


function megFromBackend() {
    fetch('https://asish.alwaysdata.net/', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    }).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);
            }
        });
    });
}

function uploadFile(file) {
    fetch('https://asish.alwaysdata.net/invoice-validator/upload-invoice', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: file
    }).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);
            }
        });
    });
}

function viladateFile(invoiceTag) {
    fetch(`https://asish.alwaysdata.net/invoice-validator/validate-invoice?invoiceTag=${invoiceTag}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    }).then((response) => {
        return response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                const result = data;
                const UBL = result.UBLerror;
                const PEPPOL = result.PEPPOLerror;
                console.log(UBL);
                console.log(PEPPOL);
                const UBLNumber = UBL.length;
                const PEPPOLNumber = PEPPOL.length;
                console.log(UBLNumber);
                console.log(PEPPOLNumber);
                document.getElementById('UBL-error-amount').innerText = UBLNumber;
                document.getElementById('PEPPOL-error-amount').innerText = PEPPOLNumber;
                const spaceDom = document.createElement('br');
                if (UBLNumber === 0) {
                    const noErrorDom = document.createElement('div');
                    noErrorDom.innerText = 'All fine on this level';
                    noErrorDom.style.color = '#5CB85C';
                    document.getElementById('UBLerror').appendChild(noErrorDom);
                    document.getElementById('UBLerror').appendChild(spaceDom);
                } else {
                    for (const error of UBL) {
                        const spaceDom = document.createElement('br');
                        const errorLocation = error.location;
                        const erorMsg = error.text;

                        const errorDom =  document.createElement('div');
                        const errorTitleDom = document.createElement('div');
                        errorTitleDom.innerText = 'Error';
                        errorTitleDom.style.color = '#F93549';

                        const errorLocationDom = document.createElement('div');
                        const errorLocationTitleDom = document.createElement('span');
                        const errorLocationContentDom = document.createElement('span');
                        errorLocationContentDom.style.color = '#F93549';
                        errorLocationTitleDom.innerText = 'Location: ';
                        errorLocationTitleDom.style.color = '#012268';
                        errorLocationContentDom.innerText = errorLocation;
                        errorLocationDom.appendChild(errorLocationTitleDom);
                        errorLocationDom.appendChild(errorLocationContentDom);

                        const errorMsgDom = document.createElement('div');
                        const errorMsgTitleDom = document.createElement('span');
                        const errorMsgContentDom = document.createElement('span');
                        errorMsgContentDom.style.color = '#F93549';
                        errorMsgTitleDom.innerText = 'Error Message: ';
                        errorMsgTitleDom.style.color = '#012268';
                        errorMsgContentDom.innerText = erorMsg;
                        errorMsgDom.appendChild(errorMsgTitleDom);
                        errorMsgDom.appendChild(errorMsgContentDom);

                        errorDom.appendChild(errorTitleDom);
                        errorDom.appendChild(errorLocationDom);
                        errorDom.appendChild(errorMsgDom);
                        errorDom.appendChild(spaceDom);
                        document.getElementById('UBLerror').appendChild(errorDom);
                    }
                }
                if (PEPPOLNumber === 0) {
                    const noErrorDom = document.createElement('div');
                    noErrorDom.innerText = 'All fine on this level';
                    noErrorDom.style.color = '#5CB85C';
                    document.getElementById('PEPPOLerror').appendChild(noErrorDom);
                    document.getElementById('PEPPOLerror').appendChild(spaceDom);
                } else {
                    for (const error of PEPPOL) {
                        const spaceDom = document.createElement('br');
                        const errorLocation = error.location;
                        const erorMsg = error.text;

                        const errorDom =  document.createElement('div');
                        const errorTitleDom = document.createElement('div');
                        errorTitleDom.innerText = 'Error';
                        errorTitleDom.style.color = '#F93549';

                        const errorLocationDom = document.createElement('div');
                        const errorLocationTitleDom = document.createElement('span');
                        const errorLocationContentDom = document.createElement('span');
                        errorLocationContentDom.style.color = '#F93549';
                        errorLocationTitleDom.innerText = 'Location: ';
                        errorLocationTitleDom.style.color = '#012268';
                        errorLocationContentDom.innerText = errorLocation;
                        errorLocationDom.appendChild(errorLocationTitleDom);
                        errorLocationDom.appendChild(errorLocationContentDom);

                        const errorMsgDom = document.createElement('div');
                        const errorMsgTitleDom = document.createElement('span');
                        const errorMsgContentDom = document.createElement('span');
                        errorMsgContentDom.style.color = '#F93549';
                        errorMsgTitleDom.innerText = 'Error Message: ';
                        errorMsgTitleDom.style.color = '#012268';
                        errorMsgContentDom.innerText = erorMsg;
                        errorMsgDom.appendChild(errorMsgTitleDom);
                        errorMsgDom.appendChild(errorMsgContentDom);

                        errorDom.appendChild(errorTitleDom);
                        errorDom.appendChild(errorLocationDom);
                        errorDom.appendChild(errorMsgDom);
                        errorDom.appendChild(spaceDom);
                        document.getElementById('PEPPOLerror').appendChild(errorDom);
                    }
                }
            }
        });
    });

}
