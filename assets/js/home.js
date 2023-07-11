$(document).ready(function(){

    var signupForm = document.getElementById("signup-form")

    //fullpage
    $('#fullpage').fullpage({
        licenseKey: 'gplv3-license',
        navigation: true,
        navigationTooltips: ['Welcome', 'New Robots', 'Used Robots', 'Contact']
        //options here
    })

    //typewriter
    var typewriterElements = document.querySelectorAll('.typewriter-effect')
    //console.log(typewriterElements)
    for (var i = 0; i < typewriterElements.length;i++){
        var currentEl = typewriterElements[i]
        var innerText = currentEl.innerText
        new Typewriter(currentEl, {
            loop: true
        })
        .typeString(innerText)
        .pauseFor(1500)
        .start() 

    }
 
    //powerglitch
    PowerGlitch.glitch(".glitch", {
        hideOverflow: true
    })

    //lastErrorDate
    $('[data-lastIncidentDate]').each(function(){
        var $incidentDate = $(this).attr('data-lastIncidentDate')
        $incidentDate = dayjs($incidentDate)
        var today = dayjs()
        var diff = today.diff($incidentDate, 'day')
        console.log(diff) 

        var textClass

        if (diff < 5){
            textClass = 'text-danger'
        } else if (diff < 30){
            textClass = 'text-warning'
        } else {
            textClass = 'text-success'
        }

        $(this).text(diff + " days since last incident").addClass(textClass)

        signupForm.addEventListener("submit", function (event){
            event.preventDefault()
            var emailInput = document.getElementById("email")
            //console.log("submit")
            var email = emailInput.value.trim()
            console.log(email)

            fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            })
            .then(function(response){
                
                if (response.ok && response.status === 201){
                    //something got created
                    window.location.assign('./signup-thankyou.html?email=' + email)
                } else {
                    alert('Error creating user')
                }
            }).catch(function(error){
                alert('Error creating user')
                console.log(error)
            })
            // .then(function(json){
            //     console.log(json)
            // })                
        })

        

        //listen for submit event on the signup form
            //prevent the default action
            //grab the value of the email input
                //create user with jsonplaceholder
                    //if successful
                        //redirect to the thankyou page

    })
})