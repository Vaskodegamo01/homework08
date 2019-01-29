$(()=>{
    let container = $('#mydiv');

    $("#btn").on('click',(e)=>{
        let idForm = $("#ajax_form");
        if(!idForm[0].checkValidity()){
            $('<input type="submit">').hide().appendTo(idForm).click().remove();
            return;
        }
        e.preventDefault();
        const urlFull = $('#urlFull').val();
        let data = {
            urlFull: urlFull
        };
        $.ajax({
            method: "POST",
            url: "http://localhost:3333/links",
            data: JSON.stringify(data),
            contentType: false,
            processData: false,
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Accept","application/json");
            }
        }).then((response) =>{
            let div = $('<div id ="response">');
            let p =$('<p>').text("Your link now looks like this:");
            let a =$('<a>').attr('href', `http://localhost:3333/${response.UrlSort}`).text(`http://localhost:3333/${response.UrlSort}`);
            div.append(p,a);
            container.prepend(div);
        })
    })
});