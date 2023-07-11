$(document).ready(function(){
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

        //listen for submit event on the signup form
            //prevent the default action
            //grab the value of the email input
                //create user with jsonplaceholder
                    //if successful
                        //redirect to the thankyou page

    })
})